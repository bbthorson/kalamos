import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  Users,
  ClipboardCheck,
  Shield,
} from "lucide-react";
import { getCompendiumMetadata } from "@kalamos/compendium-data";
import { getPopulationThemes } from "@kalamos/compendium-data";
import { EngagementProgramCard } from "@/components/services/engagement-program-card";
import { PopulationSpotlightCard } from "@/components/services/population-spotlight-card";
import { BhiComparison } from "@/components/shared/bhi-comparison";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Dedicated therapists delivering evidence-based behavioral health programs to the patients who need them most. No hiring, no training, no scheduling.",
};

const firmTypes = [
  "Federally Qualified Health Centers",
  "Ryan White-Funded Clinics",
  "340B-Covered Entities",
  "Community Health Centers",
  "HIV Specialty Practices",
];

export default function ServicesPage() {
  const meta = getCompendiumMetadata();
  const themes = getPopulationThemes();
  const spotlightThemes = themes.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="py-20 bg-shadow-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Dedicated Therapists for the Patients Who Need Them Most
            </h1>
            <p className="mt-6 text-lg text-shadow-200 leading-relaxed">
              Kalamos provides contracted behavioral health therapists who
              deliver {meta.treatmentCount} evidence-based programs — matched to
              your patient population, integrated into your care team.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a href="#programs">
                <Button
                  size="lg"
                  className="bg-primary-500 hover:bg-primary-600 text-white"
                >
                  Explore Our Programs
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </a>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-shadow-400 text-white hover:bg-shadow-800"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* The Patient Engagement Challenge */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-warm-900 mb-12 text-center">
              The Patient Engagement Challenge
            </h2>

            <div className="space-y-10">
              <div>
                <h3 className="text-xl font-semibold text-warm-900 mb-3">
                  Patients Fall Out of Care
                </h3>
                <p className="text-warm-600 leading-relaxed">
                  Despite your best efforts, patients disengage from HIV
                  treatment. Without behavioral health support, adherence drops,
                  viral loads rise, and outcomes suffer. This is a retention
                  problem — not just a clinical one.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-warm-900 mb-3">
                  You Can&apos;t Staff What You Can&apos;t Fund
                </h3>
                <p className="text-warm-600 leading-relaxed">
                  Building an in-house behavioral health team is expensive and
                  slow. Most clinics want to offer more but can&apos;t justify
                  the headcount — leaving patients without the support they need.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-warm-900 mb-3">
                  One-Size-Fits-All Doesn&apos;t Work
                </h3>
                <p className="text-warm-600 leading-relaxed">
                  Your patient population has specific needs. Generic referrals
                  to community mental health don&apos;t address HIV-specific
                  behavioral challenges — and patients know the difference.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Catalog */}
      <section id="programs" className="py-20 bg-warm-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-warm-900">
              Patient Engagement Programs
            </h2>
            <p className="mt-4 text-lg text-warm-600">
              Each program draws from CDC-approved evidence-based interventions
              tailored to a specific patient population. Tell us who you serve —
              we&apos;ll build the program.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {themes.map((theme) => (
              <EngagementProgramCard key={theme.id} theme={theme} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-warm-900">How It Works</h2>
            <p className="mt-4 text-lg text-warm-600">
              Kalamos handles the complexity so your team stays focused on
              clinical care.
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="p-6 pt-6">
                <div className="mx-auto w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center mb-4">
                  <Users
                    className="h-6 w-6 text-primary-600"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-lg font-semibold text-warm-900 mb-2">
                  We Bring the Therapists
                </h3>
                <p className="text-sm text-warm-600">
                  No hiring, no recruiting. Kalamos provides trained, culturally
                  competent therapists who deliver programs to your patients.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6 pt-6">
                <div className="mx-auto w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center mb-4">
                  <ClipboardCheck
                    className="h-6 w-6 text-primary-600"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-lg font-semibold text-warm-900 mb-2">
                  We Match Patients to Programs
                </h3>
                <p className="text-sm text-warm-600">
                  Every patient gets an evidence-based program tailored to their
                  population and needs — not a generic referral.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6 pt-6">
                <div className="mx-auto w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center mb-4">
                  <Shield
                    className="h-6 w-6 text-primary-600"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-lg font-semibold text-warm-900 mb-2">
                  Care Is Covered Through Insurance
                </h3>
                <p className="text-sm text-warm-600">
                  Programs are delivered through Integrated Behavioral Health —
                  your patients access care through their existing coverage.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* BHI Comparison */}
      <BhiComparison
        title="How Your Patients Access This"
        subtitle="Integrated Behavioral Health (BHI) lets your therapists' care be covered through existing insurance — no additional credentialing required."
        withoutItems={[
          { iconName: "Clock", text: "3-4 month wait times" },
          { iconName: "Shield", text: "Black box outcomes" },
          { iconName: "DollarSign", text: "Prohibitively expensive" },
        ]}
        withItems={[
          "Next-day appointments",
          "Integrated with physical care",
          "Covered by insurance",
        ]}
      />

      {/* Therapist Teaser */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-warm-900">
              Meet the Therapists Behind the Work
            </h2>
            <p className="mt-4 text-lg text-warm-600">
              Kalamos therapists choose the populations they want to serve and
              deliver evidence-based programs they believe in.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {spotlightThemes.map((theme) => (
              <PopulationSpotlightCard key={theme.id} theme={theme} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href="/services/therapists">
              <Button variant="outline" size="lg">
                Learn About Joining Our Network
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="py-16 bg-warm-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-3xl font-bold text-warm-900">
              Built for Organizations That Put Patients First
            </h2>
            <p className="mt-4 text-lg text-warm-600">
              Our services are designed for the clinics and health centers
              already serving the communities most affected by HIV.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {firmTypes.map((type) => (
              <span
                key={type}
                className="px-4 py-2 rounded-full bg-white border border-warm-200 text-sm font-medium text-warm-700 shadow-sm"
              >
                {type}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-warm-900">
            Ready to Keep More Patients in Care?
          </h2>
          <p className="mt-3 text-warm-600">
            Tell us about your patient population. We&apos;ll show you the
            programs that fit.
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
                Explore Programs
              </Button>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
