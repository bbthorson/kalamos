import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Users, GraduationCap, BarChart3 } from "lucide-react";

export default function HomePage() {
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
              Improve medication adherence with culturally competent behavioral
              health interventions. With the right support, we can end the HIV
              epidemic together.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link href="/for-clinics">
                <Button size="lg" className="bg-primary-500 hover:bg-primary-600 text-white">
                  For Clinics
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </Link>
              <Link href="/for-therapists">
                <Button size="lg" variant="outline" className="border-shadow-300 text-white hover:bg-shadow-800 hover:text-white">
                  For Therapists
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* The problem */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-warm-900">
              Making a Measurable Difference
            </h2>
            <p className="mt-6 text-lg text-warm-600 leading-relaxed">
              Today, 50% of patients struggle with daily medication adherence.
              Non-adherence doesn&apos;t just affect individuals — it impacts
              families, partners, and communities. With targeted behavioral health
              interventions, daily medication adherence can be improved by{" "}
              <strong className="text-primary-700">68%</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="py-20 bg-warm-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-warm-900">
              What We Do
            </h2>
            <p className="mt-6 text-lg text-warm-600 leading-relaxed">
              We staff, train, and deploy mental health professionals who deliver
              CDC-approved, evidence-based interventions directly to your patients
              on ART or PrEP. You focus on care — we handle the rest.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="text-center border-0 shadow-md">
              <CardContent className="p-8 pt-8">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary-50 flex items-center justify-center">
                  <Users className="h-7 w-7 text-primary-600" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-warm-900 mb-2">
                  No Hiring
                </h3>
                <p className="text-sm text-warm-600">
                  We bring our own network of trained, culturally competent
                  therapists — no recruiting or onboarding on your end.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-md">
              <CardContent className="p-8 pt-8">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary-50 flex items-center justify-center">
                  <GraduationCap className="h-7 w-7 text-primary-600" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-warm-900 mb-2">
                  No Training
                </h3>
                <p className="text-sm text-warm-600">
                  Our therapists are already trained on CDC-approved interventions
                  and ready to deliver evidence-based care from day one.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-md">
              <CardContent className="p-8 pt-8">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary-50 flex items-center justify-center">
                  <BarChart3 className="h-7 w-7 text-primary-600" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-warm-900 mb-2">
                  No Scheduling
                </h3>
                <p className="text-sm text-warm-600">
                  We manage scheduling and coordination so your staff can focus
                  on what they do best — delivering great care.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Financially sustainable */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-warm-900">
              Financially Sustainable
            </h2>
            <p className="mt-6 text-lg text-warm-600 leading-relaxed">
              We translate research-backed interventions into reimbursable
              services. By training therapists across the country to deliver
              these interventions in their own practices, we ensure that
              behavioral healthcare remains affordable and accessible.
            </p>
            <p className="mt-4 text-lg font-medium text-primary-700">
              With Kalamos, every patient can receive affordable, effective
              behavioral healthcare.
            </p>
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
            Whether you&apos;re a clinic looking to integrate behavioral health
            or a therapist ready to make an impact — we&apos;d love to connect.
          </p>
          <div className="mt-8">
            <Link href="/contact">
              <Button size="lg" className="bg-primary-500 hover:bg-primary-600 text-white">
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
