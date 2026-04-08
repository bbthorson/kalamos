import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import {
  Search,
  ClipboardList,
  BookOpen,
  BarChart3,
  ArrowRight,
} from "lucide-react";
import type { ReactNode } from "react";

const iconMap: Record<string, ReactNode> = {
  Search: <Search className="h-7 w-7" aria-hidden="true" />,
  ClipboardList: <ClipboardList className="h-7 w-7" aria-hidden="true" />,
  BookOpen: <BookOpen className="h-7 w-7" aria-hidden="true" />,
  BarChart3: <BarChart3 className="h-7 w-7" aria-hidden="true" />,
};

export interface PlatformFeature {
  iconName: string;
  title: string;
  patientBenefit: string;
  description: string;
  href: string | null;
  linkLabel: string;
}

export function PlatformFeatureCard({ feature }: { feature: PlatformFeature }) {
  return (
    <Card className="flex flex-col h-full">
      <CardContent className="p-6 pt-6 flex flex-col flex-1 gap-3">
        <div className="w-14 h-14 rounded-full bg-primary-50 flex items-center justify-center text-primary-600">
          {iconMap[feature.iconName]}
        </div>
        <h3 className="text-lg font-semibold text-warm-900">
          {feature.title}
        </h3>
        <p className="text-sm font-medium text-primary-700">
          {feature.patientBenefit}
        </p>
        <p className="text-sm text-warm-600 flex-1">{feature.description}</p>
        {feature.href && (
          <div className="mt-auto pt-2">
            <Link
              href={feature.href}
              className="text-sm font-medium text-primary-600 hover:text-primary-700 inline-flex items-center gap-1"
            >
              {feature.linkLabel}
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
