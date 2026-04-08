// Types
export type {
  TreatmentIntervention,
  PreventionPublication,
  CompendiumMetadata,
  TreatmentFilters,
  PreventionFilters,
  UnifiedFilters,
  ClinicalCategory,
  EHEPillar,
} from "./types";

export { EHE_PILLARS } from "./types";

// Classification
export {
  CLINICAL_CATEGORIES,
  CATEGORY_LABELS,
  classifyIntervention,
  classifyPublication,
} from "./classify";

// Schemas
export {
  treatmentInterventionSchema,
  preventionPublicationSchema,
  compendiumMetadataSchema,
} from "./schema";

// Data access & filtering
export type {
  ClassifiedIntervention,
  ClassifiedPublication,
  ClassifiedItem,
} from "./filters";

export {
  getTreatmentInterventions,
  getPreventionPublications,
  getInterventionById,
  getPublicationById,
  getCompendiumMetadata,
  searchCompendium,
  getClassifiedInterventions,
  getClassifiedPublications,
  getAllClassified,
  getCategoryCounts,
} from "./filters";

// Population themes
export type { PopulationTheme } from "./population-themes";
export { getPopulationThemes } from "./population-themes";
