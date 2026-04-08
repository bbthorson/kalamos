import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Clock, Shield, DollarSign, Users, BarChart3 } from "lucide-react";
import type { ReactNode } from "react";

const iconMap: Record<string, ReactNode> = {
  Clock: <Clock className="h-5 w-5 shrink-0 mt-0.5" aria-hidden="true" />,
  Shield: <Shield className="h-5 w-5 shrink-0 mt-0.5" aria-hidden="true" />,
  DollarSign: <DollarSign className="h-5 w-5 shrink-0 mt-0.5" aria-hidden="true" />,
  Users: <Users className="h-5 w-5 shrink-0 mt-0.5" aria-hidden="true" />,
  BarChart3: <BarChart3 className="h-5 w-5 shrink-0 mt-0.5" aria-hidden="true" />,
};

export interface BhiComparisonItem {
  iconName: string;
  text: string;
}

interface BhiComparisonProps {
  title: string;
  subtitle: string;
  withoutItems: BhiComparisonItem[];
  withItems: string[];
}

export function BhiComparison({
  title,
  subtitle,
  withoutItems,
  withItems,
}: BhiComparisonProps) {
  return (
    <section className="py-20 bg-warm-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-warm-900">{title}</h2>
          <p className="mt-4 text-lg text-warm-600">{subtitle}</p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="border-warm-300 bg-warm-100">
            <CardContent className="p-6 pt-6">
              <h3 className="text-lg font-semibold text-warm-500 mb-4">
                Without BHI
              </h3>
              <ul className="space-y-3">
                {withoutItems.map((item) => (
                  <li
                    key={item.text}
                    className="flex items-start gap-3 text-warm-500"
                  >
                    {iconMap[item.iconName] ?? (
                      <Clock
                        className="h-5 w-5 shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                    )}
                    <span className="text-sm">{item.text}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-primary-200 bg-primary-50">
            <CardContent className="p-6 pt-6">
              <h3 className="text-lg font-semibold text-primary-700 mb-4">
                With Kalamos
              </h3>
              <ul className="space-y-3">
                {withItems.map((text) => (
                  <li
                    key={text}
                    className="flex items-start gap-3 text-primary-700"
                  >
                    <CheckCircle
                      className="h-5 w-5 shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span className="text-sm">{text}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
