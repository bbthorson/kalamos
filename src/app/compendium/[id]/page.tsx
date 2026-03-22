import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getTreatmentInterventions,
  getPreventionPublications,
  getInterventionById,
  getPublicationById,
} from "@/lib/compendium";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink } from "lucide-react";

export function generateStaticParams() {
  const treatments = getTreatmentInterventions();
  const publications = getPreventionPublications();
  return [
    ...treatments.map((i) => ({ id: i.id })),
    ...publications.map((p) => ({ id: p.id })),
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const intervention = getInterventionById(id);
  const publication = getPublicationById(id);
  const title = intervention?.name || publication?.title || "Not Found";
  return { title };
}

export default async function CompendiumDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const intervention = getInterventionById(id);
  const publication = getPublicationById(id);

  if (!intervention && !publication) {
    notFound();
  }

  if (intervention) {
    return <InterventionDetail intervention={intervention} />;
  }

  return <PublicationDetail publication={publication!} />;
}

function InterventionDetail({
  intervention,
}: {
  intervention: NonNullable<ReturnType<typeof getInterventionById>>;
}) {
  return (
    <div>
      <section className="bg-shadow-900 text-white py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/compendium"
            className="inline-flex items-center gap-1 text-sm text-shadow-300 hover:text-white mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Compendium
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-heading)] tracking-tight">
            {intervention.name}
          </h1>
          {intervention.efficacyRating && (
            <Badge variant="primary" className="mt-3">
              {intervention.efficacyRating}
            </Badge>
          )}
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
          {intervention.description && (
            <div>
              <h2 className="text-lg font-semibold text-warm-900 font-[family-name:var(--font-heading)] mb-2">
                Description
              </h2>
              <p className="text-warm-700 leading-relaxed">
                {intervention.description}
              </p>
            </div>
          )}

          <div className="grid sm:grid-cols-2 gap-6">
            {intervention.populations.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-warm-800 mb-2">
                  Intended Population
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {intervention.populations.map((pop) => (
                    <Badge key={pop} variant="default">
                      {pop}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {intervention.keyEffects.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-warm-800 mb-2">
                  Key Effects
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {intervention.keyEffects.map((effect) => (
                    <Badge key={effect} variant="outline">
                      {effect}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {intervention.ehePillars.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-warm-800 mb-2">
                  EHE Pillars
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {intervention.ehePillars.map((pillar) => (
                    <Badge key={pillar} variant="primary">
                      {pillar}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-2">
              {intervention.studyLocation && (
                <p className="text-sm text-warm-600">
                  <span className="font-medium">Location:</span>{" "}
                  {intervention.studyLocation}
                </p>
              )}
              {intervention.duration && (
                <p className="text-sm text-warm-600">
                  <span className="font-medium">Duration:</span>{" "}
                  {intervention.duration}
                </p>
              )}
              {intervention.yearRange && (
                <p className="text-sm text-warm-600">
                  <span className="font-medium">Study Years:</span>{" "}
                  {intervention.yearRange.start} - {intervention.yearRange.end}
                </p>
              )}
            </div>
          </div>

          {intervention.publications.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-warm-900 font-[family-name:var(--font-heading)] mb-3">
                Publications
              </h2>
              <ul className="space-y-2">
                {intervention.publications
                  .filter((p) => !p.url.startsWith("mailto:"))
                  .map((pub, i) => (
                    <li key={i}>
                      <a
                        href={pub.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:text-primary-700 text-sm inline-flex items-center gap-1"
                      >
                        {pub.title}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          )}

          <div className="border-t border-warm-200 pt-8">
            <p className="text-sm text-warm-500 mb-4">
              Kalamos delivers evidence-based behavioral health interventions
              like this to HIV care clinics.
            </p>
            <div className="flex gap-3">
              <Link href="/for-clinics">
                <Button variant="primary">Learn About Our Services</Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline">Contact Us</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function PublicationDetail({
  publication,
}: {
  publication: NonNullable<ReturnType<typeof getPublicationById>>;
}) {
  return (
    <div>
      <section className="bg-shadow-900 text-white py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/compendium"
            className="inline-flex items-center gap-1 text-sm text-shadow-300 hover:text-white mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Compendium
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-heading)] tracking-tight">
            {publication.title}
          </h1>
          <p className="mt-2 text-shadow-200">
            {publication.authors}
            {publication.publicationYear &&
              ` (${publication.publicationYear})`}
          </p>
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid sm:grid-cols-2 gap-6">
            {publication.publicationType && (
              <div>
                <h3 className="text-sm font-semibold text-warm-800 mb-2">
                  Publication Type
                </h3>
                <Badge variant="primary">{publication.publicationType}</Badge>
              </div>
            )}

            {publication.keyOutcomes.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-warm-800 mb-2">
                  Key Outcomes
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {publication.keyOutcomes.map((outcome) => (
                    <Badge key={outcome} variant="outline">
                      {outcome}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {publication.populations.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-warm-800 mb-2">
                  Intended Population
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {publication.populations.map((pop) => (
                    <Badge key={pop} variant="default">
                      {pop}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {publication.ehePillars.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-warm-800 mb-2">
                  EHE Pillars
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {publication.ehePillars.map((pillar) => (
                    <Badge key={pillar} variant="primary">
                      {pillar}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          {publication.citation && (
            <div>
              <h2 className="text-lg font-semibold text-warm-900 font-[family-name:var(--font-heading)] mb-2">
                Citation
              </h2>
              <p className="text-sm text-warm-700 leading-relaxed">
                {publication.citation}
              </p>
            </div>
          )}

          {Object.keys(publication.links).length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-warm-900 font-[family-name:var(--font-heading)] mb-3">
                Links
              </h2>
              <ul className="space-y-2">
                {publication.links.pubmed && (
                  <li>
                    <a
                      href={publication.links.pubmed}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-700 text-sm inline-flex items-center gap-1"
                    >
                      PubMed <ExternalLink className="h-3 w-3" />
                    </a>
                  </li>
                )}
                {publication.links.pmc && (
                  <li>
                    <a
                      href={publication.links.pmc}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-700 text-sm inline-flex items-center gap-1"
                    >
                      PubMed Central <ExternalLink className="h-3 w-3" />
                    </a>
                  </li>
                )}
                {publication.links.doi && (
                  <li>
                    <a
                      href={publication.links.doi}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-700 text-sm inline-flex items-center gap-1"
                    >
                      Journal Article <ExternalLink className="h-3 w-3" />
                    </a>
                  </li>
                )}
              </ul>
            </div>
          )}

          <div className="border-t border-warm-200 pt-8">
            <div className="flex gap-3">
              <Link href="/for-clinics">
                <Button variant="primary">Learn About Our Services</Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline">Contact Us</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
