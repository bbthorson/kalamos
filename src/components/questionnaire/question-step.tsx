"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { StepDef, QuestionnaireAnswers } from "@/types/questionnaire";
import { OptionGroup } from "./option-group";
import { MultiSelectGroup } from "./multi-select-group";

export function QuestionStep({
  step,
  answers,
  onUpdate,
  onNext,
  onBack,
  isFirst,
  isLast,
}: {
  step: StepDef;
  answers: QuestionnaireAnswers;
  onUpdate: (field: keyof QuestionnaireAnswers, value: unknown) => void;
  onNext: () => void;
  onBack: () => void;
  isFirst: boolean;
  isLast: boolean;
}) {
  const canProceed = step.questions.every((q) => {
    if (q.optional) return true;
    const val = answers[q.field];
    if (Array.isArray(val)) return true; // multi-select is always ok
    return val !== undefined;
  });

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-warm-900">{step.title}</h2>
        {step.description && (
          <p className="mt-2 text-warm-600">{step.description}</p>
        )}
      </div>

      {step.questions.map((question) => {
        // For conditional questions (e.g., treatment status only shows if HIV+)
        if (question.id === "treatment-status" && answers.hivStatus !== "positive") {
          return null;
        }
        if (question.id === "prep-status" && answers.hivStatus !== "negative") {
          return null;
        }

        return (
          <div key={question.id} className="space-y-3">
            <h3 className="text-lg font-medium text-warm-800">
              {question.title}
            </h3>
            {question.description && (
              <p className="text-sm text-warm-500">{question.description}</p>
            )}

            {question.type === "single" ? (
              <OptionGroup
                options={question.options}
                value={answers[question.field] as string | undefined}
                onChange={(val) => onUpdate(question.field, val)}
              />
            ) : (
              <MultiSelectGroup
                options={question.options}
                values={(answers[question.field] as string[]) ?? []}
                onChange={(vals) => onUpdate(question.field, vals)}
              />
            )}
          </div>
        );
      })}

      <div className="flex justify-between pt-4">
        {!isFirst ? (
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back
          </Button>
        ) : (
          <div />
        )}
        <Button
          variant="primary"
          onClick={onNext}
          disabled={!canProceed}
        >
          {isLast ? "See My Results" : "Next"}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}
