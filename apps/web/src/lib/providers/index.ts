import { geocodeAddress } from "@/lib/geo";
import { searchFindTreatment } from "./findtreatment";
import {
  searchBehavioralHealthProviders,
  BEHAVIORAL_HEALTH_TAXONOMIES,
} from "./npi";
import type {
  Provider,
  ProviderSearchParams,
  ProviderSearchResult,
} from "@/types/provider";

export { BEHAVIORAL_HEALTH_TAXONOMIES } from "./npi";

/**
 * Unified provider search across FindTreatment.gov and NPI Registry.
 *
 * Accepts an address (geocoded automatically) or lat/lng coordinates.
 * Queries the requested sources in parallel and merges results.
 */
export async function searchProviders(
  params: ProviderSearchParams
): Promise<ProviderSearchResult> {
  const sources = params.sources ?? ["findtreatment", "npi"];

  // Resolve coordinates from address if needed
  let lat = params.lat;
  let lng = params.lng;
  let geocoded: ProviderSearchResult["geocoded"];

  if (params.address && (lat == null || lng == null)) {
    const geo = await geocodeAddress(params.address);
    if (!geo) {
      return {
        providers: [],
        page: 1,
        totalCount: 0,
        sources,
        geocoded: undefined,
      };
    }
    lat = geo.lat;
    lng = geo.lng;
    geocoded = {
      lat: geo.lat,
      lng: geo.lng,
      matchedAddress: geo.matchedAddress,
    };
  }

  const queries: Promise<{ providers: Provider[]; totalCount: number }>[] = [];

  if (sources.includes("findtreatment") && lat != null && lng != null) {
    queries.push(
      searchFindTreatment({
        lat,
        lng,
        radius: params.radius,
        type: params.type,
        stateCode: params.state,
        page: params.page,
        pageSize: params.pageSize,
      })
    );
  }

  if (sources.includes("npi")) {
    queries.push(
      searchBehavioralHealthProviders({
        state: params.state,
        taxonomyCodes: params.taxonomyCodes,
        limit: params.pageSize,
      })
    );
  }

  const results = await Promise.allSettled(queries);

  let providers: Provider[] = [];
  let totalCount = 0;

  for (const result of results) {
    if (result.status === "fulfilled") {
      providers = providers.concat(result.value.providers);
      totalCount += result.value.totalCount;
    }
  }

  // Deduplicate by id across sources
  const seen = new Set<string>();
  providers = providers.filter((p) => {
    const key = `${p.source}:${p.id}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return {
    providers,
    page: params.page ?? 1,
    totalCount,
    sources,
    geocoded,
  };
}
