import type {
  FindTreatmentResponse,
  FindTreatmentRow,
  Provider,
  ProviderServices,
} from "@/types/provider";

const BASE_URL = "https://findtreatment.gov/locator/exportsAsJson/v2";
const MILES_TO_METERS = 1609.34;

export interface FindTreatmentSearchParams {
  lat: number;
  lng: number;
  radius?: number;
  type?: "sa" | "mh" | "both";
  services?: string;
  stateCode?: string;
  page?: number;
  pageSize?: number;
}

export async function searchFindTreatment(
  params: FindTreatmentSearchParams
): Promise<{ providers: Provider[]; totalCount: number }> {
  const radiusMiles = params.radius ?? 25;
  const radiusMeters = Math.round(radiusMiles * MILES_TO_METERS);

  const query = new URLSearchParams();
  query.set("sAddr", `${params.lat},${params.lng}`);
  query.set("limitType", "2");
  query.set("limitValue", String(radiusMeters));
  query.set("page", String(params.page ?? 1));
  query.set("pageSize", String(Math.min(params.pageSize ?? 25, 100)));
  query.set("sort", "0"); // nearest first

  if (params.type) {
    query.set("sType", params.type);
  }
  if (params.services) {
    query.set("sCodes", params.services);
  }
  if (params.stateCode) {
    query.set("stateCode", params.stateCode);
  }

  const response = await fetch(`${BASE_URL}?${query.toString()}`, {
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error(
      `FindTreatment.gov API error: ${response.status} ${response.statusText}`
    );
  }

  const data: FindTreatmentResponse = await response.json();

  return {
    providers: data.rows.map(transformRow),
    totalCount: data.recordCount,
  };
}

function transformRow(row: FindTreatmentRow): Provider {
  const id = Buffer.from(
    `${row.name1}|${row.street1}|${row.city}|${row.state}|${row.zip}`
  )
    .toString("base64url")
    .slice(0, 32);

  return {
    id,
    source: "findtreatment",
    name: row.name1,
    nameLine2: row.name2 || null,
    address: {
      street1: row.street1,
      street2: row.street2 || null,
      city: row.city,
      state: row.state,
      zip: row.zip,
    },
    phone: row.phone || null,
    website: row.website ? normalizeUrl(row.website) : null,
    location: {
      lat: parseFloat(row.latitude),
      lng: parseFloat(row.longitude),
    },
    distance: row.miles,
    facilityType: row.type_facility,
    taxonomies: [],
    services: extractServices(row.services),
  };
}

function extractServices(
  services: FindTreatmentRow["services"]
): ProviderServices {
  const result: ProviderServices = {
    typeOfCare: [],
    serviceSetting: [],
    ageGroups: [],
    paymentAccepted: [],
    paymentAssistance: [],
    specialPrograms: [],
    languageServices: [],
  };

  const codeMap: Record<string, keyof ProviderServices> = {
    TC: "typeOfCare",
    SET: "serviceSetting",
    AGE: "ageGroups",
    PAY: "paymentAccepted",
    PYAS: "paymentAssistance",
    SG: "specialPrograms",
    SL: "languageServices",
  };

  for (const svc of services) {
    const field = codeMap[svc.f2];
    if (field) {
      result[field] = svc.f3
        .split(";")
        .map((s) => s.trim())
        .filter(Boolean);
    }
  }

  return result;
}

function normalizeUrl(url: string): string {
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  return `https://${url}`;
}
