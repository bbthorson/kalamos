import Link from "next/link";
import type { TreatmentIntervention } from "@/types/compendium";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

export function InterventionCard({
  intervention,
}: {
  intervention: TreatmentIntervention;
}) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <Link href={`/compendium/${intervention.id}`}>
            <CardTitle className="text-lg leading-snug hover:text-primary-600 transition-colors cursor-pointer">
              {intervention.name}
            </CardTitle>
          </Link>
          {intervention.publications[0]?.url && (
            <a
              href={intervention.publications[0].url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-warm-400 hover:text-primary-600 shrink-0"
              aria-label="View publication"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
        {intervention.efficacyRating && (
          <Badge variant="primary" className="w-fit text-xs">
            {intervention.efficacyRating}
          </Badge>
        )}
      </CardHeader>
      <CardContent className="space-y-3">
        {intervention.description && (
          <p className="text-sm text-warm-600 line-clamp-3">
            {intervention.description}
          </p>
        )}
        <div className="flex flex-wrap gap-1.5">
          {intervention.ehePillars.map((pillar) => (
            <Badge key={pillar} variant="outline" className="text-xs">
              {pillar}
            </Badge>
          ))}
          {intervention.populations.slice(0, 2).map((pop) => (
            <Badge key={pop} variant="default" className="text-xs">
              {pop.length > 40 ? pop.substring(0, 40) + "…" : pop}
            </Badge>
          ))}
        </div>
        {intervention.keyEffects.length > 0 && (
          <p className="text-xs text-warm-500">
            <span className="font-medium">Effects:</span>{" "}
            {intervention.keyEffects.join(", ")}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
