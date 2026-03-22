export const EHE_PILLARS = ["Diagnose", "Treat", "Prevent", "Respond"] as const;
export type EHEPillar = (typeof EHE_PILLARS)[number];

export interface TreatmentIntervention {
  id: string;
  name: string;
  description: string;
  populations: string[];
  keyEffects: string[];
  strategies: string[];
  efficacyRating: string;
  ehePillars: EHEPillar[];
  studyLocation: "Domestic" | "International" | "Both" | null;
  duration: "Single-session" | "Multi-session" | null;
  yearRange: { start: number; end: number } | null;
  publications: {
    title: string;
    url: string;
    citation: string;
  }[];
  contactEmail: string | null;
}

export interface PreventionPublication {
  id: string;
  title: string;
  authors: string;
  publicationType: string;
  publicationYear: number | null;
  populations: string[];
  keyOutcomes: string[];
  ehePillars: EHEPillar[];
  links: {
    pubmed?: string;
    pmc?: string;
    doi?: string;
    prospero?: string;
  };
  citation: string;
}

export interface CompendiumMetadata {
  populations: string[];
  effects: string[];
  outcomes: string[];
  strategies: string[];
  publicationTypes: string[];
  ehePillars: readonly string[];
  lastUpdated: string;
  treatmentCount: number;
  preventionCount: number;
}

export interface TreatmentFilters {
  query?: string;
  populations?: string[];
  effects?: string[];
  strategies?: string[];
  ehePillars?: EHEPillar[];
  efficacy?: string[];
}

export interface PreventionFilters {
  query?: string;
  populations?: string[];
  outcomes?: string[];
  publicationTypes?: string[];
  ehePillars?: EHEPillar[];
}
