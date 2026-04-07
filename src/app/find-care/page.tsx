import type { Metadata } from "next";
import { ProviderSearch } from "@/components/find-care/provider-search";
import { Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Find Care",
  description:
    "Search for healthcare providers and treatment facilities near you. Powered by SAMHSA FindTreatment.gov and the NPI Registry.",
};

export default function FindCarePage() {
  return (
    <>
      {/* Hero */}
      <section className="py-16 bg-shadow-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Find Healthcare Services Near You
            </h1>
            <p className="mt-4 text-lg text-shadow-200 leading-relaxed">
              Search treatment facilities and healthcare providers using
              data from SAMHSA and the National Provider Registry.
            </p>
            <div className="mt-4 flex items-center gap-2 text-shadow-300 text-sm">
              <Shield className="h-4 w-4" aria-hidden="true" />
              <span>
                Your search is private — we don&apos;t store your location
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Search */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProviderSearch />
        </div>
      </section>
    </>
  );
}
