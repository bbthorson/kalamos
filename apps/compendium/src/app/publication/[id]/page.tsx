import type { Metadata } from "next";
import Link from "next/link";
import {
  getPreventionPublications,
  getPublicationById,
} from "@kalamos/compendium-data";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ExternalLink,
  User,
  CalendarDays,
} from "lucide-react";
import { CopyButton } from "./copy-button";

export async function generateStaticParams() {
  const publications = getPreventionPublications();
  return publications.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const publication = getPublicationById(id);
  if (!publication) return { title: "Publication Not Found" };
  return {
    title: publication.title,
  };
}

import { PILLAR_COLORS } from "@/lib/pillar-colors";

const LINK_LABELS: Record<string, { label: string; prefix: string }> = {
  pubmed: { label: "PubMed", prefix: "" },
  pmc: { label: "PMC", prefix: "" },
  doi: { label: "DOI", prefix: "" },
  prospero: { label: "PROSPERO", prefix: "" },
};

export default async function PublicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const publication = getPublicationById(id);

  if (!publication) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h1 className="text-2xl font-semibold text-warm-900 font-heading">
          Publication not found
        </h1>
        <Link
          href="/explore"
          className="mt-4 inline-flex items-center gap-1.5 text-primary-600 hover:text-primary-700 text-sm font-medium"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to catalog
        </Link>
      </div>
    );
  }

  const linkEntries = Object.entries(publication.links).filter(
    ([, url]) => url
  ) as [string, string][];

  return (
    <div className="bg-warm-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Back link */}
        <Link
          href="/explore"
          className="inline-flex items-center gap-1.5 text-primary-600 hover:text-primary-700 text-sm font-medium mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to catalog
        </Link>

        <div className="space-y-8">
          {/* Header */}
          <section>
            <h1 className="text-3xl font-bold text-warm-900 font-heading leading-tight mb-4">
              {publication.title}
            </h1>

            <div className="flex flex-wrap items-center gap-3 text-sm text-warm-600">
              <span className="inline-flex items-center gap-1.5">
                <User className="h-4 w-4 text-warm-400" />
                {publication.authors}
              </span>
              {publication.publicationYear && (
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="h-4 w-4 text-warm-400" />
                  {publication.publicationYear}
                </span>
              )}
              <Badge variant="primary">{publication.publicationType}</Badge>
            </div>
          </section>

          {/* Citation */}
          <section>
            <h2 className="text-lg font-semibold text-warm-900 font-heading mb-3">
              Citation
            </h2>
            <Card className="bg-white">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between gap-4">
                  <p className="text-sm text-warm-700 leading-relaxed italic flex-1">
                    {publication.citation}
                  </p>
                  <CopyButton text={publication.citation} />
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Populations */}
          {publication.populations.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-warm-900 font-heading mb-3">
                Populations
              </h2>
              <div className="flex flex-wrap gap-2">
                {publication.populations.map((pop) => (
                  <Badge key={pop} variant="outline">
                    {pop}
                  </Badge>
                ))}
              </div>
            </section>
          )}

          {/* Key Outcomes */}
          {publication.keyOutcomes.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-warm-900 font-heading mb-3">
                Key Outcomes
              </h2>
              <div className="flex flex-wrap gap-2">
                {publication.keyOutcomes.map((outcome) => (
                  <Badge key={outcome}>{outcome}</Badge>
                ))}
              </div>
            </section>
          )}

          {/* EHE Alignment */}
          {publication.ehePillars.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-warm-900 font-heading mb-3">
                EHE Alignment
              </h2>
              <div className="flex flex-wrap gap-2">
                {publication.ehePillars.map((pillar) => (
                  <span
                    key={pillar}
                    className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${PILLAR_COLORS[pillar] ?? "bg-warm-100 text-warm-700"}`}
                  >
                    {pillar}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Links */}
          {linkEntries.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-warm-900 font-heading mb-3">
                Links
              </h2>
              <div className="flex flex-wrap gap-3">
                {linkEntries.map(([key, url]) => {
                  const config = LINK_LABELS[key];
                  return (
                    <a
                      key={key}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="outline" size="sm">
                        {config?.label ?? key}
                        <ExternalLink className="h-3.5 w-3.5" />
                      </Button>
                    </a>
                  );
                })}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
