import type {
  QuestionnaireAnswers,
  ScoredIntervention,
} from "@/types/questionnaire";
import type { TreatmentIntervention } from "@/types/compendium";

// --- Population keyword maps ---

const AGE_KEYWORDS: Record<string, string[]> = {
  "under-18": ["adolescent", "youth", "young", "13-", "14-", "15-", "16-", "17-"],
  "18-24": ["young adult", "youth", "16-24", "15-24", "18-29", "18 to 29", "aged 18"],
  "25-49": ["adult"],
  "50-plus": ["older adult", "aged ≥50", "50 years", "aging"],
};

const ORIENTATION_KEYWORDS: Record<string, string[]> = {
  msm: [
    "men who have sex with men",
    "MSM",
    "gay",
    "bisexual",
    "YMSM",
    "BMSM",
    "GBMSM",
  ],
  heterosexual: ["heterosexual", "women", "couples"],
  other: [],
};

const RACE_KEYWORDS: Record<string, string[]> = {
  black: ["Black", "African American"],
  hispanic: ["Hispanic", "Latino", "Latina"],
  asian: ["Asian", "Pacific Islander", "Native Hawaiian"],
  white: [],
  other: [],
};

const HIV_STATUS_KEYWORDS: Record<string, string[]> = {
  positive: [
    "HIV-positive",
    "HIV positive",
    "People with HIV",
    "PWH",
    "living with HIV",
    "Persons with HIV",
    "PLWH",
  ],
  negative: ["HIV-negative", "HIV negative", "seronegative"],
  unknown: [],
};

const TREATMENT_STATUS_KEYWORDS: Record<string, string[]> = {
  "recently-diagnosed": [
    "newly diagnosed",
    "recently diagnosed",
    "new HIV diagnosis",
    "new diagnosis",
  ],
  "on-art": [
    "ART",
    "antiretroviral",
    "in care",
    "on antiretroviral",
    "treatment-experienced",
  ],
  "not-in-care": [
    "out of care",
    "out-of-care",
    "not in care",
    "lost to care",
    "dropped out",
    "re-engagement",
  ],
  "adherence-issues": [
    "adherence",
    "non-adherent",
    "non-suppressed",
    "unsuppressed",
    "not virally suppressed",
    "suboptimal",
  ],
};

const PREP_STATUS_KEYWORDS: Record<string, string[]> = {
  "on-prep": ["PrEP", "pre-exposure"],
  "interested-in-prep": ["PrEP", "pre-exposure", "at risk", "high-risk"],
  neither: [],
};

const CIRCUMSTANCE_KEYWORDS: Record<string, string[]> = {
  "substance-use": ["drug", "substance", "alcohol", "crack", "opioid", "methamphetamine"],
  "injection-drug-use": ["inject", "injection", "PWID", "IDU", "syringe"],
  incarceration: [
    "incarcerat",
    "jail",
    "prison",
    "juvenile",
    "detention",
    "justice",
    "community supervision",
  ],
  homelessness: ["homeless", "unstably housed", "homelessness", "housing"],
  pregnant: ["pregnant", "postpartum", "prenatal", "antenatal", "perinatal"],
};

// --- Effects keyword maps ---

const GOAL_EFFECT_KEYWORDS: Record<string, string[]> = {
  "medication-adherence": [
    "adherence",
    "ART adherence",
    "medication adherence",
    "viral suppression",
    "viral load",
  ],
  prep: ["PrEP", "pre-exposure prophylaxis"],
  "connect-to-care": [
    "linkage",
    "engagement",
    "retention",
    "re-engagement",
    "connected to care",
  ],
  "reduce-risk": [
    "condom",
    "unprotected",
    "sex partner",
    "risky sex",
    "sexual risk",
    "risk reduction",
  ],
  "substance-use": [
    "drug use",
    "injection",
    "substance",
    "needle",
    "syringe",
    "abstinence",
  ],
  testing: ["testing", "screening", "diagnos"],
  "reduce-stigma": ["stigma"],
  "overall-health": ["CD4", "viral suppression", "quality of life", "well-being"],
};

