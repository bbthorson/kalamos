import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  Users,
  Shield,
  CheckCircle,
  Clock,
  FileCheck,
  MonitorSmartphone,
  Handshake,
  CalendarClock,
  ClipboardCheck,
  Layers,
  ChevronRight,
} from "lucide-react";
import { getCompendiumMetadata } from "@kalamos/compendium-data";
import { getPopulationThemes } from "@kalamos/compendium-data";
import { EngagementProgramCard } from "@/components/services/engagement-program-card";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Kalamos embeds behavioral health into your clinic's workflows — credentialing, EHR integration, program design, and dedicated therapists. Built around how your team actually works.",
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

  return (
    <>
      {/* Hero */}
      <section className="py-20 bg-shadow-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight font-heading">
              Behavioral Health That Works the Way Your Clinic Already Does
            </h1>
            <p className="mt-6 text-lg text-shadow-200 leading-relaxed">
              Adding a new service line is hard — not because of the clinical
              work, but because of everything around it. Credentialing, EHR
              access, scheduling, payer enrollment, care coordination. We know
              because that&apos;s all we do. Kalamos embeds therapists into your
              existing workflows so your team doesn&apos;t have to change how
              they operate.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a href="#partnership">
                <Button
                  size="lg"
                  className="bg-primary-500 hover:bg-primary-600 text-white"
                >
                  What the Partnership Looks Like
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </a>
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

      {/* The Real Barriers */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-warm-900 mb-4 text-center font-heading">
              You&apos;ve Thought About This Before
            </h2>
            <p className="text-center text-warm-600 mb-12 max-w-2xl mx-auto">
              Most clinics we talk to have already tried to expand behavioral
              health — or decided it was too complicated to attempt. The
              barriers are real, and they&apos;re rarely about finding the
              right therapist.
            </p>

            <div className="space-y-10">
              <div>
                <h3 className="text-xl font-semibold text-warm-900 mb-3">
                  Integration Is the Hard Part
                </h3>
                <p className="text-warm-600 leading-relaxed">
                  Finding a therapist is the easy step. Getting them credentialed
                  with your payers, enrolled under your NPI, documenting in your
                  EHR, and scheduling within your workflows — that&apos;s where
                  it falls apart. Every clinic&apos;s setup is different, and
                  generic solutions create more problems than they solve.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-warm-900 mb-3">
                  External Referrals Create Gaps
                </h3>
                <p className="text-warm-600 leading-relaxed">
                  When you refer patients out, you lose visibility. No shared
                  documentation, no coordinated care plans, no encounter data
                  flowing back into your system. Your clinicians can&apos;t see
                  what&apos;s happening, your billers can&apos;t capture the
                  activity, and your patients experience two disconnected care
                  settings.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-warm-900 mb-3">
                  The Overhead Isn&apos;t Worth It for One Hire
                </h3>
                <p className="text-warm-600 leading-relaxed">
                  Even if you find the budget for a behavioral health position,
                  the operational cost of onboarding a single provider —
                  credentialing, supervision, training on your specific
                  population&apos;s needs — rarely justifies the investment
                  at small scale. You need a partner who has already solved
                  these problems across multiple clinics, not a new FTE.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What the Partnership Looks Like */}
      <section id="partnership" className="py-20 bg-warm-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <h2 className="text-3xl font-bold text-warm-900 font-heading">
              What a Kalamos Partnership Looks Like
            </h2>
            <p className="mt-4 text-lg text-warm-600">
              We don&apos;t hand you a therapist and wish you luck. We work
              through the operational details with your team — because the
              details are where integrations succeed or fail.
            </p>
          </div>

          {/* Phase 1: Discovery */}
          <div className="max-w-4xl mx-auto space-y-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-600 text-white text-sm font-bold">
                  1
                </span>
                <h3 className="text-xl font-semibold text-warm-900 font-heading">
                  We Learn How Your Clinic Works
                </h3>
              </div>
              <p className="text-warm-600 leading-relaxed mb-6 ml-11">
                Before we propose anything, we need to understand your
                environment. Which EHR are you on? How does your front desk
                handle scheduling? What does your referral pathway look like
                today? Who are the clinical leaders we&apos;ll be working with?
                What does your patient panel actually need?
              </p>
              <div className="ml-11 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Handshake
                    className="h-5 w-5 text-primary-600 mt-0.5 shrink-0"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-sm font-medium text-warm-800">
                      Clinical leadership alignment
                    </p>
                    <p className="text-sm text-warm-500">
                      We meet with your medical director and care team leads to
                      understand priorities
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MonitorSmartphone
                    className="h-5 w-5 text-primary-600 mt-0.5 shrink-0"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-sm font-medium text-warm-800">
                      Technical walkthrough
                    </p>
                    <p className="text-sm text-warm-500">
                      EHR configuration, documentation standards, and billing
                      workflows
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users
                    className="h-5 w-5 text-primary-600 mt-0.5 shrink-0"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-sm font-medium text-warm-800">
                      Population assessment
                    </p>
                    <p className="text-sm text-warm-500">
                      Who are your patients, what are their needs, and which
                      programs fit
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <ClipboardCheck
                    className="h-5 w-5 text-primary-600 mt-0.5 shrink-0"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-sm font-medium text-warm-800">
                      Program design
                    </p>
                    <p className="text-sm text-warm-500">
                      We recommend evidence-based programs matched to your panel
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Phase 2: Setup */}
            <div className="border-t border-warm-200 pt-12">
              <div className="flex items-center gap-3 mb-6">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-600 text-white text-sm font-bold">
                  2
                </span>
                <h3 className="text-xl font-semibold text-warm-900 font-heading">
                  We Handle the Operational Setup
                </h3>
              </div>
              <p className="text-warm-600 leading-relaxed mb-6 ml-11">
                This is the part that usually stops clinics. We take it on
                because we&apos;ve done it before and we know what goes wrong.
              </p>
              <div className="ml-11 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <FileCheck
                    className="h-5 w-5 text-primary-600 mt-0.5 shrink-0"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-sm font-medium text-warm-800">
                      Credentialing &amp; enrollment
                    </p>
                    <p className="text-sm text-warm-500">
                      Our therapists get credentialed with your payers and
                      enrolled under your NPI
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MonitorSmartphone
                    className="h-5 w-5 text-primary-600 mt-0.5 shrink-0"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-sm font-medium text-warm-800">
                      EHR integration
                    </p>
                    <p className="text-sm text-warm-500">
                      Therapists document directly in your system — encounters,
                      notes, billing codes
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CalendarClock
                    className="h-5 w-5 text-primary-600 mt-0.5 shrink-0"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-sm font-medium text-warm-800">
                      Scheduling setup
                    </p>
                    <p className="text-sm text-warm-500">
                      Therapist availability configured within your existing
                      scheduling system
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield
                    className="h-5 w-5 text-primary-600 mt-0.5 shrink-0"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-sm font-medium text-warm-800">
                      Compliance &amp; documentation
                    </p>
                    <p className="text-sm text-warm-500">
                      We align with your documentation standards and audit
                      requirements
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Phase 3: Ongoing */}
            <div className="border-t border-warm-200 pt-12">
              <div className="flex items-center gap-3 mb-6">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-600 text-white text-sm font-bold">
                  3
                </span>
                <h3 className="text-xl font-semibold text-warm-900 font-heading">
                  We Stay Involved After Launch
                </h3>
              </div>
              <p className="text-warm-600 leading-relaxed mb-6 ml-11">
                Embedding a service isn&apos;t a one-time event. Patient needs
                shift, your panel changes, programs need adjustment. We build
                ongoing collaboration into the partnership because that&apos;s
                how you avoid the slow drift that turns a good integration into
                a forgotten one.
              </p>
              <div className="ml-11 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Handshake
                    className="h-5 w-5 text-primary-600 mt-0.5 shrink-0"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-sm font-medium text-warm-800">
                      Regular program reviews
                    </p>
                    <p className="text-sm text-warm-500">
                      Recurring meetings with your clinical leads to review
                      utilization and outcomes
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Layers
                    className="h-5 w-5 text-primary-600 mt-0.5 shrink-0"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-sm font-medium text-warm-800">
                      Program evolution
                    </p>
                    <p className="text-sm text-warm-500">
                      Adjust the intervention mix as your patient population
                      changes
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users
                    className="h-5 w-5 text-primary-600 mt-0.5 shrink-0"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-sm font-medium text-warm-800">
                      Care team coordination
                    </p>
                    <p className="text-sm text-warm-500">
                      Therapists participate in huddles, case conferences, and
                      team meetings
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Layers
                    className="h-5 w-5 text-primary-600 mt-0.5 shrink-0"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-sm font-medium text-warm-800">
                      Service expansion
                    </p>
                    <p className="text-sm text-warm-500">
                      The same model extends to nutrition, CHW programs, care
                      management — as your needs grow
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Changes for Your Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-warm-900 font-heading">
              What Your Team Actually Experiences
            </h2>
            <p className="mt-4 text-lg text-warm-600">
              We succeed when your staff barely notices the transition —
              because the new service fits into the workflows they already know.
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
                  Your Clinicians
                </h3>
                <p className="text-sm text-warm-600">
                  Refer to an embedded therapist the same way you refer
                  internally. See their notes in your EHR. Coordinate in your
                  existing huddles. No new system to learn.
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
                  Your Administrators
                </h3>
                <p className="text-sm text-warm-600">
                  No new hires to credential, no scheduling to manage, no
                  additional supervision to arrange. Encounters appear in your
                  billing system like any other provider&apos;s.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6 pt-6">
                <div className="mx-auto w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center mb-4">
                  <CheckCircle
                    className="h-6 w-6 text-primary-600"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-lg font-semibold text-warm-900 mb-2">
                  Your Leadership
                </h3>
                <p className="text-sm text-warm-600">
                  Regular reporting on engagement, outcomes, and program
                  utilization. Direct input into program design. A partner who
                  adjusts with you, not a contract you manage around.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Program Catalog */}
      <section id="programs" className="py-20 bg-warm-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-warm-900 font-heading">
              Programs Matched to Your Population
            </h2>
            <p className="mt-4 text-lg text-warm-600">
              Every program draws from the CDC&apos;s Compendium of
              Evidence-Based Interventions. We don&apos;t deliver a standard
              curriculum — we design the program around who your patients
              actually are, then train the therapist to deliver it as part of
              your care team.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {themes.map((theme) => (
              <EngagementProgramCard key={theme.id} theme={theme} />
            ))}
          </div>
        </div>
      </section>

      {/* Built For */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-3xl font-bold text-warm-900 font-heading">
              Built for Clinics That Serve Communities
            </h2>
            <p className="mt-4 text-lg text-warm-600">
              We work with organizations that are already doing the hardest
              work in HIV care — and looking for a partner who understands
              what that takes operationally.
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

      {/* CTA */}
      <section className="py-16 bg-primary-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-warm-900 font-heading">
            Let&apos;s Start With a Conversation
          </h2>
          <p className="mt-3 text-warm-600">
            Tell us about your clinic, your patients, and how your team works
            today. We&apos;ll tell you honestly whether we&apos;re a good fit
            — and if we are, what the first steps look like.
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
                Explore Our Evidence Base
              </Button>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
