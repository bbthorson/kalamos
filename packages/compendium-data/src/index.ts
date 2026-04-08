// Types
export type {
  TreatmentIntervention,
  PreventionPublication,
  CompendiumMetadata,
  TreatmentFilters,
  PreventionFilters,
  EHEPillar,
} from "./types";

export { EHE_PILLARS } from "./types";

// Schemas
export {
  treatmentInterventionSchema,
  preventionPublicationSchema,
  compendiumMetadataSchema,
} from "./schema";

// Data access & filtering
export {
  getTreatmentInterventions,
  getPreventionPublications,
  getInterventionById,
  getPublicationById,
  getCompendiumMetadata,
  searchCompendium,
} from "./filters";

// Population themes
export type { PopulationTheme } from "./population-themes";
export { getPopulationThemes } from "./population-themes";
