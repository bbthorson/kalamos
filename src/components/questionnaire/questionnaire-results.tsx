"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { InterventionCard } from "@/components/compendium/intervention-card";
import { RotateCcw, Search, ChevronDown } from "lucide-react";
import type { ScoredIntervention } from "@/types/questionnaire";

export function QuestionnaireResults({
  results,
  onStartOver,
}: {
  results: ScoredIntervention[];
  onStartOver: () => void;
}) {
  const [showRelated, setShowRelated] = useState(false);

  const strong = results.filter((r) => r.score >= 4);
  const good = results.filter((r) => r.score >= 2 && r.score < 4);
  const related = results.filter((r) => r.score === 1);

  const hasResults = results.length > 0;

  return (
    <div className="space-y-10">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-warm-900">
          {hasResults ? "Your Matched Interventions" : "No Exact Matches Found"}
        </h2>
        <p className="mt-2 text-warm-600">
          {hasResults
            ? `We found ${results.length} evidence-based interventions that may be relevant to you.`
            : "We couldn\u2019t find interventions matching your exact profile. Try broadening your goals or explore the full compendium."}
        </p>
      </div>

      {strong.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-lg font-semibold text-warm-900">
              Designed for People Like You
            </h3>
            <Badge variant="primary">{strong.length}</Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {strong.map((r) => (
              <InterventionCard
                key={r.intervention.id}
                intervention={r.intervention}
              />
            ))}
          </div>
        </section>
      )}

      {good.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-lg font-semibold text-warm-900">
              May Also Be Helpful
            </h3>
            <Badge variant="outline">{good.length}</Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {good.map((r) => (
              <InterventionCard
                key={r.intervention.id}
                intervention={r.intervention}
              />
            ))}
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section>
          <button
            onClick={() => setShowRelated(!showRelated)}
            className="flex items-center gap-2 text-warm-600 hover:text-warm-900 transition-colors"
          >
            <h3 className="text-lg font-semibold">
              Related ({related.length})
            </h3>
            <ChevronDown
              className={`h-4 w-4 transition-transform ${showRelated ? "rotate-180" : ""}`}
            />
          </button>
          {showRelated && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {related.map((r) => (
                <InterventionCard
                  key={r.intervention.id}
                  intervention={r.intervention}
                />
              ))}
            </div>
          )}
        </section>
      )}

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 border-t border-warm-200">
        <Button variant="outline" onClick={onStartOver}>
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Start Over
        </Button>
        <Link href="/compendium">
          <Button variant="primary">
            <Search className="h-4 w-4" aria-hidden="true" />
            Explore Full Compendium
          </Button>
        </Link>
      </div>
    </div>
  );
}
