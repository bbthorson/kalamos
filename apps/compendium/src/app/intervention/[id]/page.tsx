import type { Metadata } from "next";
import Link from "next/link";
import {
  getTreatmentInterventions,
  getInterventionById,
} from "@kalamos/compendium-data";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  Clock,
  MapPin,
  Calendar,
  Mail,
  ExternalLink,
} from "lucide-react";

export async function generateStaticParams() {
  const interventions = getTreatmentInterventions();
  return interventions.map((i) => ({ id: i.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const intervention = getInterventionById(id);
  if (!intervention) return { title: "Intervention Not Found" };
  return {
    title: intervention.name,
    description: intervention.description.slice(0, 160),
  };
}

const PILLAR_COLORS: Record<string, string> = {
  Diagnose: "bg-blue-100 text-blue-800",
  Treat: "bg-green-100 text-green-800",
  Prevent: "bg-amber-100 text-amber-800",
  Respond: "bg-rose-100 text-rose-800",
};

function getRelatedInterventions(
  currentId: string,
  ehePillars: string[],
  populations: string[]
) {
  const all = getTreatmentInterventions();
  const scored = all
    .filter((i) => i.id !== currentId)
    .map((i) => {
      const pillarOverlap = i.ehePillars.filter((p) =>
        ehePillars.includes(p)
      ).length;
      const popOverlap = i.populations.filter((p) =>
        populations.includes(p)
      ).length;
      return { intervention: i, score: pillarOverlap * 2 + popOverlap };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, 5).map((s) => s.intervention);
}

export default async function InterventionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const intervention = getInterventionById(id);

  if (!intervention) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h1 className="text-2xl font-semibold text-warm-900 font-[family-name:var(--font-heading)]">
          Intervention not found
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

  const related = getRelatedInterventions(
    intervention.id,
    intervention.ehePillars,
    intervention.populations
  );

  return (
    <div className="bg-warm-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Back link */}
        <Link
          href="/explore"
          className="inline-flex items-center gap-1.5 text-primary-600 hover:text-primary-700 text-sm font-medium mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to catalog
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
          {/* Main content */}
          <div className="space-y-8">
            {/* Header */}
            <section>
              <div className="flex flex-wrap items-start gap-3 mb-4">
                <h1 className="text-3xl font-bold text-warm-900 font-[family-name:var(--font-heading)] leading-tight">
                  {intervention.name}
                </h1>
                <Badge
                  variant="primary"
                  className="text-sm px-3 py-1 shrink-0"
                >
                  {intervention.efficacyRating}
                </Badge>
              </div>
              <p className="text-warm-600 text-base leading-relaxed max-w-3xl">
                {intervention.description}
              </p>
            </section>

            {/* Implementation Details */}
            <Card>
              <CardHeader>
                <CardTitle>Implementation Details</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {intervention.duration && (
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-warm-400 mt-0.5 shrink-0" />
                      <div>
                        <dt className="text-xs font-medium text-warm-500 uppercase tracking-wide">
                          Duration
                        </dt>
                        <dd className="text-sm text-warm-800 mt-0.5">
                          {intervention.duration}
                        </dd>
                      </div>
                    </div>
                  )}
                  {intervention.studyLocation && (
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-warm-400 mt-0.5 shrink-0" />
                      <div>
                        <dt className="text-xs font-medium text-warm-500 uppercase tracking-wide">
                          Study Location
                        </dt>
                        <dd className="text-sm text-warm-800 mt-0.5">
                          {intervention.studyLocation}
                        </dd>
                      </div>
                    </div>
                  )}
                  {intervention.yearRange && (
                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-warm-400 mt-0.5 shrink-0" />
                      <div>
                        <dt className="text-xs font-medium text-warm-500 uppercase tracking-wide">
                          Year Range
                        </dt>
                        <dd className="text-sm text-warm-800 mt-0.5">
                          {intervention.yearRange.start}
                          {" \u2013 "}
                          {intervention.yearRange.end}
                        </dd>
                      </div>
                    </div>
                  )}
                </dl>
              </CardContent>
            </Card>

            {/* Populations Served */}
            {intervention.populations.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold text-warm-900 font-[family-name:var(--font-heading)] mb-3">
                  Populations Served
                </h2>
                <div className="flex flex-wrap gap-2">
                  {intervention.populations.map((pop) => (
                    <Badge key={pop} variant="outline">
                      {pop}
                    </Badge>
                  ))}
                </div>
              </section>
            )}

            {/* Key Effects */}
            {intervention.keyEffects.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold text-warm-900 font-[family-name:var(--font-heading)] mb-3">
                  Key Effects
                </h2>
                <ul className="space-y-2">
                  {intervention.keyEffects.map((effect) => (
                    <li
                      key={effect}
                      className="flex items-start gap-2 text-sm text-warm-700"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary-500 shrink-0" />
                      {effect}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* EHE Alignment */}
            {intervention.ehePillars.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold text-warm-900 font-[family-name:var(--font-heading)] mb-3">
                  EHE Alignment
                </h2>
                <div className="flex flex-wrap gap-2">
                  {intervention.ehePillars.map((pillar) => (
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

            {/* Strategies */}
            {intervention.strategies.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold text-warm-900 font-[family-name:var(--font-heading)] mb-3">
                  Strategies
                </h2>
                <div className="flex flex-wrap gap-2">
                  {intervention.strategies.map((strategy) => (
                    <Badge key={strategy}>{strategy}</Badge>
                  ))}
                </div>
              </section>
            )}

            {/* Publications */}
            {intervention.publications.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold text-warm-900 font-[family-name:var(--font-heading)] mb-4">
                  Publications
                </h2>
                <div className="space-y-4">
                  {intervention.publications.map((pub) => (
                    <Card key={pub.title}>
                      <CardContent className="pt-6">
                        <p className="text-sm text-warm-700 leading-relaxed">
                          {pub.citation}
                        </p>
                        {pub.url && (
                          <a
                            href={pub.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 mt-3 text-sm text-primary-600 hover:text-primary-700 font-medium"
                          >
                            View publication
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            {/* Contact */}
            {intervention.contactEmail && (
              <section className="border-t border-warm-200 pt-6">
                <a
                  href={`mailto:${intervention.contactEmail}`}
                  className="inline-flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                  <Mail className="h-4 w-4" />
                  Contact intervention developers
                </a>
              </section>
            )}
          </div>

          {/* Sidebar: Related Interventions */}
          {related.length > 0 && (
            <aside className="space-y-4">
              <h2 className="text-lg font-semibold text-warm-900 font-[family-name:var(--font-heading)]">
                Related Interventions
              </h2>
              {related.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/intervention/${rel.id}`}
                  className="block group"
                >
                  <Card className="transition-shadow hover:shadow-md">
                    <CardContent className="pt-5 pb-4">
                      <h3 className="text-sm font-semibold text-warm-800 group-hover:text-primary-600 transition-colors leading-snug">
                        {rel.name}
                      </h3>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {rel.ehePillars.map((pillar) => (
                          <span
                            key={pillar}
                            className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${PILLAR_COLORS[pillar] ?? "bg-warm-100 text-warm-700"}`}
                          >
                            {pillar}
                          </span>
                        ))}
                      </div>
                      <p className="text-xs text-warm-500 mt-2">
                        {rel.efficacyRating}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}
