import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Heart,
  GraduationCap,
  Activity,
  ShieldAlert,
  Users,
  Home,
  ArrowRight,
} from "lucide-react";
import type { PopulationTheme } from "@/lib/compendium/population-themes";
import type { ReactNode } from "react";

const iconMap: Record<string, ReactNode> = {
  Heart: <Heart className="h-6 w-6" aria-hidden="true" />,
  GraduationCap: <GraduationCap className="h-6 w-6" aria-hidden="true" />,
  Activity: <Activity className="h-6 w-6" aria-hidden="true" />,
  ShieldAlert: <ShieldAlert className="h-6 w-6" aria-hidden="true" />,
  Users: <Users className="h-6 w-6" aria-hidden="true" />,
  Home: <Home className="h-6 w-6" aria-hidden="true" />,
};

export function EngagementProgramCard({ theme }: { theme: PopulationTheme }) {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <div className="text-primary-600 mb-2">{iconMap[theme.iconName]}</div>
        <CardTitle>{theme.label}</CardTitle>
        <Badge variant="primary" className="w-fit">
          {theme.interventionCount} engagement programs
        </Badge>
      </CardHeader>
      <CardContent className="flex flex-col flex-1 gap-4">
        <p className="text-sm text-warm-600">{theme.clinicDescription}</p>

        <div>
          <p className="text-xs font-medium text-warm-500 uppercase tracking-wide mb-1.5">
            Who this serves
          </p>
          <ul className="space-y-1">
            {theme.examplePopulations.map((pop) => (
              <li key={pop} className="text-sm text-warm-700 italic">
                {pop}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-medium text-warm-500 uppercase tracking-wide mb-1.5">
            Expected outcomes
          </p>
          <ul className="space-y-1">
            {theme.exampleEffects.map((effect) => (
              <li
                key={effect}
                className="text-sm text-warm-700 flex items-center gap-1.5"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-primary-400 shrink-0" />
                {effect}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto pt-2">
          <Link href="/compendium">
            <Button variant="outline" size="sm">
              View programs
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
