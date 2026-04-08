import type { TreatmentIntervention, PreventionPublication } from "./types";

export type ClinicalCategory = "treatment" | "prevention" | "systems";

export const CLINICAL_CATEGORIES = [
  "treatment",
  "prevention",
  "systems",
] as const;

export const CATEGORY_LABELS: Record<ClinicalCategory, string> = {
  treatment: "Treatment (PLWH)",
  prevention: "Prevention & PrEP",
  systems: "Systems & Structural",
};

// --- Treatment intervention classification ---

const PREP_EFFECTS = [
  "prep use",
  "prep adherence",
  "prep initiation",
  "prep uptake",
  "prep persistence",
  "prep prescription",
  "prep care",
  "prep medication",
  "prescribing prep",
];

const TREATMENT_EFFECTS = [
  "viral suppression",
  "viral load",
  "art adherence",
  "art initiation",
  "art uptake",
  "medication adherence",
  "retention in hiv care",
  "linkage to hiv care",
  "linkage to care",
  "engagement in hiv care",
  "re-engagement in hiv care",
  "cd4 count",
  "hiv treatment",
  "undetectable viral load",
];

function effectsMentionPrEP(effects: string[]): boolean {
  const joined = effects.join(" ").toLowerCase();
  return PREP_EFFECTS.some((term) => joined.includes(term));
}

function effectsMentionTreatment(effects: string[]): boolean {
  const joined = effects.join(" ").toLowerCase();
  return TREATMENT_EFFECTS.some((term) => joined.includes(term));
}

/**
 * Classify a treatment intervention into a clinical category.
 *
 * Logic:
 * 1. Efficacy rating containing "Pre-Exposure Prophylaxis" → prevention
 * 2. "Risk Reduction" → prevention (unless effects exclusively mention ART/viral)
 * 3. "Medication Adherence" → treatment by default, prevention if effects mention PrEP
 * 4. "Linking and Retention" → treatment
 * 5. "Structural" alone → systems
 * 6. Compound ratings with Structural: category from the non-structural component
 */
export function classifyIntervention(
  item: TreatmentIntervention
): ClinicalCategory {
  const rating = item.efficacyRating.toLowerCase();

  const hasPrEP = rating.includes("pre-exposure prophylaxis");
  const hasRiskReduction = rating.includes("risk reduction");
  const hasMedAdherence = rating.includes("medication adherence");
  const hasLinkingRetention = rating.includes("linking and retention");
  const hasStructural = rating.includes("structural");

  // Pure structural
  if (hasStructural && !hasPrEP && !hasRiskReduction && !hasMedAdherence && !hasLinkingRetention) {
    return "systems";
  }

  // PrEP rating is always prevention
  if (hasPrEP) {
    return "prevention";
  }

  // Risk reduction: prevention by default
  if (hasRiskReduction) {
    // If effects ONLY mention treatment outcomes (no risk reduction behaviors), classify as treatment
    if (effectsMentionTreatment(item.keyEffects) && !effectsMentionPrEP(item.keyEffects)) {
      // Check if effects are truly treatment-only (no condom/sex partner effects)
      const joined = item.keyEffects.join(" ").toLowerCase();
      const hasRiskBehavior =
        joined.includes("condom") ||
        joined.includes("sex partner") ||
        joined.includes("unprotected") ||
        joined.includes("sti") ||
        joined.includes("std") ||
        joined.includes("testing");
      if (!hasRiskBehavior) {
        return "treatment";
      }
    }
    return "prevention";
  }

  // Medication adherence: treatment unless effects mention PrEP
  if (hasMedAdherence) {
    if (effectsMentionPrEP(item.keyEffects)) {
      return "prevention";
    }
    return "treatment";
  }

  // Linking and retention → treatment
  if (hasLinkingRetention) {
    return "treatment";
  }

  // Fallback: check effects
  if (effectsMentionPrEP(item.keyEffects)) {
    return "prevention";
  }
  if (effectsMentionTreatment(item.keyEffects)) {
    return "treatment";
  }

  return "prevention";
}

// --- Prevention publication classification ---

const PREVENTION_OUTCOMES = [
  "pre-exposure prophylaxis",
  "prep",
  "hiv testing",
  "std testing",
  "sti testing",
  "hiv/std/sti testing",
  "sex behaviors",
  "condom use",
  "condomless sex",
  "hiv/std/sti incidence",
  "injection drug use",
];

const TREATMENT_OUTCOMES = [
  "viral load",
  "viral suppression",
  "retention in hiv care",
  "linkage to hiv care",
  "engagement in hiv care",
  "re-engagement in hiv care",
];

const SYSTEMS_OUTCOMES = [
  "social determinants",
  "stigma",
];

export function classifyPublication(
  item: PreventionPublication
): ClinicalCategory {
  const joined = item.keyOutcomes.join(" ").toLowerCase();

  // Check systems first (most specific)
  if (SYSTEMS_OUTCOMES.some((term) => joined.includes(term))) {
    return "systems";
  }

  // Check treatment
  if (TREATMENT_OUTCOMES.some((term) => joined.includes(term))) {
    // Could have both treatment and prevention outcomes
    if (PREVENTION_OUTCOMES.some((term) => joined.includes(term))) {
      return "prevention"; // Mixed → prevention (e.g., linkage + PrEP)
    }
    return "treatment";
  }

  // Check prevention
  if (PREVENTION_OUTCOMES.some((term) => joined.includes(term))) {
    return "prevention";
  }

  // "Not applicable" or unrecognized → prevention (default for prevention compendium)
  return "prevention";
}
