import type { Metadata } from "next";
import {
  getTreatmentInterventions,
  getPreventionPublications,
  getPopulationThemes,
  EHE_PILLARS,
} from "@kalamos/compendium-data";
import { ExploreCharts } from "@/components/explore/explore-charts";

export const metadata: Metadata = {
  title: "Explore",
  description:
    "Visual exploration of CDC evidence-based HIV interventions: EHE pillar distribution, efficacy tiers, and population coverage.",
};

function computeEhePillarData() {
  const treatments = getTreatmentInterventions();
  const publications = getPreventionPublications();

  return EHE_PILLARS.map((pillar) => ({
    pillar,
    treatments: treatments.filter((t) => t.ehePillars.includes(pillar)).length,
    publications: publications.filter((p) => p.ehePillars.includes(pillar)).length,
  }));
}

function computeEfficacyData() {
  const treatments = getTreatmentInterventions();
  const counts = new Map<string, number>();

  for (const t of treatments) {
    const rating = t.efficacyRating || "Unknown";
    counts.set(rating, (counts.get(rating) ?? 0) + 1);
  }

  return Array.from(counts.entries())
    .map(([tier, count]) => ({ tier, count }))
    .sort((a, b) => b.count - a.count);
}

function computeStudyLocationData() {
  const treatments = getTreatmentInterventions();
  const counts = new Map<string, number>();

  for (const t of treatments) {
    const loc = t.studyLocation || "Not reported";
    counts.set(loc, (counts.get(loc) ?? 0) + 1);
  }

  return Array.from(counts.entries())
    .map(([location, count]) => ({ location, count }))
    .sort((a, b) => b.count - a.count);
}

function computeDurationData() {
  const treatments = getTreatmentInterventions();
  const counts = new Map<string, number>();

  for (const t of treatments) {
    const dur = t.duration || "Not reported";
    counts.set(dur, (counts.get(dur) ?? 0) + 1);
  }

  return Array.from(counts.entries())
    .map(([duration, count]) => ({ duration, count }))
    .sort((a, b) => b.count - a.count);
}

export default function ExplorePage() {
  const ehePillarData = computeEhePillarData();
  const efficacyData = computeEfficacyData();
  const populationThemes = getPopulationThemes();
  const studyLocationData = computeStudyLocationData();
  const durationData = computeDurationData();
  const treatments = getTreatmentInterventions();
  const publications = getPreventionPublications();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-warm-900 font-[family-name:var(--font-heading)]">
          Explore the Compendium
        </h1>
        <p className="mt-2 text-warm-600 max-w-2xl">
          Visual overview of {treatments.length} evidence-based treatment
          interventions and {publications.length} prevention publications from
          the CDC Compendium.
        </p>
      </div>

      <ExploreCharts
        ehePillarData={ehePillarData}
        efficacyData={efficacyData}
        populationThemes={populationThemes.map((t) => ({
          label: t.label,
          count: t.interventionCount,
        }))}
        studyLocationData={studyLocationData}
        durationData={durationData}
      />
    </div>
  );
}
