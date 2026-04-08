"use client";

import { Check } from "lucide-react";
import type { QuestionOption } from "@/types/questionnaire";

export function MultiSelectGroup({
  options,
  values,
  onChange,
}: {
  options: QuestionOption[];
  values: string[];
  onChange: (values: string[]) => void;
}) {
  function toggle(value: string) {
    if (values.includes(value)) {
      onChange(values.filter((v) => v !== value));
    } else {
      onChange([...values, value]);
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="group">
      {options.map((option) => {
        const selected = values.includes(option.value);
        return (
          <button
            key={option.value}
            type="button"
            role="checkbox"
            aria-checked={selected}
            onClick={() => toggle(option.value)}
            className={`rounded-xl border-2 p-4 text-left transition-all ${
              selected
                ? "border-primary-500 bg-primary-50 ring-1 ring-primary-500"
                : "border-warm-200 bg-white hover:border-warm-300"
            }`}
          >
            <span className="flex items-center gap-2">
              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors ${
                  selected
                    ? "border-primary-500 bg-primary-500 text-white"
                    : "border-warm-300"
                }`}
              >
                {selected && <Check className="h-3 w-3" />}
              </span>
              <span className={`text-sm font-medium ${selected ? "text-primary-700" : "text-warm-900"}`}>
                {option.label}
              </span>
            </span>
            {option.description && (
              <span className={`block text-xs mt-1 pl-7 ${selected ? "text-primary-600" : "text-warm-500"}`}>
                {option.description}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
