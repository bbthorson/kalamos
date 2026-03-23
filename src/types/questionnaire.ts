import type { TreatmentIntervention } from "./compendium";

export type AgeRange = "under-18" | "18-24" | "25-49" | "50-plus";
export type SexualOrientation = "msm" | "heterosexual" | "other";
export type HivStatus = "positive" | "negative" | "unknown";
export type TreatmentStatus =
  | "recently-diagnosed"
  | "on-art"
  | "not-in-care"
  | "adherence-issues";
export type PrepStatus = "on-prep" | "interested-in-prep" | "neither";
export type Circumstance =
  | "substance-use"
  | "injection-drug-use"
  | "incarceration"
  | "homelessness"
  | "pregnant";
export type Goal =
  | "medication-adherence"
  | "prep"
  | "connect-to-care"
  | "reduce-risk"
  | "substance-use"
  | "testing"
  | "reduce-stigma"
  | "overall-health";

export interface QuestionnaireAnswers {
  ageRange?: AgeRange;
  orientation?: SexualOrientation;
  raceEthnicity: string[];
  hivStatus?: HivStatus;
  treatmentStatus?: TreatmentStatus;
  prepStatus?: PrepStatus;
  circumstances: string[];
  goals: string[];
}

export interface ScoredIntervention {
  intervention: TreatmentIntervention;
  score: number;
  populationMatches: number;
  effectsMatches: number;
}

export interface QuestionOption {
  value: string;
  label: string;
  description?: string;
}

export interface QuestionDef {
  id: string;
  title: string;
  description?: string;
  type: "single" | "multi";
  options: QuestionOption[];
  field: keyof QuestionnaireAnswers;
  optional?: boolean;
}

export interface StepDef {
  id: string;
  title: string;
  description?: string;
  questions: QuestionDef[];
}
