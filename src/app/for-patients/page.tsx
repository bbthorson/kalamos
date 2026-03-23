import type { Metadata } from "next";
import { Shield } from "lucide-react";
import { getTreatmentInterventions } from "@/lib/compendium";
import { PatientQuestionnaire } from "@/components/questionnaire/patient-questionnaire";

export const metadata: Metadata = {
  title: "For Patients",
  description:
    "Answer a few questions and find evidence-based HIV behavioral health interventions matched to your situation.",
};

export default function ForPatientsPage() {
  const treatments = getTreatmentInterventions();

  return (
    <>
      {/* Hero */}
      <section className="py-20 bg-shadow-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Find Support That Fits You
            </h1>
            <p className="mt-6 text-lg text-shadow-200 leading-relaxed">
              Answer a few questions and we&apos;ll match you with
              evidence-based programs designed for people like you.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 text-sm text-shadow-300">
              <Shield className="h-4 w-4" aria-hidden="true" />
              Your answers are private — they stay in your browser and are never
              sent to a server.
            </div>
          </div>
        </div>
      </section>

      {/* Questionnaire */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PatientQuestionnaire treatments={treatments} />
        </div>
      </section>
    </>
  );
}
