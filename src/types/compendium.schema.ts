import { z } from "zod";

export const treatmentInterventionSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  description: z.string(),
  populations: z.array(z.string()),
  keyEffects: z.array(z.string()),
  strategies: z.array(z.string()),
  efficacyRating: z.string(),
  ehePillars: z.array(z.enum(["Diagnose", "Treat", "Prevent", "Respond"])),
  studyLocation: z.enum(["Domestic", "International", "Both"]).nullable(),
  duration: z.enum(["Single-session", "Multi-session"]).nullable(),
  yearRange: z
    .object({ start: z.number(), end: z.number() })
    .nullable(),
  publications: z.array(
    z.object({
      title: z.string(),
      url: z.string(),
      citation: z.string(),
    })
  ),
  contactEmail: z.string().nullable(),
});

export const preventionPublicationSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  authors: z.string(),
  publicationType: z.string(),
  publicationYear: z.number().nullable(),
  populations: z.array(z.string()),
  keyOutcomes: z.array(z.string()),
  ehePillars: z.array(z.enum(["Diagnose", "Treat", "Prevent", "Respond"])),
  links: z.object({
    pubmed: z.string().optional(),
    pmc: z.string().optional(),
    doi: z.string().optional(),
    prospero: z.string().optional(),
  }),
  citation: z.string(),
});

export const compendiumMetadataSchema = z.object({
  populations: z.array(z.string()),
  effects: z.array(z.string()),
  outcomes: z.array(z.string()),
  strategies: z.array(z.string()),
  publicationTypes: z.array(z.string()),
  ehePillars: z.array(z.string()),
  lastUpdated: z.string(),
  treatmentCount: z.number(),
  preventionCount: z.number(),
});
