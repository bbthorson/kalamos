import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  Monitor,
  Stethoscope,
  BookOpen,
  Shield,
} from "lucide-react";
import { getCompendiumMetadata } from "@kalamos/compendium-data";

const firmTypes = [
  "Federally Qualified Health Centers",
  "Ryan White-Funded Clinics",
  "340B-Covered Entities",
  "Community Health Centers",
  "HIV Specialty Practices",
];

export default function HomePage() {
  const meta = getCompendiumMetadata();

  return (
    <>
      {/* Hero */}
      <section className="relative bg-shadow-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-shadow-900 via-shadow-800 to-primary-950 opacity-95" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight font-[family-name:var(--font-heading)]">
              Prescribe{" "}
              <span className="text-primary-300">Pride.</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-shadow-200 leading-relaxed">
              Integrated behavioral health that helps patients living with HIV
              stay in care, stay on treatment, and thrive. Technology and
              clinical services — together or on their own.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link href="/platform">
                <Button
                  size="lg"
                  className="bg-primary-500 hover:bg-primary-600 text-white"
                >
                  Explore Our Platform
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </Link>
              <Link href="/services">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-shadow-300 text-white hover:bg-shadow-800 hover:text-white"
                >
                  Explore Our Services
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Patient Impact */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-warm-900">
              Better Outcomes Start with Better Support
            </h2>
            <p className="mt-6 text-lg text-warm-600 leading-relaxed">
              Today, 50% of patients struggle with daily medication adherence.
              With targeted behavioral health interventions, adherence can
              improve by <strong className="text-primary-700">68%</strong> —
              keeping patients healthier, longer.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
            <div>
              <p className="text-3xl font-bold text-primary-700">68%</p>
              <p className="text-sm text-warm-600 mt-1">
                Improvement in daily medication adherence
              </p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary-700">
                {meta.treatmentCount}
              </p>
              <p className="text-sm text-warm-600 mt-1">
                Evidence-based treatment programs
              </p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary-700">4</p>
              <p className="text-sm text-warm-600 mt-1">
                EHE pillars: Diagnose, Treat, Prevent, Respond
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Work With */}
      <section className="py-16 bg-warm-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-warm-900">
              Who We Work With
            </h2>
            <p className="mt-4 text-lg text-warm-600">
              We partner with the organizations already serving the communities
              most affected by HIV.
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

      {/* Platform + Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-warm-900">
              Technology and Services, Together or Apart
            </h2>
            <p className="mt-4 text-lg text-warm-600">
              Adopt the tools your clinic needs, add clinical services when
              you&apos;re ready — or start with both.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-0 shadow-md">
              <CardContent className="p-8 pt-8">
                <div className="w-14 h-14 mb-4 rounded-full bg-primary-50 flex items-center justify-center">
                  <Monitor
                    className="h-7 w-7 text-primary-600"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-xl font-semibold text-warm-900 mb-3">
                  Our Platform
                </h3>
                <p className="text-sm text-warm-600 mb-6">
                  Provider directory, patient intake, intervention matching, and
                  outcomes tracking — white-labeled as your own.
                </p>
                <Link href="/platform">
                  <Button variant="outline" size="sm">
                    Learn More
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardContent className="p-8 pt-8">
                <div className="w-14 h-14 mb-4 rounded-full bg-primary-50 flex items-center justify-center">
                  <Stethoscope
                    className="h-7 w-7 text-primary-600"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-xl font-semibold text-warm-900 mb-3">
                  Our Services
                </h3>
                <p className="text-sm text-warm-600 mb-6">
                  Contracted behavioral health therapists delivering
                  evidence-based programs — no hiring, no training, no
                  scheduling.
                </p>
                <Link href="/services">
                  <Button variant="outline" size="sm">
                    Learn More
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Evidence Strip */}
      <section className="py-12 bg-warm-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen
              className="h-5 w-5 text-primary-600"
              aria-hidden="true"
            />
            <Shield
              className="h-5 w-5 text-primary-600"
              aria-hidden="true"
            />
          </div>
          <p className="text-warm-600 max-w-2xl mx-auto">
            Every program on the Kalamos platform is drawn from the CDC&apos;s
            Compendium of Evidence-Based Interventions — the gold standard for
            what works in HIV behavioral health.
          </p>
          <div className="mt-4">
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
      <section className="py-20 bg-shadow-900 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold">
            End the HIV Epidemic Together
          </h2>
          <p className="mt-4 text-lg text-shadow-200">
            Whether you need technology to support your patients or therapists
            to deliver care — we&apos;d love to connect.
          </p>
          <div className="mt-8">
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-primary-500 hover:bg-primary-600 text-white"
              >
                Contact Us
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
