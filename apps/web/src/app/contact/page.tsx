import type { Metadata } from "next";
import { ContactForm } from "./contact-form";
import { Badge } from "@/components/ui/badge";
import { MapPin, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Kalamos Care. We'd love to hear from clinics, therapists, and anyone interested in integrated behavioral health for HIV care.",
};

const supportedStates = ["California", "New Jersey", "New York"];

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-warm-900 mb-4">
          Contact Us
        </h1>
        <p className="text-lg text-warm-600 mb-10">
          Whether you&apos;re a clinic, a therapist, or just curious — we&apos;d
          love to hear from you.
        </p>

        {/* Contact form */}
        <ContactForm />

        {/* States */}
        <div className="mt-12 pt-8 border-t border-warm-200">
          <h2 className="text-lg font-semibold text-warm-900 mb-4 flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary-600" aria-hidden="true" />
            States We Currently Support
          </h2>
          <div className="flex flex-wrap gap-2">
            {supportedStates.map((state) => (
              <Badge key={state} variant="primary">
                {state}
              </Badge>
            ))}
          </div>
        </div>

        {/* Email */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-warm-900 mb-2 flex items-center gap-2">
            <Mail className="h-5 w-5 text-primary-600" aria-hidden="true" />
            Email Us Directly
          </h2>
          <a
            href="mailto:contact@kalamos.care"
            className="text-primary-600 hover:text-primary-700 underline"
          >
            contact@kalamos.care
          </a>
        </div>
      </div>
    </div>
  );
}
