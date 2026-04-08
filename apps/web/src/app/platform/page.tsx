import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, MapPin, Search, Star } from "lucide-react";
import { getCompendiumMetadata } from "@kalamos/compendium-data";
import {
  PlatformFeatureCard,
  type PlatformFeature,
} from "@/components/platform/platform-feature-card";

export const metadata: Metadata = {
  title: "Platform",
  description:
    "Technology tools that connect patients to better care. Provider directory, patient intake, intervention matching, and outcomes tracking for HIV care clinics.",
};

const features: PlatformFeature[] = [
  {
    iconName: "Search",
    title: "Provider Directory",
    patientBenefit: "Patients find the right care faster.",
    description:
      "A searchable directory integrated with federal provider databases. Patients find your clinic by location, services, and the populations you serve.",
    href: "/find-care",
    linkLabel: "Try the live search",
  },
  {
    iconName: "ClipboardList",
    title: "Patient Intake",
    patientBenefit: "Matched to the right program before their first visit.",
    description:
      "White-label intake tools branded as your clinic's own. Patients complete a guided assessment and get connected to evidence-based programs that fit their needs.",
    href: "/for-patients",
    linkLabel: "See the patient experience",
  },
  {
    iconName: "BookOpen",
    title: "Intervention Matching",
    patientBenefit: "Every patient gets an evidence-based program, not a generic referral.",
    description:
      "Draw from the CDC's Compendium of Evidence-Based Interventions to match patients with programs proven to work for people like them.",
    href: "https://compendium.kalamos.care",
    linkLabel: "Explore the compendium",
  },
  {
    iconName: "BarChart3",
    title: "Outcomes Tracking",
    patientBenefit: "Patients and care teams see progress together.",
    description:
      "Track adherence, engagement, and clinical outcomes over time. Anonymous data write-back supports research without compromising patient privacy.",
    href: null,
    linkLabel: "Coming soon",
  },
];

const firmTypes = [
  "Federally Qualified Health Centers",
  "Ryan White-Funded Clinics",
  "340B-Covered Entities",
  "Community Health Centers",
  "HIV Specialty Practices",
];

export default function PlatformPage() {
  const meta = getCompendiumMetadata();

  return (
    <>
      {/* Hero */}
      <section className="py-20 bg-shadow-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Tools That Connect Patients to Better Care
            </h1>
            <p className="mt-6 text-lg text-shadow-200 leading-relaxed">
              Technology that helps patients find your clinic, get matched to the
              right program, and stay engaged in care — branded as your own.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link href="/find-care">
                <Button
                  size="lg"
                  className="bg-primary-500 hover:bg-primary-600 text-white"
                >
                  See It In Action
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </Link>
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

      {/* Feature Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-warm-900">
              Four Tools, One Goal
            </h2>
            <p className="mt-4 text-lg text-warm-600">
              Each module works independently or together — adopt what your
              clinic needs, when you need it.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {features.map((feature) => (
              <PlatformFeatureCard key={feature.title} feature={feature} />
            ))}
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
              Our platform is designed for the clinics and health centers already
              serving the communities most affected by HIV.
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

      {/* Provider Directory Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-warm-900">
                Get Found by the Patients Who Need You
              </h2>
              <p className="mt-4 text-warm-600 leading-relaxed">
                Clinics on the Kalamos platform are listed in our provider
                directory. Patients searching for care near them find your
                clinic — no marketing budget required.
              </p>
              <ul className="mt-6 space-y-3">
                <li className="flex items-start gap-3 text-warm-700">
                  <CheckCircle
                    className="h-5 w-5 text-primary-600 shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span className="text-sm">
                    Searchable by location, services, and patient populations
                  </span>
                </li>
                <li className="flex items-start gap-3 text-warm-700">
                  <CheckCircle
                    className="h-5 w-5 text-primary-600 shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span className="text-sm">
                    Integrated with federal provider databases
                  </span>
                </li>
                <li className="flex items-start gap-3 text-warm-700">
                  <CheckCircle
                    className="h-5 w-5 text-primary-600 shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span className="text-sm">
                    Highlight the programs you offer
                  </span>
                </li>
              </ul>
              <div className="mt-8">
                <Link href="/find-care">
                  <Button size="lg">
                    Try the Search
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Mockup search result card */}
            <div className="bg-white rounded-lg border border-warm-200 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4 text-warm-400">
                <Search className="h-5 w-5" aria-hidden="true" />
                <span className="text-sm">
                  HIV behavioral health near Austin, TX
                </span>
              </div>
              <div className="border-t border-warm-100 pt-4 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center shrink-0">
                    <MapPin
                      className="h-5 w-5 text-primary-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-warm-900 text-sm">
                      Community Health Center
                    </p>
                    <p className="text-xs text-warm-500">
                      Austin, TX &middot; 0.8 mi
                    </p>
                    <div className="flex gap-1.5 mt-1.5 flex-wrap">
                      <span className="text-xs bg-primary-50 text-primary-700 px-2 py-0.5 rounded-full">
                        LGBTQ+ Programs
                      </span>
                      <span className="text-xs bg-primary-50 text-primary-700 px-2 py-0.5 rounded-full">
                        Youth Services
                      </span>
                    </div>
                  </div>
                  <div className="ml-auto flex items-center gap-1 text-tertiary-500">
                    <Star
                      className="h-3.5 w-3.5 fill-current"
                      aria-hidden="true"
                    />
                    <span className="text-xs font-medium">4.8</span>
                  </div>
                </div>
                <div className="flex items-start gap-3 opacity-60">
                  <div className="w-10 h-10 rounded-full bg-warm-100 flex items-center justify-center shrink-0">
                    <MapPin
                      className="h-5 w-5 text-warm-400"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-warm-900 text-sm">
                      Riverside Wellness Clinic
                    </p>
                    <p className="text-xs text-warm-500">
                      Austin, TX &middot; 2.1 mi
                    </p>
                    <div className="flex gap-1.5 mt-1.5 flex-wrap">
                      <span className="text-xs bg-warm-100 text-warm-600 px-2 py-0.5 rounded-full">
                        Substance Use
                      </span>
                      <span className="text-xs bg-warm-100 text-warm-600 px-2 py-0.5 rounded-full">
                        HIV Care
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Evidence Strip */}
      <section className="py-12 bg-warm-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 text-center">
            <div>
              <p className="text-3xl font-bold text-primary-700">
                {meta.treatmentCount}
              </p>
              <p className="text-sm text-warm-600">Evidence-Based Programs</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary-700">
                {meta.preventionCount}
              </p>
              <p className="text-sm text-warm-600">Prevention Publications</p>
            </div>
          </div>
          <p className="mt-6 text-center text-warm-600 max-w-2xl mx-auto">
            Every program on the Kalamos platform is drawn from the CDC&apos;s
            Compendium of Evidence-Based Interventions — the gold standard for
            what works in HIV behavioral health.
          </p>
          <div className="mt-4 text-center">
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

      {/* CTA */}
      <section className="py-16 bg-primary-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-warm-900">
            See the Platform in Action
          </h2>
          <p className="mt-3 text-warm-600">
            Try our provider search, explore the compendium, or tell us about
            your clinic — we&apos;ll show you how the tools fit.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/find-care">
              <Button size="lg">
                Try Find Care
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
