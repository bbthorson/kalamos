import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BookOpen,
  Stethoscope,
  Shield,
} from "lucide-react";
import { getCompendiumMetadata } from "@kalamos/compendium-data";
import { getPopulationThemes } from "@kalamos/compendium-data";
import { PopulationSpotlightCard } from "@/components/services/population-spotlight-card";
import { BhiComparison } from "@/components/shared/bhi-comparison";

export const metadata: Metadata = {
  title: "For Therapists",
  description:
    "Choose the patients you were meant to help. Join Kalamos to deliver evidence-based HIV behavioral health interventions to the populations you care about.",
};

export default function TherapistsPage() {
  const meta = getCompendiumMetadata();
  const themes = getPopulationThemes();

  return (
    <>
      {/* Hero */}
      <section className="py-20 bg-shadow-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Choose the Patients You Were Meant to Help
            </h1>
            <p className="mt-6 text-lg text-shadow-200 leading-relaxed">
              Kalamos therapists are the engine of our clinical services. As a
              contracted provider, you deliver {meta.treatmentCount}{" "}
              evidence-based interventions to the specific populations you care
              about. Real patients, proven programs, meaningful work.
            </p>
            <div className="mt-8">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-primary-500 hover:bg-primary-600 text-white"
                >
                  Join Our Network
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Population Spotlight Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-warm-900">
              Who You Could Work With
            </h2>
            <p className="mt-4 text-lg text-warm-600">
              The CDC Compendium identifies {meta.populations.length} unique
              patient populations across HIV behavioral health. Here is how they
              cluster into the work you might do.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {themes.map((theme) => (
              <PopulationSpotlightCard key={theme.id} theme={theme} />
            ))}
          </div>
        </div>
      </section>

      {/* Evidence & Impact */}
      <section className="py-20 bg-warm-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-warm-900">
              Evidence Behind the Work
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mb-10">
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <BookOpen
                  className="h-6 w-6 text-primary-600"
                  aria-hidden="true"
                />
              </div>
              <p className="text-3xl font-bold text-warm-900">
                {meta.treatmentCount}
              </p>
              <p className="text-sm text-warm-600">Treatment Interventions</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <Stethoscope
                  className="h-6 w-6 text-primary-600"
                  aria-hidden="true"
                />
              </div>
              <p className="text-3xl font-bold text-warm-900">
                {meta.preventionCount}
              </p>
              <p className="text-sm text-warm-600">Prevention Publications</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <Shield
                  className="h-6 w-6 text-primary-600"
                  aria-hidden="true"
                />
              </div>
              <p className="text-3xl font-bold text-warm-900">4</p>
              <p className="text-sm text-warm-600">
                EHE Pillars: Diagnose, Treat, Prevent, Respond
              </p>
            </div>
          </div>

          <div className="max-w-3xl mx-auto text-center">
            <p className="text-warm-600 leading-relaxed mb-6">
              Every intervention in the Kalamos platform is drawn from the
              CDC&apos;s Compendium of Evidence-Based Interventions and Best
              Practices for HIV Prevention. These aren&apos;t theoretical
              frameworks — they&apos;re programs with published outcomes, tested
              with real patients in real clinical settings.
            </p>
            <a
              href="https://compendium.kalamos.care"
              className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center gap-1"
            >
              Explore the full compendium
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {/* BHI Comparison */}
      <BhiComparison
        title="How It Works"
        subtitle="Integrated Behavioral Health (BHI) coverage without expensive credentialing costs."
        withoutItems={[
          { iconName: "DollarSign", text: "Prohibitively expensive contracting" },
          { iconName: "Users", text: "Isolated from primary care" },
          { iconName: "BarChart3", text: "Billable time oriented" },
        ]}
        withItems={[
          "Covered by insurance",
          "Whole person care",
          "Outcomes oriented",
        ]}
      />

      {/* CTA */}
      <section className="py-16 bg-primary-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-warm-900">
            Ready to do the work that matters?
          </h2>
          <p className="mt-3 text-warm-600">
            Join our network of therapists delivering evidence-based care to the
            communities that need it most.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/contact">
              <Button size="lg">
                Contact Us
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </Link>
            <a href="https://compendium.kalamos.care">
              <Button variant="outline" size="lg">
                Explore the Compendium
              </Button>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
