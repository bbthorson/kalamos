"use client";

import type { QuestionOption } from "@/types/questionnaire";

export function OptionGroup({
  options,
  value,
  onChange,
}: {
  options: QuestionOption[];
  value: string | undefined;
  onChange: (value: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="radiogroup">
      {options.map((option) => {
        const selected = value === option.value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(option.value)}
            className={`rounded-xl border-2 p-4 text-left transition-all ${
              selected
                ? "border-primary-500 bg-primary-50 ring-1 ring-primary-500"
                : "border-warm-200 bg-white hover:border-warm-300"
            }`}
          >
            <span className={`text-sm font-medium ${selected ? "text-primary-700" : "text-warm-900"}`}>
              {option.label}
            </span>
            {option.description && (
              <span className={`block text-xs mt-1 ${selected ? "text-primary-600" : "text-warm-500"}`}>
                {option.description}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
