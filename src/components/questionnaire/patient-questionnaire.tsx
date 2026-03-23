"use client";

import { useState, useMemo } from "react";
import type { QuestionnaireAnswers } from "@/types/questionnaire";
import type { TreatmentIntervention } from "@/types/compendium";
import { getSteps, createEmptyAnswers } from "@/lib/questionnaire/questions";
import { matchInterventions } from "@/lib/questionnaire/mappings";
import { ProgressBar } from "./progress-bar";
import { QuestionStep } from "./question-step";
import { QuestionnaireResults } from "./questionnaire-results";

export function PatientQuestionnaire({
  treatments,
}: {
  treatments: TreatmentIntervention[];
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<QuestionnaireAnswers>(
    createEmptyAnswers()
  );
  const [showResults, setShowResults] = useState(false);

  const steps = useMemo(() => getSteps(answers), [answers]);

  const results = useMemo(() => {
    if (!showResults) return [];
    return matchInterventions(answers, treatments);
  }, [showResults, answers, treatments]);

  function handleUpdate(field: keyof QuestionnaireAnswers, value: unknown) {
    setAnswers((prev) => {
      const next = { ...prev, [field]: value };

      // Clear conditional fields when HIV status changes
      if (field === "hivStatus") {
        if (value !== "positive") {
          next.treatmentStatus = undefined;
        }
        if (value !== "negative") {
          next.prepStatus = undefined;
        }
      }

      return next;
    });
  }

  function handleNext() {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResults(true);
    }
  }

  function handleBack() {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  }

  function handleStartOver() {
    setAnswers(createEmptyAnswers());
    setCurrentStep(0);
    setShowResults(false);
  }

  return (
    <div className="max-w-2xl mx-auto">
      {!showResults ? (
        <>
          <ProgressBar currentStep={currentStep} totalSteps={steps.length} />
          <div className="mt-8">
            <QuestionStep
              step={steps[currentStep]}
              answers={answers}
              onUpdate={handleUpdate}
              onNext={handleNext}
              onBack={handleBack}
              isFirst={currentStep === 0}
              isLast={currentStep === steps.length - 1}
            />
          </div>
        </>
      ) : (
        <QuestionnaireResults
          results={results}
          onStartOver={handleStartOver}
        />
      )}
    </div>
  );
}
