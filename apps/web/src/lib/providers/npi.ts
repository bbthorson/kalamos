import type { NpiResponse, NpiResult, Provider } from "@/types/provider";

const BASE_URL = "https://npiregistry.cms.hhs.gov/api/";

/** Behavioral health taxonomy codes (Level II and III) */
export const BEHAVIORAL_HEALTH_TAXONOMIES = {
  // Level II — Provider types
  "101Y00000X": "Counselor",
  "103T00000X": "Psychologist",
  "104100000X": "Social Worker",
  "103K00000X": "Behavior Analyst",
  "106H00000X": "Marriage & Family Therapist",
  // Level III — Specializations
  "101YM0800X": "Mental Health Counselor",
  "101YP2500X": "Licensed Professional Counselor",
  "101YA0400X": "Addiction Counselor",
  "1041C0700X": "Clinical Social Worker",
  "103TC0700X": "Clinical Psychologist",
  "103TC2200X": "Clinical Child & Adolescent Psychologist",
  "363LP0808X": "Psychiatric Nurse Practitioner",
} as const;

export interface NpiSearchParams {
  /** NPI taxonomy code or description (supports wildcards after 2+ chars) */
  taxonomyDescription?: string;
  /** City */
  city?: string;
  /** State abbreviation */
  state?: string;
  /** 5 or 9 digit zip code */
  postalCode?: string;
  /** NPI-1 (individual) or NPI-2 (organization) */
  enumerationType?: "NPI-1" | "NPI-2";
  /** Provider first name */
  firstName?: string;
  /** Provider last name */
  lastName?: string;
  /** Organization name */
  organizationName?: string;
  /** Max results (1-200) */
  limit?: number;
}

export async function searchNpi(
  params: NpiSearchParams
): Promise<{ providers: Provider[]; totalCount: number }> {
  const query = new URLSearchParams();
  query.set("version", "2.1");
  query.set("limit", String(Math.min(params.limit ?? 25, 200)));

  if (params.taxonomyDescription)
    query.set("taxonomy_description", params.taxonomyDescription);
  if (params.city) query.set("city", params.city);
  if (params.state) query.set("state", params.state);
  if (params.postalCode) query.set("postal_code", params.postalCode);
  if (params.enumerationType)
    query.set("enumeration_type", params.enumerationType);
  if (params.firstName) query.set("first_name", params.firstName);
  if (params.lastName) query.set("last_name", params.lastName);
  if (params.organizationName)
    query.set("organization_name", params.organizationName);

  query.set("address_purpose", "LOCATION");

  const response = await fetch(`${BASE_URL}?${query.toString()}`, {
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error(
      `NPI Registry API error: ${response.status} ${response.statusText}`
    );
  }

  const data: NpiResponse = await response.json();

  return {
    providers: (data.results ?? []).map(transformNpiResult),
    totalCount: data.result_count ?? 0,
  };
}

/**
 * Search for behavioral health providers by running parallel queries
 * across multiple taxonomy codes and deduplicating by NPI number.
 */
export async function searchBehavioralHealthProviders(params: {
  city?: string;
  state?: string;
  postalCode?: string;
  taxonomyCodes?: string[];
  limit?: number;
}): Promise<{ providers: Provider[]; totalCount: number }> {
  const codes =
    params.taxonomyCodes ?? Object.keys(BEHAVIORAL_HEALTH_TAXONOMIES);

  const results = await Promise.allSettled(
    codes.map((code) =>
      searchNpi({
        taxonomyDescription: code,
        city: params.city,
        state: params.state,
        postalCode: params.postalCode,
        limit: params.limit ?? 50,
      })
    )
  );

  const seen = new Set<string>();
  const providers: Provider[] = [];

  for (const result of results) {
    if (result.status === "fulfilled") {
      for (const provider of result.value.providers) {
        if (!seen.has(provider.id)) {
          seen.add(provider.id);
          providers.push(provider);
        }
      }
    }
  }

  return { providers, totalCount: providers.length };
}

function transformNpiResult(result: NpiResult): Provider {
  const locationAddr = result.addresses.find(
    (a) => a.address_purpose === "LOCATION"
  );
  const addr = locationAddr ?? result.addresses[0];

  const isOrg = result.enumeration_type === "NPI-2";
  const name = isOrg
    ? result.basic.organization_name ?? "Unknown Organization"
    : [result.basic.name_prefix, result.basic.first_name, result.basic.last_name]
        .filter(Boolean)
        .join(" ");

  const credential = result.basic.credential;

  return {
    id: String(result.number),
    source: "npi",
    name: credential ? `${name}, ${credential}` : name,
    nameLine2: null,
    address: addr
      ? {
          street1: addr.address_1,
          street2: addr.address_2 || null,
          city: addr.city,
          state: addr.state,
          zip: addr.postal_code,
        }
      : { street1: "", street2: null, city: "", state: "", zip: "" },
    phone: addr?.telephone_number || null,
    website: null,
    location: null, // NPI doesn't provide coordinates
    distance: null,
    facilityType: isOrg ? "Organization" : "Individual",
    taxonomies: result.taxonomies.map((t) => ({
      code: t.code,
      description: t.desc,
      primary: t.primary,
      state: t.state || null,
      license: t.license || null,
    })),
    services: {
      typeOfCare: [],
      serviceSetting: [],
      ageGroups: [],
      paymentAccepted: [],
      paymentAssistance: [],
      specialPrograms: [],
      languageServices: [],
    },
  };
}
