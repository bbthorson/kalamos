import Link from "next/link";
import type { PreventionPublication } from "@kalamos/compendium-data";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

interface PublicationCardProps {
  publication: PreventionPublication;
}

export function PublicationCard({ publication }: PublicationCardProps) {
  const {
    id,
    title,
    authors,
    publicationType,
    publicationYear,
    ehePillars,
    keyOutcomes,
    links,
  } = publication;

  const hasLinks =
    links && (links.pubmed || links.doi || links.pmc || links.prospero);

  return (
    <Card className="flex flex-col hover:border-primary-300 transition-colors">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base leading-snug">
            <Link
              href={`/publication/${id}`}
              className="hover:text-primary-700 transition-colors"
            >
              {title}
            </Link>
          </CardTitle>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <Badge variant="default" className="text-[11px] shrink-0">
            {publicationType}
          </Badge>
          {publicationYear && (
            <span className="text-xs text-warm-500">{publicationYear}</span>
          )}
        </div>
        <p className="text-xs text-warm-500 line-clamp-1 mt-1">{authors}</p>
      </CardHeader>
      <CardContent className="mt-auto space-y-3">
        {/* EHE Pillars */}
        {ehePillars.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {ehePillars.map((pillar) => (
              <Badge key={pillar} variant="primary" className="text-[10px]">
                {pillar}
              </Badge>
            ))}
          </div>
        )}

        {/* Key Outcomes */}
        {keyOutcomes.length > 0 && (
          <ul className="space-y-0.5">
            {keyOutcomes.slice(0, 3).map((outcome) => (
              <li
                key={outcome}
                className="text-xs text-warm-600 flex items-start gap-1.5"
              >
                <span className="text-primary-400 mt-1 shrink-0">&#8226;</span>
                <span className="line-clamp-1">{outcome}</span>
              </li>
            ))}
          </ul>
        )}

        {/* External Links */}
        {hasLinks && (
          <div className="flex flex-wrap gap-2 pt-1">
            {links.pubmed && (
              <a
                href={links.pubmed}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-primary-600 hover:text-primary-800"
              >
                PubMed <ExternalLink className="h-3 w-3" />
              </a>
            )}
            {links.doi && (
              <a
                href={links.doi}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-primary-600 hover:text-primary-800"
              >
                DOI <ExternalLink className="h-3 w-3" />
              </a>
            )}
            {links.pmc && (
              <a
                href={links.pmc}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-primary-600 hover:text-primary-800"
              >
                PMC <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
