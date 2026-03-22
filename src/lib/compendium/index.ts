import type {
  TreatmentIntervention,
  PreventionPublication,
  CompendiumMetadata,
  TreatmentFilters,
  PreventionFilters,
} from "@/types/compendium";
import treatmentData from "@/data/compendium-treatment.json";
import preventionData from "@/data/compendium-prevention.json";
import metadataData from "@/data/compendium-metadata.json";

const treatments = treatmentData as TreatmentIntervention[];
const publications = preventionData as PreventionPublication[];
const metadata = metadataData as CompendiumMetadata;

function matchesText(text: string, query: string): boolean {
  const lower = query.toLowerCase();
  return text.toLowerCase().includes(lower);
}

function matchesAny(values: string[], filters: string[]): boolean {
  if (filters.length === 0) return true;
  const lowerFilters = filters.map((f) => f.toLowerCase());
  return values.some((v) => lowerFilters.includes(v.toLowerCase()));
}

export function getTreatmentInterventions(
  filters?: TreatmentFilters
): TreatmentIntervention[] {
  if (!filters) return treatments;

  return treatments.filter((item) => {
    if (
      filters.query &&
      !matchesText(item.name, filters.query) &&
      !matchesText(item.description, filters.query) &&
      !item.populations.some((p) => matchesText(p, filters.query!)) &&
      !item.keyEffects.some((e) => matchesText(e, filters.query!))
    ) {
      return false;
    }

    if (
      filters.populations?.length &&
      !matchesAny(item.populations, filters.populations)
    ) {
      return false;
    }

    if (
      filters.effects?.length &&
      !matchesAny(item.keyEffects, filters.effects)
    ) {
      return false;
    }

    if (
      filters.strategies?.length &&
      !matchesAny(item.strategies, filters.strategies)
    ) {
      return false;
    }

    if (
      filters.ehePillars?.length &&
      !matchesAny(item.ehePillars, filters.ehePillars)
    ) {
      return false;
    }

    if (
      filters.efficacy?.length &&
      !filters.efficacy.some((e) =>
        item.efficacyRating.toLowerCase().includes(e.toLowerCase())
      )
    ) {
      return false;
    }

    return true;
  });
}

export function getPreventionPublications(
  filters?: PreventionFilters
): PreventionPublication[] {
  if (!filters) return publications;

  return publications.filter((item) => {
    if (
      filters.query &&
      !matchesText(item.title, filters.query) &&
      !matchesText(item.citation, filters.query) &&
      !matchesText(item.authors, filters.query) &&
      !item.populations.some((p) => matchesText(p, filters.query!))
    ) {
      return false;
    }

    if (
      filters.populations?.length &&
      !matchesAny(item.populations, filters.populations)
    ) {
      return false;
    }

    if (
      filters.outcomes?.length &&
      !matchesAny(item.keyOutcomes, filters.outcomes)
    ) {
      return false;
    }

    if (
      filters.publicationTypes?.length &&
      !filters.publicationTypes.includes(item.publicationType)
    ) {
      return false;
    }

    if (
      filters.ehePillars?.length &&
      !matchesAny(item.ehePillars, filters.ehePillars)
    ) {
      return false;
    }

    return true;
  });
}

export function getInterventionById(
  id: string
): TreatmentIntervention | undefined {
  return treatments.find((i) => i.id === id);
}

export function getPublicationById(
  id: string
): PreventionPublication | undefined {
  return publications.find((p) => p.id === id);
}

export function getCompendiumMetadata(): CompendiumMetadata {
  return metadata;
}

export function searchCompendium(query: string) {
  const treatmentResults = getTreatmentInterventions({ query });
  const preventionResults = getPreventionPublications({ query });
  return { treatments: treatmentResults, publications: preventionResults };
}
