import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Heart, BarChart3, CheckCircle, DollarSign, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "For Therapists",
  description:
    "Grow your therapy practice with Kalamos. Treat the populations you care about, see the impact of your work, and get paid through insurance.",
};

export default function ForTherapistsPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 bg-shadow-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Grow Your Therapy Practice
            </h1>
            <p className="mt-6 text-lg text-shadow-200 leading-relaxed">
              Make a measurable impact on the patient populations you care about —
              without the financial barriers that hold most therapists back.
            </p>
            <div className="mt-8">
              <Link href="/contact">
                <Button size="lg" className="bg-primary-500 hover:bg-primary-600 text-white">
                  Join Our Network
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
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-warm-900 mb-12 text-center">
              It Doesn&apos;t Have to Be This Way
            </h2>

            <div className="space-y-10">
              <div>
                <h3 className="text-xl font-semibold text-warm-900 mb-3">
                  Insurance Contracting Is Too Expensive
                </h3>
                <p className="text-warm-600 leading-relaxed">
                  Most therapists find insurance contracts financially
                  impractical, which means marketing ends up prioritizing
                  higher-paying patients over those you could help the most. By
                  partnering with primary care physicians and leveraging new
                  billing codes, Kalamos changes the equation entirely.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-warm-900 mb-3">
                  Artificially Limiting Access
                </h3>
                <p className="text-warm-600 leading-relaxed">
                  Patients with non-normative sexual or gender orientations
                  experience double the mental health challenges — yet financial
                  barriers keep many from getting support. Kalamos ensures
                  affordable, inclusive services so everyone gets the care they
                  deserve, regardless of orientation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Kalamos difference */}
      <section className="py-20 bg-warm-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-warm-900">
              The Kalamos Difference
            </h2>
            <p className="mt-4 text-lg text-warm-600">
              Integrated Behavioral Health (BHI) coverage without expensive
              credentialing costs.
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-warm-300 bg-warm-100">
              <CardContent className="p-6 pt-6">
                <h3 className="text-lg font-semibold text-warm-500 mb-4">Without BHI</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-warm-500">
                    <DollarSign className="h-5 w-5 shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-sm">Prohibitively expensive contracting</span>
                  </li>
                  <li className="flex items-start gap-3 text-warm-500">
                    <Users className="h-5 w-5 shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-sm">Isolated from primary care</span>
                  </li>
                  <li className="flex items-start gap-3 text-warm-500">
                    <BarChart3 className="h-5 w-5 shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-sm">Billable time oriented</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-primary-200 bg-primary-50">
              <CardContent className="p-6 pt-6">
                <h3 className="text-lg font-semibold text-primary-700 mb-4">With Kalamos</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-primary-700">
                    <CheckCircle className="h-5 w-5 shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-sm">Covered by insurance</span>
                  </li>
                  <li className="flex items-start gap-3 text-primary-700">
                    <CheckCircle className="h-5 w-5 shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-sm">Whole person care</span>
                  </li>
                  <li className="flex items-start gap-3 text-primary-700">
                    <CheckCircle className="h-5 w-5 shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-sm">Outcomes oriented</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-warm-900 mb-12 text-center">
              A Better Way Forward
            </h2>

            <div className="space-y-10">
              <div>
                <h3 className="text-xl font-semibold text-warm-900 mb-3 flex items-center gap-2">
                  <Heart className="h-5 w-5 text-primary-600" aria-hidden="true" />
                  Treat Populations You Care About
                </h3>
                <p className="text-warm-600 leading-relaxed">
                  Focus on the patients you became a therapist to help — without
                  worrying about whether they can pay. Kalamos prioritizes
                  diversity and well-being so you can deliver care that reflects
                  your values.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-warm-900 mb-3 flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary-600" aria-hidden="true" />
                  See the Impact of Your Work
                </h3>
                <p className="text-warm-600 leading-relaxed">
                  Every referral comes with specific physical and mental health
                  goals, so you can see measurable outcomes from your work. And
                  the patient-provider relationships you build often extend well
                  beyond the initial intervention.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-warm-900">
            Ready to make a measurable difference?
          </h2>
          <p className="mt-3 text-warm-600">
            Join our growing network of therapists delivering evidence-based
            care to the communities that need it most.
          </p>
          <div className="mt-6">
            <Link href="/contact">
              <Button size="lg">
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
