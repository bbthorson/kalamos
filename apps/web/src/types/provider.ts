// === Unified provider types ===

export interface ProviderAddress {
  street1: string;
  street2: string | null;
  city: string;
  state: string;
  zip: string;
}

export interface ProviderLocation {
  lat: number;
  lng: number;
}

export interface Provider {
  id: string;
  source: "findtreatment" | "npi";
  name: string;
  nameLine2: string | null;
  address: ProviderAddress;
  phone: string | null;
  website: string | null;
  location: ProviderLocation | null;
  distance: number | null;
  facilityType: string | null;
  taxonomies: ProviderTaxonomy[];
  services: ProviderServices;
}

export interface ProviderTaxonomy {
  code: string;
  description: string;
  primary: boolean;
  state: string | null;
  license: string | null;
}

export interface ProviderServices {
  typeOfCare: string[];
  serviceSetting: string[];
  ageGroups: string[];
  paymentAccepted: string[];
  paymentAssistance: string[];
  specialPrograms: string[];
  languageServices: string[];
}

// === Search params ===

export interface ProviderSearchParams {
  /** Address or location string to geocode */
  address?: string;
  /** Pre-resolved latitude */
  lat?: number;
  /** Pre-resolved longitude */
  lng?: number;
  /** Search radius in miles (default: 25) */
  radius?: number;
  /** FindTreatment.gov facility type filter */
  type?: "sa" | "mh" | "both";
  /** NPI taxonomy codes to filter by */
  taxonomyCodes?: string[];
  /** State abbreviation */
  state?: string;
  /** Page number (default: 1) */
  page?: number;
  /** Results per page (default: 25) */
  pageSize?: number;
  /** Which data sources to query */
  sources?: ("findtreatment" | "npi")[];
}

export interface ProviderSearchResult {
  providers: Provider[];
  page: number;
  totalCount: number;
  sources: string[];
  geocoded?: {
    lat: number;
    lng: number;
    matchedAddress: string;
  };
}

// === FindTreatment.gov raw API types ===

export interface FindTreatmentRow {
  _irow: number;
  name1: string;
  name2: string | null;
  street1: string;
  street2: string | null;
  city: string;
  state: string;
  zip: string;
  phone: string;
  type_facility: string;
  intake1: string | null;
  hotline1: string | null;
  website: string | null;
  latitude: string;
  longitude: string;
  miles: number;
  services: FindTreatmentService[];
}

export interface FindTreatmentService {
  f1: string;
  f2: string;
  f3: string;
}

export interface FindTreatmentResponse {
  page: number;
  totalPages: number;
  recordCount: number;
  rows: FindTreatmentRow[];
}

// === NPI Registry raw API types ===

export interface NpiResult {
  number: number;
  enumeration_type: "NPI-1" | "NPI-2";
  last_updated: string;
  created_date: string;
  basic: {
    first_name?: string;
    last_name?: string;
    middle_name?: string;
    name_prefix?: string;
    credential?: string;
    organization_name?: string;
    sole_proprietor?: string;
    gender?: string;
    enumeration_date: string;
    last_updated: string;
    status: string;
  };
  taxonomies: NpiTaxonomy[];
  addresses: NpiAddress[];
  endpoints: NpiEndpoint[];
}

export interface NpiTaxonomy {
  code: string;
  desc: string;
  primary: boolean;
  state: string;
  license: string;
}

export interface NpiAddress {
  country_code: string;
  country_name: string;
  address_purpose: "LOCATION" | "MAILING";
  address_type: string;
  address_1: string;
  address_2?: string;
  city: string;
  state: string;
  postal_code: string;
  telephone_number?: string;
  fax_number?: string;
}

export interface NpiEndpoint {
  endpoint: string;
  endpoint_type: string;
}

export interface NpiResponse {
  result_count: number;
  results: NpiResult[];
}
