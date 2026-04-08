import { Suspense } from "react";
import {
  getTreatmentInterventions,
  getPreventionPublications,
  getCompendiumMetadata,
} from "@kalamos/compendium-data";
import { CompendiumSearch } from "@/components/search/compendium-search";
import { BookOpen, FileText } from "lucide-react";

export default async function CatalogPage() {
  const [interventions, publications, metadata] = await Promise.all([
    getTreatmentInterventions(),
    getPreventionPublications(),
    getCompendiumMetadata(),
  ]);

  return (
    <div className="min-h-screen bg-warm-50">
      {/* Hero */}
      <section className="border-b border-warm-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-semibold tracking-tight text-warm-900 sm:text-4xl font-heading">
            CDC HIV Compendium
          </h1>
          <p className="mt-3 max-w-2xl text-warm-600">
            Browse evidence-based interventions and prevention research from the
            CDC&rsquo;s Compendium of Evidence-Based Interventions and Best
            Practices for HIV Prevention.
          </p>
          <div className="mt-6 flex gap-6">
            <div className="flex items-center gap-2 text-sm text-warm-700">
              <BookOpen className="h-4 w-4 text-primary-600" />
              <span className="font-medium">{metadata.treatmentCount}</span>{" "}
              Treatment Interventions
            </div>
            <div className="flex items-center gap-2 text-sm text-warm-700">
              <FileText className="h-4 w-4 text-primary-600" />
              <span className="font-medium">{metadata.preventionCount}</span>{" "}
              Prevention Publications
            </div>
          </div>
        </div>
      </section>

      {/* Catalog */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Suspense>
          <CompendiumSearch
            interventions={interventions}
            publications={publications}
            metadata={metadata}
          />
        </Suspense>
      </section>
    </div>
  );
}
