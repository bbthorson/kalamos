import Link from "next/link";
import type { PreventionPublication } from "@kalamos/compendium-data";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

export function PublicationCard({
  publication,
}: {
  publication: PreventionPublication;
}) {
  const primaryLink =
    publication.links.pubmed || publication.links.doi || publication.links.pmc;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <Link href={`/compendium/${publication.id}`}>
            <CardTitle className="text-lg leading-snug hover:text-primary-600 transition-colors cursor-pointer">
              {publication.title}
            </CardTitle>
          </Link>
          {primaryLink && (
            <a
              href={primaryLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-warm-400 hover:text-primary-600 shrink-0"
              aria-label="View publication"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
        <p className="text-sm text-warm-500">
          {publication.authors}
          {publication.publicationYear && ` (${publication.publicationYear})`}
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-wrap gap-1.5">
          {publication.publicationType && (
            <Badge variant="primary" className="text-xs">
              {publication.publicationType}
            </Badge>
          )}
          {publication.ehePillars.map((pillar) => (
            <Badge key={pillar} variant="outline" className="text-xs">
              {pillar}
            </Badge>
          ))}
        </div>
        {publication.keyOutcomes.length > 0 && (
          <p className="text-xs text-warm-500">
            <span className="font-medium">Outcomes:</span>{" "}
            {publication.keyOutcomes.join("; ")}
          </p>
        )}
        {publication.populations.length > 0 && (
          <p className="text-xs text-warm-500">
            <span className="font-medium">Population:</span>{" "}
            {publication.populations.join("; ")}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
