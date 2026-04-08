import type { Metadata } from "next";
import { CompendiumSearch } from "@/components/compendium/compendium-search";
import {
  getTreatmentInterventions,
  getPreventionPublications,
  getCompendiumMetadata,
} from "@kalamos/compendium-data";

export const metadata: Metadata = {
  title: "CDC HIV Compendium Explorer",
  description:
    "Search and explore the CDC's HIV Compendium of Evidence-Based Interventions and Prevention Research Synthesis publications.",
};

export default function CompendiumPage() {
  const treatments = getTreatmentInterventions();
  const publications = getPreventionPublications();
  const meta = getCompendiumMetadata();

  return (
    <div>
      {/* Hero */}
      <section className="bg-shadow-900 text-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold font-heading tracking-tight">
            CDC HIV Compendium Explorer
          </h1>
          <p className="mt-4 text-lg text-shadow-200 max-w-3xl">
            Search the CDC&apos;s Prevention Research Synthesis HIV Compendium
            — {meta.treatmentCount} evidence-based treatment interventions and{" "}
            {meta.preventionCount} prevention research publications.
          </p>
          <p className="mt-2 text-sm text-shadow-300">
            Last updated: {meta.lastUpdated}
          </p>
        </div>
      </section>

      {/* Search */}
      <section className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <CompendiumSearch
            treatments={treatments}
            publications={publications}
            metadata={meta}
          />
        </div>
      </section>
    </div>
  );
}
