import type { StepDef, QuestionnaireAnswers } from "@/types/questionnaire";

const step1: StepDef = {
  id: "about-you",
  title: "About You",
  description: "Help us understand who you are so we can find the best match.",
  questions: [
    {
      id: "age-range",
      title: "What is your age?",
      type: "single",
      field: "ageRange",
      options: [
        { value: "under-18", label: "Under 18" },
        { value: "18-24", label: "18–24" },
        { value: "25-49", label: "25–49" },
        { value: "50-plus", label: "50+" },
      ],
    },
    {
      id: "orientation",
      title: "How do you identify?",
      type: "single",
      field: "orientation",
      options: [
        { value: "msm", label: "Gay or bisexual man" },
        { value: "heterosexual", label: "Heterosexual" },
        { value: "other", label: "Other or prefer not to say" },
      ],
    },
    {
      id: "race-ethnicity",
      title: "Race / Ethnicity",
      description: "Select all that apply.",
      type: "multi",
      field: "raceEthnicity",
      optional: true,
      options: [
        { value: "black", label: "Black or African American" },
        { value: "hispanic", label: "Hispanic or Latino" },
        { value: "asian", label: "Asian or Pacific Islander" },
        { value: "white", label: "White" },
        { value: "other", label: "Other" },
      ],
    },
  ],
};

const step2Positive: StepDef = {
  id: "hiv-treatment",
  title: "HIV & Treatment",
  description: "This helps us find interventions designed for your situation.",
  questions: [
    {
      id: "hiv-status",
      title: "What is your HIV status?",
      type: "single",
      field: "hivStatus",
      options: [
        { value: "positive", label: "Living with HIV" },
        { value: "negative", label: "HIV-negative" },
        { value: "unknown", label: "I don\u2019t know" },
      ],
    },
    {
      id: "treatment-status",
      title: "Where are you in treatment?",
      type: "single",
      field: "treatmentStatus",
      options: [
        {
          value: "recently-diagnosed",
          label: "Recently diagnosed",
          description: "Within the last 6 months",
        },
        {
          value: "on-art",
          label: "On treatment (ART)",
          description: "Currently taking antiretroviral medication",
        },
        {
          value: "not-in-care",
          label: "Not currently in care",
          description: "Previously treated or never started",
        },
        {
          value: "adherence-issues",
          label: "Having trouble staying on medication",
          description: "Missing doses or considering stopping",
        },
      ],
    },
  ],
};

const step2Negative: StepDef = {
  id: "hiv-prevention",
  title: "HIV & Prevention",
  description: "This helps us find interventions designed for your situation.",
  questions: [
    {
      id: "hiv-status",
      title: "What is your HIV status?",
      type: "single",
      field: "hivStatus",
      options: [
        { value: "positive", label: "Living with HIV" },
        { value: "negative", label: "HIV-negative" },
        { value: "unknown", label: "I don\u2019t know" },
      ],
    },
    {
      id: "prep-status",
      title: "Are you using or considering PrEP?",
      type: "single",
      field: "prepStatus",
      options: [
        {
          value: "on-prep",
          label: "Currently on PrEP",
        },
        {
          value: "interested-in-prep",
          label: "Interested in PrEP",
        },
        {
          value: "neither",
          label: "Not interested right now",
        },
      ],
    },
  ],
};

const step2Default: StepDef = {
  id: "hiv-status",
  title: "HIV & Treatment",
  description: "This helps us find interventions designed for your situation.",
  questions: [
    {
      id: "hiv-status",
      title: "What is your HIV status?",
      type: "single",
      field: "hivStatus",
      options: [
        { value: "positive", label: "Living with HIV" },
        { value: "negative", label: "HIV-negative" },
        { value: "unknown", label: "I don\u2019t know" },
      ],
    },
  ],
};

const step3: StepDef = {
  id: "circumstances",
  title: "Life Circumstances",
  description:
    "Select any that apply. These are optional — skip if you prefer.",
  questions: [
    {
      id: "circumstances",
      title: "Do any of these apply to you?",
      type: "multi",
      field: "circumstances",
      optional: true,
      options: [
        {
          value: "substance-use",
          label: "Substance use",
          description: "Alcohol or drug use",
        },
        {
          value: "injection-drug-use",
          label: "Injection drug use",
        },
        {
          value: "incarceration",
          label: "Current or past incarceration",
        },
        {
          value: "homelessness",
          label: "Experiencing homelessness or unstable housing",
        },
        {
          value: "pregnant",
          label: "Pregnant or recently postpartum",
        },
      ],
    },
  ],
};

const step4: StepDef = {
  id: "goals",
  title: "Your Goals",
  description: "What would you most like help with? Select all that apply.",
  questions: [
    {
      id: "goals",
      title: "What are you looking for?",
      type: "multi",
      field: "goals",
      options: [
        {
          value: "medication-adherence",
          label: "Stay on my medication",
        },
        {
          value: "prep",
          label: "Start or stay on PrEP",
        },
        {
          value: "connect-to-care",
          label: "Get connected to HIV care",
        },
        {
          value: "reduce-risk",
          label: "Reduce risky sexual behavior",
        },
        {
          value: "substance-use",
          label: "Address substance use",
        },
        {
          value: "testing",
          label: "Get tested for HIV or STIs",
        },
        {
          value: "reduce-stigma",
          label: "Deal with stigma around HIV",
        },
        {
          value: "overall-health",
          label: "Improve my overall health",
        },
      ],
    },
  ],
};

/**
 * Returns the visible steps based on current answers.
 * Step 2 branches based on HIV status.
 */
export function getSteps(answers: QuestionnaireAnswers): StepDef[] {
  let step2: StepDef;

  if (answers.hivStatus === "positive") {
    step2 = step2Positive;
  } else if (answers.hivStatus === "negative") {
    step2 = step2Negative;
  } else {
    step2 = step2Default;
  }

  // Filter goals based on HIV status
  const filteredStep4 = filterGoals(step4, answers);

  return [step1, step2, step3, filteredStep4];
}

function filterGoals(step: StepDef, answers: QuestionnaireAnswers): StepDef {
  const goalsQuestion = step.questions[0];
  let options = goalsQuestion.options;

  if (answers.hivStatus === "negative") {
    // Remove medication adherence goal for HIV-negative
    options = options.filter((o) => o.value !== "medication-adherence");
  } else if (answers.hivStatus === "positive") {
    // Remove PrEP goal for HIV-positive
    options = options.filter((o) => o.value !== "prep");
  }

  return {
    ...step,
    questions: [{ ...goalsQuestion, options }],
  };
}

export function createEmptyAnswers(): QuestionnaireAnswers {
  return {
    raceEthnicity: [],
    circumstances: [],
    goals: [],
  };
}
