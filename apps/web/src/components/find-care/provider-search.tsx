"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProviderCard } from "./provider-card";
import { Search, Loader2, MapPin, AlertCircle } from "lucide-react";
import type { Provider, ProviderSearchResult } from "@/types/provider";

type SearchSource = "both" | "findtreatment" | "npi";

export function ProviderSearch() {
  const [address, setAddress] = useState("");
  const [source, setSource] = useState<SearchSource>("both");
  const [radius, setRadius] = useState(25);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<Provider[] | null>(null);
  const [resultMeta, setResultMeta] = useState<{
    total: number;
    matchedAddress: string | null;
  } | null>(null);

  const handleSearch = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!address.trim()) return;

      setLoading(true);
      setError(null);
      setResults(null);
      setResultMeta(null);

      const params = new URLSearchParams({
        address: address.trim(),
        radius: String(radius),
        pageSize: "50",
      });
      if (source !== "both") {
        params.set("sources", source);
      }

      try {
        const res = await fetch(`/api/v1/providers?${params}`);
        if (!res.ok) {
          const body = await res.json().catch(() => null);
          throw new Error(
            body?.error || `Search failed (${res.status})`
          );
        }
        const data: ProviderSearchResult = await res.json();
        setResults(data.providers);
        setResultMeta({
          total: data.totalCount,
          matchedAddress: data.geocoded?.matchedAddress || null,
        });
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    },
    [address, source, radius]
  );

  return (
    <div className="space-y-8">
      {/* Search Form */}
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-warm-400" aria-hidden="true" />
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter an address, city, or zip code"
              className="w-full pl-10 pr-4 py-2.5 rounded-md border border-warm-300 text-sm text-warm-900 placeholder:text-warm-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <Button type="submit" disabled={loading || !address.trim()}>
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            ) : (
              <Search className="h-4 w-4" aria-hidden="true" />
            )}
            {loading ? "Searching..." : "Search"}
          </Button>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <label htmlFor="radius" className="text-warm-600">
              Radius:
            </label>
            <select
              id="radius"
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
              className="rounded-md border border-warm-300 px-2 py-1 text-sm text-warm-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value={5}>5 miles</option>
              <option value={10}>10 miles</option>
              <option value={25}>25 miles</option>
              <option value={50}>50 miles</option>
              <option value={100}>100 miles</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-warm-600">Source:</span>
            <div className="flex gap-1">
              {(
                [
                  ["both", "All"],
                  ["findtreatment", "SAMHSA"],
                  ["npi", "NPI"],
                ] as const
              ).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setSource(value)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                    source === value
                      ? "bg-primary-100 text-primary-700"
                      : "bg-warm-100 text-warm-600 hover:bg-warm-200"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </form>

      {/* Error */}
      {error && (
        <div className="flex items-start gap-3 p-4 rounded-md bg-crisis-50 border border-crisis-200">
          <AlertCircle className="h-5 w-5 text-crisis-500 shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <p className="text-sm font-medium text-crisis-800">Search failed</p>
            <p className="text-sm text-crisis-600 mt-0.5">{error}</p>
          </div>
        </div>
      )}

      {/* Results */}
      {results !== null && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-warm-900">Results</h2>
              <Badge variant="outline">{resultMeta?.total ?? results.length}</Badge>
            </div>
            {resultMeta?.matchedAddress && (
              <p className="text-sm text-warm-500">
                Near {resultMeta.matchedAddress}
              </p>
            )}
          </div>

          {results.length === 0 ? (
            <div className="text-center py-12">
              <MapPin className="h-8 w-8 text-warm-300 mx-auto mb-3" aria-hidden="true" />
              <p className="text-warm-600">
                No providers found near this location. Try expanding your search
                radius or searching a different address.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {results.map((provider) => (
                <ProviderCard
                  key={`${provider.source}-${provider.id}`}
                  provider={provider}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
