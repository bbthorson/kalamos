import { getTreatmentInterventions } from "./filters";
import type { TreatmentIntervention } from "./types";

export interface PopulationTheme {
  id: string;
  label: string;
  description: string;
  clinicDescription: string;
  iconName: string;
  interventionCount: number;
  examplePopulations: string[];
  exampleEffects: string[];
}

interface ThemeConfig {
  id: string;
  label: string;
  description: string;
  clinicDescription: string;
  iconName: string;
  matcher: RegExp;
  curatedEffects: string[];
}

const themeConfigs: ThemeConfig[] = [
  {
    id: "msm-lgbtq",
    label: "LGBTQ+ & MSM Communities",
    description:
      "Support sexual and gender minority individuals navigating HIV prevention, treatment, and the unique mental health challenges they face.",
    clinicDescription:
      "Retain and support your LGBTQ+ patients with targeted behavioral health programs that improve adherence, reduce risk, and address the mental health challenges unique to sexual and gender minorities.",
    iconName: "Heart",
    matcher:
      /MSM|men who have sex with men|gay|bisexual|sexual minority|MSMW|GBMSM|transgender|same.sex/i,
    curatedEffects: [
      "Increased PrEP use",
      "Reduced sexual risk behaviors",
      "Improved HIV testing uptake",
    ],
  },
  {
    id: "youth",
    label: "Youth & Young Adults",
    description:
      "Reach young people during the critical window when health behaviors are forming — from adolescents in school to young adults aging out of pediatric care.",
    clinicDescription:
      "Keep young patients engaged during the critical transition years. Programs designed for adolescents and young adults build lasting health behaviors and prevent loss to follow-up.",
    iconName: "GraduationCap",
    matcher: /youth|adolescen|young |teen|aged 1[3-9]|aged 2[0-5]|15.24|16.24|18.29/i,
    curatedEffects: [
      "Increased HIV testing",
      "Improved linkage to care",
      "Reduced risk behaviors",
    ],
  },
  {
    id: "plwh",
    label: "People Living with HIV",
    description:
      "Help patients stay in care, adhere to treatment, and achieve viral suppression — the interventions that change long-term outcomes.",
    clinicDescription:
      "Your patients living with HIV need more than prescriptions — they need engagement programs that drive adherence, viral suppression, and long-term retention in care.",
    iconName: "Activity",
    matcher:
      /HIV.positive|HIV.seropositive|with HIV|living with HIV|PWH|PLWH|diagnosed.*HIV|ART|antiretroviral/i,
    curatedEffects: [
      "Improved ART adherence",
      "Increased viral suppression",
      "Better retention in care",
    ],
  },
  {
    id: "substance-use",
    label: "Substance Use & Co-Occurring Disorders",
    description:
      "Address the intersection of substance use and HIV risk with integrated behavioral health approaches.",
    clinicDescription:
      "Patients with co-occurring substance use disorders need integrated support. Deploy programs that address both HIV outcomes and substance use without referring out.",
    iconName: "ShieldAlert",
    matcher:
      /drug|substance|inject|opioid|crack|heroin|alcohol|PWID|PWUD|methamphetamine|IDU/i,
    curatedEffects: [
      "Reduced substance use",
      "Increased treatment engagement",
      "Reduced injection risk behaviors",
    ],
  },
  {
    id: "health-equity",
    label: "Communities of Color & Health Equity",
    description:
      "Deliver culturally responsive care to the communities disproportionately affected by HIV — Black, Latino, and other underserved populations.",
    clinicDescription:
      "Close health equity gaps in your patient panel with culturally responsive programs designed for the communities disproportionately affected by HIV.",
    iconName: "Users",
    matcher:
      /African American|Black|Hispanic|Latina?o?|Asian|Native Hawaiian|Pacific Islander|Mexican|ethnic minority/i,
    curatedEffects: [
      "Reduced health disparities",
      "Increased engagement in care",
      "Improved testing rates",
    ],
  },
  {
    id: "housing-justice",
    label: "Homelessness & Justice-Involved",
    description:
      "Provide continuity of care for individuals experiencing housing instability or re-entering communities after incarceration.",
    clinicDescription:
      "Patients experiencing homelessness or re-entering from incarceration are at highest risk of disengagement. Targeted programs keep them connected to your clinic.",
    iconName: "Home",
    matcher:
      /homeless|incarcerat|jail|prison|justice|detention|community supervision|unstably housed|shelter/i,
    curatedEffects: [
      "Improved linkage to care",
      "Increased housing stability",
      "Better medication adherence",
    ],
  },
];

function pickExamplePopulations(
  interventions: TreatmentIntervention[],
  maxLength: number = 80
): string[] {
  const seen = new Set<string>();
  const examples: string[] = [];

  for (const intervention of interventions) {
    for (const pop of intervention.populations) {
      if (pop.length <= maxLength && !seen.has(pop)) {
        seen.add(pop);
        examples.push(pop);
        if (examples.length >= 3) return examples;
      }
    }
  }

  return examples;
}

export function getPopulationThemes(): PopulationTheme[] {
  const allTreatments = getTreatmentInterventions();

  return themeConfigs.map((config) => {
    const matching = allTreatments.filter((t) =>
      t.populations.some((p) => config.matcher.test(p))
    );

    return {
      id: config.id,
      label: config.label,
      description: config.description,
      clinicDescription: config.clinicDescription,
      iconName: config.iconName,
      interventionCount: matching.length,
      examplePopulations: pickExamplePopulations(matching),
      exampleEffects: config.curatedEffects,
    };
  });
}