// --- Negative keywords to reduce false positives ---

const AGE_NEGATIVE_KEYWORDS: Record<string, string[]> = {
  "25-49": ["young adult", "older adult", "adolescent", "youth", "aged ≥50"],
};

// --- Scoring ---

function textContainsKeyword(text: string, keyword: string): boolean {
  return text.toLowerCase().includes(keyword.toLowerCase());
}

function getPopulationKeywords(answers: QuestionnaireAnswers): string[] {
  const keywords: string[] = [];

  if (answers.ageRange) {
    keywords.push(...(AGE_KEYWORDS[answers.ageRange] ?? []));
  }
  if (answers.orientation) {
    keywords.push(...(ORIENTATION_KEYWORDS[answers.orientation] ?? []));
  }
  for (const race of answers.raceEthnicity) {
    keywords.push(...(RACE_KEYWORDS[race] ?? []));
  }
  if (answers.hivStatus) {
    keywords.push(...(HIV_STATUS_KEYWORDS[answers.hivStatus] ?? []));
  }
  if (answers.treatmentStatus) {
    keywords.push(...(TREATMENT_STATUS_KEYWORDS[answers.treatmentStatus] ?? []));
  }
  if (answers.prepStatus) {
    keywords.push(...(PREP_STATUS_KEYWORDS[answers.prepStatus] ?? []));
  }
  for (const circ of answers.circumstances) {
    keywords.push(...(CIRCUMSTANCE_KEYWORDS[circ] ?? []));
  }

  return keywords;
}

function getNegativeKeywords(answers: QuestionnaireAnswers): string[] {
  const neg: string[] = [];
  if (answers.ageRange) {
    neg.push(...(AGE_NEGATIVE_KEYWORDS[answers.ageRange] ?? []));
  }
  return neg;
}

function getEffectsKeywords(answers: QuestionnaireAnswers): string[] {
  const keywords: string[] = [];
  for (const goal of answers.goals) {
    keywords.push(...(GOAL_EFFECT_KEYWORDS[goal] ?? []));
  }
  return keywords;
}

function countPopulationMatches(
  populations: string[],
  keywords: string[],
  negativeKeywords: string[]
): number {
  if (keywords.length === 0) return 0;

  let matches = 0;
  const populationText = populations.join(" ");

  for (const keyword of keywords) {
    if (textContainsKeyword(populationText, keyword)) {
      // Check it's not a negative match
      const isNegative = negativeKeywords.some(
        (neg) =>
          textContainsKeyword(populationText, neg) &&
          neg.toLowerCase().includes(keyword.toLowerCase())
      );
      if (!isNegative) {
        matches++;
      }
    }
  }

  return matches;
}

function countEffectsMatches(effects: string[], keywords: string[]): number {
  if (keywords.length === 0) return 0;

  let matches = 0;
  const effectsText = effects.join(" ");

  for (const keyword of keywords) {
    if (textContainsKeyword(effectsText, keyword)) {
      matches++;
    }
  }

  return matches;
}

export function matchInterventions(
  answers: QuestionnaireAnswers,
  interventions: TreatmentIntervention[]
): ScoredIntervention[] {
  const popKeywords = getPopulationKeywords(answers);
  const negKeywords = getNegativeKeywords(answers);
  const effectKeywords = getEffectsKeywords(answers);

  const scored: ScoredIntervention[] = [];

  for (const intervention of interventions) {
    const populationMatches = countPopulationMatches(
      intervention.populations,
      popKeywords,
      negKeywords
    );
    const effectsMatches = countEffectsMatches(
      intervention.keyEffects,
      effectKeywords
    );

    const score = populationMatches * 2 + effectsMatches;

    if (score > 0) {
      scored.push({ intervention, score, populationMatches, effectsMatches });
    }
  }

  scored.sort((a, b) => b.score - a.score);

  return scored;
}
