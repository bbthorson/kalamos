import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Globe, Building2 } from "lucide-react";
import type { Provider } from "@/types/provider";

export function ProviderCard({ provider }: { provider: Provider }) {
  const address = provider.address;
  const addressLine = [address.street1, address.city, `${address.state} ${address.zip}`]
    .filter(Boolean)
    .join(", ");

  const servicesTags = [
    ...provider.services.typeOfCare.slice(0, 3),
    ...provider.services.specialPrograms.slice(0, 2),
  ];

  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-warm-900 text-sm">
                {provider.name}
              </h3>
              {provider.distance != null && (
                <Badge variant="primary" className="shrink-0">
                  {provider.distance.toFixed(1)} mi
                </Badge>
              )}
            </div>
            {provider.nameLine2 && (
              <p className="text-xs text-warm-500 mt-0.5">{provider.nameLine2}</p>
            )}
            {provider.facilityType && (
              <div className="flex items-center gap-1 mt-1 text-xs text-warm-500">
                <Building2 className="h-3 w-3 shrink-0" aria-hidden="true" />
                {provider.facilityType}
              </div>
            )}
          </div>
          <Badge variant="outline" className="shrink-0 text-xs">
            {provider.source === "findtreatment" ? "SAMHSA" : "NPI"}
          </Badge>
        </div>

        <div className="mt-3 space-y-1.5">
          <div className="flex items-start gap-2 text-sm text-warm-600">
            <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-warm-400" aria-hidden="true" />
            <span>{addressLine}</span>
          </div>

          {provider.phone && (
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 shrink-0 text-warm-400" aria-hidden="true" />
              <a
                href={`tel:${provider.phone}`}
                className="text-primary-600 hover:text-primary-700"
              >
                {provider.phone}
              </a>
            </div>
          )}

          {provider.website && (
            <div className="flex items-center gap-2 text-sm">
              <Globe className="h-4 w-4 shrink-0 text-warm-400" aria-hidden="true" />
              <a
                href={provider.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700 truncate"
              >
                {provider.website.replace(/^https?:\/\//, "").replace(/\/$/, "")}
              </a>
            </div>
          )}
        </div>

        {servicesTags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {servicesTags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-warm-100 text-warm-600 px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {provider.taxonomies.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {provider.taxonomies
              .filter((t) => t.primary)
              .slice(0, 2)
              .map((t) => (
                <span
                  key={t.code}
                  className="text-xs bg-primary-50 text-primary-700 px-2 py-0.5 rounded-full"
                >
                  {t.description}
                </span>
              ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
