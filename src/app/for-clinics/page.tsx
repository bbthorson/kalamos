import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Clock, Shield, DollarSign, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "For Clinics",
  description:
    "Supercharge your mental health services with integrated behavioral health from Kalamos. No hiring, no training, no scheduling.",
};

export default function ForClinicsPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 bg-shadow-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Supercharge Your Mental Health Services
            </h1>
            <p className="mt-6 text-lg text-shadow-200 leading-relaxed">
              Integrated behavioral health from Kalamos — improve patient
              outcomes, expand your services, and do it all without the
              operational overhead.
            </p>
            <div className="mt-8">
              <Link href="/contact">
                <Button size="lg" className="bg-primary-500 hover:bg-primary-600 text-white">
                  Learn How
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
                  Smaller practices need to bill at least 20 sessions just to cover
                  the credentialing costs for a single insurance plan. That makes
                  building a robust behavioral health offering financially
                  unfeasible for many organizations — even when patients
                  desperately need it.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-warm-900 mb-3">
                  Artificially Limiting Access
                </h3>
                <p className="text-warm-600 leading-relaxed">
                  When insurance coverage falls short, behavioral health becomes
                  inaccessible for the patients who need it most. Issues go
                  unaddressed longer, outcomes suffer, and therapists can&apos;t
                  reach the diverse populations they want to serve — particularly
                  those facing financial barriers.
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
              Integrated Behavioral Health (BHI) lets your therapists&apos; care
              be covered through existing insurance — no additional credentialing
              required.
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-warm-300 bg-warm-100">
              <CardContent className="p-6 pt-6">
                <h3 className="text-lg font-semibold text-warm-500 mb-4">Without BHI</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-warm-500">
                    <Clock className="h-5 w-5 shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-sm">3-4 month wait times</span>
                  </li>
                  <li className="flex items-start gap-3 text-warm-500">
                    <Shield className="h-5 w-5 shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-sm">Black box outcomes</span>
                  </li>
                  <li className="flex items-start gap-3 text-warm-500">
                    <DollarSign className="h-5 w-5 shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-sm">Prohibitively expensive</span>
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
                    <span className="text-sm">Next-day appointments</span>
                  </li>
                  <li className="flex items-start gap-3 text-primary-700">
                    <CheckCircle className="h-5 w-5 shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-sm">Integrated with physical care</span>
                  </li>
                  <li className="flex items-start gap-3 text-primary-700">
                    <CheckCircle className="h-5 w-5 shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-sm">Covered by insurance</span>
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
                <h3 className="text-xl font-semibold text-warm-900 mb-3">
                  Flexible Staffing
                </h3>
                <p className="text-warm-600 leading-relaxed">
                  Skip the cost and complexity of recruiting, hiring, and
                  onboarding. Partner with Kalamos&apos;s on-demand therapist
                  network and scale your behavioral health services as your
                  patients need them.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-warm-900 mb-3">
                  Accessibility
                </h3>
                <p className="text-warm-600 leading-relaxed">
                  BHI removes the cost barrier for therapy, enabling diverse
                  patient populations to access care affordably. We prioritize
                  inclusive mental healthcare so every patient feels seen and
                  supported.
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
            Learn how Integrated Behavioral Health can transform your practice
          </h2>
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
