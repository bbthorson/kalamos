import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  CheckCircle,
  Clock,
  Shield,
  DollarSign,
  Users,
  ClipboardCheck,
  MapPin,
  Search,
  Star,
} from "lucide-react";
import { getCompendiumMetadata } from "@/lib/compendium";
import { getPopulationThemes } from "@/lib/compendium/population-themes";
import { EngagementProgramCard } from "@/components/for-clinics/engagement-program-card";

export const metadata: Metadata = {
  title: "For Clinics",
  description:
    "Keep your HIV patients engaged, retained, and thriving with evidence-based behavioral health programs from Kalamos. No hiring, no training, no scheduling.",
};

export default function ForClinicsPage() {
  const meta = getCompendiumMetadata();
  const themes = getPopulationThemes();

  return (
    <>
      {/* Hero */}
      <section className="py-20 bg-shadow-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Keep Your Patients Engaged, Retained, and Thriving
            </h1>
            <p className="mt-6 text-lg text-shadow-200 leading-relaxed">
              Kalamos delivers {meta.treatmentCount} evidence-based behavioral
              health programs that keep your HIV patients in care, adherent to
              treatment, and connected to your clinic.
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

      {/* The Engagement Problem */}
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
                  We Run the Programs
                </h3>
                <p className="text-sm text-warm-600">
                  We handle scheduling, program delivery, and outcomes tracking.
                  Your staff stays focused on clinical care.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6 pt-6">
                <div className="mx-auto w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center mb-4">
                  <DollarSign
                    className="h-6 w-6 text-primary-600"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-lg font-semibold text-warm-900 mb-2">
                  We Handle the Billing
                </h3>
                <p className="text-sm text-warm-600">
                  Programs are covered through Integrated Behavioral Health
                  billing — your patients access care through their existing
                  insurance.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* BHI Comparison */}
      <section className="py-20 bg-warm-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-warm-900">
              How Your Patients Access This
            </h2>
            <p className="mt-4 text-lg text-warm-600">
              Integrated Behavioral Health (BHI) lets your therapists&apos; care
              be covered through existing insurance — no additional credentialing
              required.
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-warm-300 bg-warm-100">
              <CardContent className="p-6 pt-6">
                <h3 className="text-lg font-semibold text-warm-500 mb-4">
                  Without BHI
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-warm-500">
                    <Clock
                      className="h-5 w-5 shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span className="text-sm">3-4 month wait times</span>
                  </li>
                  <li className="flex items-start gap-3 text-warm-500">
                    <Shield
                      className="h-5 w-5 shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span className="text-sm">Black box outcomes</span>
                  </li>
                  <li className="flex items-start gap-3 text-warm-500">
                    <DollarSign
                      className="h-5 w-5 shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span className="text-sm">Prohibitively expensive</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-primary-200 bg-primary-50">
              <CardContent className="p-6 pt-6">
                <h3 className="text-lg font-semibold text-primary-700 mb-4">
                  With Kalamos
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-primary-700">
                    <CheckCircle
                      className="h-5 w-5 shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span className="text-sm">Next-day appointments</span>
                  </li>
                  <li className="flex items-start gap-3 text-primary-700">
                    <CheckCircle
                      className="h-5 w-5 shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span className="text-sm">
                      Integrated with physical care
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-primary-700">
                    <CheckCircle
                      className="h-5 w-5 shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span className="text-sm">Covered by insurance</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Evidence Strip */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 text-center">
            <div>
              <p className="text-3xl font-bold text-primary-700">
                {meta.treatmentCount}
              </p>
              <p className="text-sm text-warm-600">Treatment Programs</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary-700">
                {meta.preventionCount}
              </p>
              <p className="text-sm text-warm-600">Prevention Publications</p>
            </div>
          </div>
          <p className="mt-6 text-center text-warm-600 max-w-2xl mx-auto">
            Every program in the Kalamos platform is drawn from the CDC&apos;s
            Compendium of Evidence-Based Interventions — the gold standard for
            what works in HIV behavioral health.
          </p>
          <div className="mt-4 text-center">
            <Link
              href="/compendium"
              className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center gap-1"
            >
              Explore our full program library
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Provider Directory */}
      <section className="py-20 bg-warm-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-warm-900">
                Get Found by the Patients Who Need You
              </h2>
              <p className="mt-4 text-warm-600 leading-relaxed">
                Clinics that partner with Kalamos get listed in our provider
                directory. Patients searching for HIV behavioral health services
                near them will find your clinic — no marketing budget required.
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
                    Highlight the engagement programs you offer
                  </span>
                </li>
              </ul>
              <div className="mt-8">
                <Link href="/contact">
                  <Button size="lg">
                    List Your Clinic
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
                  <div className="ml-auto flex items-center gap-1 text-amber-500">
                    <Star className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
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

      {/* CTA */}
      <section className="py-16 bg-primary-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-warm-900">
            Ready to Retain More Patients?
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
            <Link href="/compendium">
              <Button variant="outline" size="lg">
                Explore Programs
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
