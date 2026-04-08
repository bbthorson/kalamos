import Link from "next/link";
import type { TreatmentIntervention } from "@kalamos/compendium-data";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const efficacyColors: Record<string, string> = {
  "Best Evidence": "bg-green-100 text-green-800",
  "Evidence-Based (EBI)": "bg-blue-100 text-blue-800",
  EBI: "bg-blue-100 text-blue-800",
};

function getEfficacyStyle(rating: string) {
  for (const [key, style] of Object.entries(efficacyColors)) {
    if (rating.includes(key)) return style;
  }
  return "bg-warm-100 text-warm-700";
}

interface InterventionCardProps {
  intervention: TreatmentIntervention;
}

export function InterventionCard({ intervention }: InterventionCardProps) {
  const {
    id,
    name,
    description,
    efficacyRating,
    ehePillars,
    populations,
    keyEffects,
  } = intervention;

  return (
    <Card className="flex flex-col hover:border-primary-300 transition-colors">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base leading-snug">
            <Link
              href={`/intervention/${id}`}
              className="hover:text-primary-700 transition-colors"
            >
              {name}
            </Link>
          </CardTitle>
          <Badge
            className={cn(
              "shrink-0 text-[11px] whitespace-nowrap",
              getEfficacyStyle(efficacyRating)
            )}
          >
            {efficacyRating}
          </Badge>
        </div>
        <p className="text-sm text-warm-600 line-clamp-3 mt-1">
          {description}
        </p>
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

        {/* Populations */}
        {populations.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {populations.slice(0, 2).map((pop) => (
              <Badge key={pop} variant="outline" className="text-[10px]">
                {pop}
              </Badge>
            ))}
            {populations.length > 2 && (
              <span className="text-[10px] text-warm-500 self-center">
                +{populations.length - 2} more
              </span>
            )}
          </div>
        )}

        {/* Key Effects */}
        {keyEffects.length > 0 && (
          <ul className="space-y-0.5">
            {keyEffects.slice(0, 3).map((effect) => (
              <li
                key={effect}
                className="text-xs text-warm-600 flex items-start gap-1.5"
              >
                <span className="text-primary-400 mt-1 shrink-0">&#8226;</span>
                <span className="line-clamp-1">{effect}</span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
