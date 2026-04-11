import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  CheckCircle,
  MapPin,
  Search,
  Star,
  Users,
  ClipboardList,
  BookOpen,
  BarChart3,
  Layers,
} from "lucide-react";
import { getCompendiumMetadata } from "@kalamos/compendium-data";

export const metadata: Metadata = {
  title: "Technology",
  description:
    "Technology layers that improve how patients find your clinic, get matched to the right program, and stay connected to your care team — without changing how your staff works today.",
};

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
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight font-heading">
              Technology That Layers on Top of How You Already Work
            </h1>
            <p className="mt-6 text-lg text-shadow-200 leading-relaxed">
              Your EHR, your scheduling system, your front desk — they
              stay. Kalamos adds the pieces that are hard to build yourself:
              patient-facing search, guided intake, evidence-based program
              matching, and outcomes visibility. Each layer works with your
              existing operations, not around them.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link href="/find-care">
                <Button
                  size="lg"
                  className="bg-primary-500 hover:bg-primary-600 text-white"
                >
                  Try Find Care
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-shadow-400 text-white hover:bg-shadow-800"
                >
                  Start a Conversation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* The Gap */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-warm-900 mb-4 text-center font-heading">
              Your Operations Work. The Patient Experience Has Gaps.
            </h2>
            <p className="text-center text-warm-600 mb-12 max-w-2xl mx-auto">
              Most clinics have invested heavily in their clinical systems.
              What&apos;s missing isn&apos;t better software for your staff —
              it&apos;s better tools for the moments before and between visits
              where patients are on their own.
            </p>

            <div className="space-y-10">
              <div>
                <h3 className="text-xl font-semibold text-warm-900 mb-3">
                  Patients Can&apos;t Find You
                </h3>
                <p className="text-warm-600 leading-relaxed">
                  You offer the right programs, but patients searching for HIV
                  behavioral health in their area don&apos;t know you exist.
                  Your website lists your services. It doesn&apos;t help
                  someone in crisis at 2am who&apos;s searching for care near
                  them.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-warm-900 mb-3">
                  Intake Doesn&apos;t Capture Intent
                </h3>
                <p className="text-warm-600 leading-relaxed">
                  A patient calls or walks in and your front desk does their
                  best. But matching a new patient to the right program based on
                  a brief phone conversation means information gets lost. By the
                  time the clinician sees them, half the context is gone.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-warm-900 mb-3">
                  Outcomes Are Hard to See
                </h3>
                <p className="text-warm-600 leading-relaxed">
                  Your clinicians know which patients are doing well. But
                  aggregating engagement and outcomes data across a program —
                  the kind of visibility leadership needs to justify and expand
                  services — usually means pulling reports from a system that
                  wasn&apos;t designed for it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Layers */}
      <section className="py-20 bg-warm-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <h2 className="text-3xl font-bold text-warm-900 font-heading">
              Four Layers, Nothing Replaced
            </h2>
            <p className="mt-4 text-lg text-warm-600">
              Each layer adds a capability your clinic doesn&apos;t have today
              — without asking your staff to learn a new system or change
              their workflow. Adopt one or all four.
            </p>
          </div>

          <div className="max-w-5xl mx-auto space-y-8">
            {/* Layer 1: Find Care */}
            <Card>
              <CardContent className="p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="w-12 h-12 rounded-lg bg-primary-50 flex items-center justify-center shrink-0">
                    <Search
                      className="h-6 w-6 text-primary-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-warm-900 mb-1">
                      Find Care — Patient-Facing Search
                    </h3>
                    <p className="text-sm font-medium text-primary-700 mb-3">
                      Patients find your clinic before they ever call your front
                      desk.
                    </p>
                    <p className="text-sm text-warm-600 leading-relaxed mb-4">
                      A searchable directory integrated with federal provider
                      databases. Patients discover your clinic by location,
                      services, and the populations you serve. This adds a
                      patient acquisition channel that runs alongside your
                      existing referral network — it doesn&apos;t change how
                      referrals work.
                    </p>
                    <Link
                      href="/find-care"
                      className="text-sm font-medium text-primary-600 hover:text-primary-700 inline-flex items-center gap-1"
                    >
                      Try the live search
                      <ArrowRight
                        className="h-3.5 w-3.5"
                        aria-hidden="true"
                      />
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Layer 2: Intake */}
            <Card>
              <CardContent className="p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="w-12 h-12 rounded-lg bg-primary-50 flex items-center justify-center shrink-0">
                    <ClipboardList
                      className="h-6 w-6 text-primary-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-warm-900 mb-1">
                      Guided Intake — Capture Context Before the Visit
                    </h3>
                    <p className="text-sm font-medium text-primary-700 mb-3">
                      Patients are matched to the right program before they walk
                      in the door.
                    </p>
                    <p className="text-sm text-warm-600 leading-relaxed mb-4">
                      White-label intake tools branded as your clinic&apos;s
                      own. Patients complete a guided assessment online and get
                      connected to evidence-based programs that fit their needs.
                      Your front desk gets a patient who already has context
                      attached — without adding steps to their workflow.
                    </p>
                    <Link
                      href="/for-patients"
                      className="text-sm font-medium text-primary-600 hover:text-primary-700 inline-flex items-center gap-1"
                    >
                      See the patient experience
                      <ArrowRight
                        className="h-3.5 w-3.5"
                        aria-hidden="true"
                      />
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Layer 3: Program Matching */}
            <Card>
              <CardContent className="p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="w-12 h-12 rounded-lg bg-primary-50 flex items-center justify-center shrink-0">
                    <BookOpen
                      className="h-6 w-6 text-primary-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-warm-900 mb-1">
                      Program Matching — Evidence Behind Every Recommendation
                    </h3>
                    <p className="text-sm font-medium text-primary-700 mb-3">
                      Every patient gets a program chosen for people like them,
                      not a generic referral.
                    </p>
                    <p className="text-sm text-warm-600 leading-relaxed mb-4">
                      Drawing from the CDC&apos;s Compendium of Evidence-Based
                      Interventions, program matching connects patient
                      characteristics to programs with proven outcomes for their
                      population. This adds a layer of clinical decision support
                      to your existing referral and intake processes.
                    </p>
                    <a
                      href="https://compendium.kalamos.care"
                      className="text-sm font-medium text-primary-600 hover:text-primary-700 inline-flex items-center gap-1"
                    >
                      Explore the compendium
                      <ArrowRight
                        className="h-3.5 w-3.5"
                        aria-hidden="true"
                      />
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Layer 4: Outcomes */}
            <Card className="border-warm-200">
              <CardContent className="p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="w-12 h-12 rounded-lg bg-warm-100 flex items-center justify-center shrink-0">
                    <BarChart3
                      className="h-6 w-6 text-warm-500"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-warm-900 mb-1">
                      Outcomes Visibility — See How Programs Are Working
                    </h3>
                    <p className="text-sm font-medium text-warm-500 mb-3">
                      Coming soon
                    </p>
                    <p className="text-sm text-warm-600 leading-relaxed">
                      Aggregate engagement and clinical outcomes across your
                      programs. Give your leadership the data they need to
                      justify and expand services — without pulling manual
                      reports from an EHR that wasn&apos;t built for it.
                      Anonymous data write-back supports research without
                      compromising patient privacy.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Provider Directory Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-warm-900 font-heading">
                Patients Are Already Searching for Care Near Them
              </h2>
              <p className="mt-4 text-warm-600 leading-relaxed">
                Find Care adds your clinic to a directory patients are
                actually using. It works alongside your website, your referral
                network, and your community relationships — adding a channel,
                not replacing one.
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
                    Pulls from SAMHSA, NPI, and CDC provider databases
                  </span>
                </li>
                <li className="flex items-start gap-3 text-warm-700">
                  <CheckCircle
                    className="h-5 w-5 text-primary-600 shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span className="text-sm">
                    Highlights the programs and populations your clinic serves
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

      {/* Better Together */}
      <section className="py-20 bg-warm-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-warm-900 font-heading">
              Technology Works Better With People Behind It
            </h2>
            <p className="mt-4 text-lg text-warm-600">
              Our technology layers are available on their own — but they&apos;re
              designed to work hand-in-hand with{" "}
              <Link
                href="/services"
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Kalamos clinical services
              </Link>
              . When you combine embedded therapists with the tools that help
              patients find you and stay engaged, every piece reinforces the
              others.
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardContent className="p-6 pt-6">
                <p className="text-sm font-medium text-primary-700 mb-2">
                  Find Care + Guided Intake
                </p>
                <p className="text-sm text-warm-600">
                  Patients discover your clinic and arrive with context already
                  captured — your front desk gets a warm handoff instead of a
                  cold call.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6 pt-6">
                <p className="text-sm font-medium text-primary-700 mb-2">
                  Program Matching + Embedded Therapists
                </p>
                <p className="text-sm text-warm-600">
                  Patients are matched to the right evidence-based program and
                  connected to a therapist who&apos;s already part of your care
                  team.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6 pt-6">
                <p className="text-sm font-medium text-primary-700 mb-2">
                  Outcomes Visibility + Clinical Reviews
                </p>
                <p className="text-sm text-warm-600">
                  Aggregate data flows into regular program reviews with your
                  leadership — giving you the evidence to expand what&apos;s
                  working.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-3xl font-bold text-warm-900 font-heading">
              Built for Clinics That Serve Communities
            </h2>
            <p className="mt-4 text-lg text-warm-600">
              These tools are designed for organizations that already have
              clinical operations in place — and want to improve the patient
              experience without overhauling what&apos;s working.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {firmTypes.map((type) => (
              <span
                key={type}
                className="px-4 py-2 rounded-full bg-warm-50 border border-warm-200 text-sm font-medium text-warm-700 shadow-sm"
              >
                {type}
              </span>
            ))}
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
            Program matching draws from the CDC&apos;s Compendium of
            Evidence-Based Interventions — the same research base that informs
            our clinical services.
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
          <h2 className="text-2xl font-bold text-warm-900 font-heading">
            See What It Adds to Your Clinic
          </h2>
          <p className="mt-3 text-warm-600">
            Try the patient search, walk through the intake experience, or tell
            us about your clinic — we&apos;ll show you which layers make sense
            for where you are today.
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
