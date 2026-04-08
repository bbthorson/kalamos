"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import type {
  TreatmentIntervention,
  PreventionPublication,
  CompendiumMetadata,
} from "@kalamos/compendium-data";
import { Search, X, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FilterPanel } from "./filter-panel";
import { InterventionCard } from "@/components/cards/intervention-card";
import { PublicationCard } from "@/components/cards/publication-card";
import { cn } from "@/lib/utils";

type Tab = "treatment" | "prevention";
type SortOption = "alpha" | "newest" | "efficacy";

const SORT_LABELS: Record<SortOption, string> = {
  alpha: "A \u2013 Z",
  newest: "Newest first",
  efficacy: "Efficacy",
};

// --- URL param helpers ---

function parseMulti(params: URLSearchParams, key: string): string[] {
  const val = params.get(key);
  if (!val) return [];
  return val.split(",").filter(Boolean);
}

function serializeFilters(
  filters: Record<string, string[]>,
  extra: Record<string, string>
): string {
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(extra)) {
    if (v) params.set(k, v);
  }
  for (const [k, v] of Object.entries(filters)) {
    if (v.length > 0) params.set(k, v.join(","));
  }
  const str = params.toString();
  return str ? `?${str}` : "";
}

// --- Main Component ---

interface CompendiumSearchProps {
  interventions: TreatmentIntervention[];
  publications: PreventionPublication[];
  metadata: CompendiumMetadata;
}

export function CompendiumSearch({
  interventions,
  publications,
  metadata,
}: CompendiumSearchProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Read initial state from URL
  const [tab, setTab] = useState<Tab>(
    (searchParams.get("tab") as Tab) || "treatment"
  );
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [sort, setSort] = useState<SortOption>(
    (searchParams.get("sort") as SortOption) || "alpha"
  );
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Filter state keyed by dimension
  const [filters, setFilters] = useState<Record<string, string[]>>(() => ({
    ehePillars: parseMulti(searchParams, "ehePillars"),
    efficacy: parseMulti(searchParams, "efficacy"),
    studyLocation: parseMulti(searchParams, "studyLocation"),
    duration: parseMulti(searchParams, "duration"),
    keyEffects: parseMulti(searchParams, "keyEffects"),
    keyOutcomes: parseMulti(searchParams, "keyOutcomes"),
    publicationType: parseMulti(searchParams, "publicationType"),
  }));

  // Push state to URL
  const pushUrl = useCallback(
    (
      newFilters: Record<string, string[]>,
      newTab: Tab,
      newQuery: string,
      newSort: SortOption
    ) => {
      const url = serializeFilters(newFilters, {
        tab: newTab === "treatment" ? "" : newTab,
        q: newQuery,
        sort: newSort === "alpha" ? "" : newSort,
      });
      router.replace(url || "?", { scroll: false });
    },
    [router]
  );

  function updateFilter(key: string, values: string[]) {
    const next = { ...filters, [key]: values };
    setFilters(next);
    pushUrl(next, tab, query, sort);
  }

  function clearAllFilters() {
    const next: Record<string, string[]> = {};
    for (const k of Object.keys(filters)) next[k] = [];
    setFilters(next);
    pushUrl(next, tab, query, sort);
  }

  function handleTabChange(t: Tab) {
    setTab(t);
    pushUrl(filters, t, query, sort);
  }

  function handleQueryChange(q: string) {
    setQuery(q);
    pushUrl(filters, tab, q, sort);
  }

  function handleSortChange(s: SortOption) {
    setSort(s);
    pushUrl(filters, tab, query, s);
  }

  // --- Derive unique option values ---
  const efficacyOptions = useMemo(
    () => [...new Set(interventions.map((i) => i.efficacyRating))].sort(),
    [interventions]
  );

  const studyLocationOptions = useMemo(
    () =>
      [...new Set(interventions.map((i) => i.studyLocation).filter(Boolean))] as string[],
    [interventions]
  );

  const durationOptions = useMemo(
    () =>
      [...new Set(interventions.map((i) => i.duration).filter(Boolean))] as string[],
    [interventions]
  );

  const keyEffectsOptions = useMemo(
    () => [...new Set(interventions.flatMap((i) => i.keyEffects))].sort(),
    [interventions]
  );

  const keyOutcomesOptions = useMemo(
    () => [...new Set(publications.flatMap((p) => p.keyOutcomes))].sort(),
    [publications]
  );

  const publicationTypeOptions = useMemo(
    () => [...new Set(publications.map((p) => p.publicationType))].sort(),
    [publications]
  );

  // --- Filter sections per tab ---
  const filterSections = useMemo(() => {
    const common = [
      {
        key: "ehePillars",
        title: "EHE Pillars",
        options: [...metadata.ehePillars],
        selected: filters.ehePillars,
      },
    ];

    if (tab === "treatment") {
      return [
        ...common,
        {
          key: "efficacy",
          title: "Efficacy Rating",
          options: efficacyOptions,
          selected: filters.efficacy,
        },
        {
          key: "studyLocation",
          title: "Study Location",
          options: studyLocationOptions,
          selected: filters.studyLocation,
        },
        {
          key: "duration",
          title: "Duration",
          options: durationOptions,
          selected: filters.duration,
        },
        {
          key: "keyEffects",
          title: "Key Effects",
          options: keyEffectsOptions,
          selected: filters.keyEffects,
        },
      ];
    }

    return [
      ...common,
      {
        key: "publicationType",
        title: "Publication Type",
        options: publicationTypeOptions,
        selected: filters.publicationType,
      },
      {
        key: "keyOutcomes",
        title: "Key Outcomes",
        options: keyOutcomesOptions,
        selected: filters.keyOutcomes,
      },
    ];
  }, [
    tab,
    filters,
    metadata.ehePillars,
    efficacyOptions,
    studyLocationOptions,
    durationOptions,
    keyEffectsOptions,
    keyOutcomesOptions,
    publicationTypeOptions,
  ]);

  // --- Filtered + sorted results ---
  const filteredInterventions = useMemo(() => {
    let results = interventions;
    const q = query.toLowerCase();

    if (q) {
      results = results.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q)
      );
    }
    if (filters.ehePillars.length > 0) {
      results = results.filter((i) =>
        filters.ehePillars.some((p) => i.ehePillars.includes(p as any))
      );
    }
    if (filters.efficacy.length > 0) {
      results = results.filter((i) =>
        filters.efficacy.includes(i.efficacyRating)
      );
    }
    if (filters.studyLocation.length > 0) {
      results = results.filter(
        (i) => i.studyLocation && filters.studyLocation.includes(i.studyLocation)
      );
    }
    if (filters.duration.length > 0) {
      results = results.filter(
        (i) => i.duration && filters.duration.includes(i.duration)
      );
    }
    if (filters.keyEffects.length > 0) {
      results = results.filter((i) =>
        filters.keyEffects.some((e) => i.keyEffects.includes(e))
      );
    }

    // Sort
    return [...results].sort((a, b) => {
      if (sort === "newest") {
        const aEnd = a.yearRange?.end ?? 0;
        const bEnd = b.yearRange?.end ?? 0;
        return bEnd - aEnd;
      }
      if (sort === "efficacy") {
        const order = ["Best Evidence", "Evidence-Based (EBI)", "EBI"];
        const aIdx = order.findIndex((o) => a.efficacyRating.includes(o));
        const bIdx = order.findIndex((o) => b.efficacyRating.includes(o));
        return (aIdx === -1 ? 99 : aIdx) - (bIdx === -1 ? 99 : bIdx);
      }
      return a.name.localeCompare(b.name);
    });
  }, [interventions, query, filters, sort]);

  const filteredPublications = useMemo(() => {
    let results = publications;
    const q = query.toLowerCase();

    if (q) {
      results = results.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.authors.toLowerCase().includes(q)
      );
    }
    if (filters.ehePillars.length > 0) {
      results = results.filter((p) =>
        filters.ehePillars.some((pil) => p.ehePillars.includes(pil as any))
      );
    }
    if (filters.publicationType.length > 0) {
      results = results.filter((p) =>
        filters.publicationType.includes(p.publicationType)
      );
    }
    if (filters.keyOutcomes.length > 0) {
      results = results.filter((p) =>
        filters.keyOutcomes.some((o) => p.keyOutcomes.includes(o))
      );
    }

    return [...results].sort((a, b) => {
      if (sort === "newest") {
        return (b.publicationYear ?? 0) - (a.publicationYear ?? 0);
      }
      return a.title.localeCompare(b.title);
    });
  }, [publications, query, filters, sort]);

  const resultCount =
    tab === "treatment"
      ? filteredInterventions.length
      : filteredPublications.length;

  return (
    <div className="flex gap-8">
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-4">
          <FilterPanel
            sections={filterSections}
            onChange={updateFilter}
            onClearAll={clearAllFilters}
          />
        </div>
      </aside>

      {/* Mobile filter drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-80 max-w-full bg-warm-50 shadow-xl overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-warm-200">
              <h3 className="text-sm font-semibold text-warm-900 font-[family-name:var(--font-heading)]">
                Filters
              </h3>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="p-1 text-warm-500 hover:text-warm-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <FilterPanel
              sections={filterSections}
              onChange={updateFilter}
              onClearAll={clearAllFilters}
              className="border-0 rounded-none shadow-none"
            />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 min-w-0">
        {/* Tabs */}
        <div className="flex items-center gap-1 mb-4 border-b border-warm-200">
          <button
            onClick={() => handleTabChange("treatment")}
            className={cn(
              "px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px",
              tab === "treatment"
                ? "border-primary-600 text-primary-700"
                : "border-transparent text-warm-500 hover:text-warm-700"
            )}
          >
            Treatment Interventions
          </button>
          <button
            onClick={() => handleTabChange("prevention")}
            className={cn(
              "px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px",
              tab === "prevention"
                ? "border-primary-600 text-primary-700"
                : "border-transparent text-warm-500 hover:text-warm-700"
            )}
          >
            Prevention Research
          </button>
        </div>

        {/* Search bar + controls */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-warm-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => handleQueryChange(e.target.value)}
              placeholder={
                tab === "treatment"
                  ? "Search interventions..."
                  : "Search publications..."
              }
              className="w-full rounded-md border border-warm-300 bg-white pl-9 pr-9 py-2 text-sm text-warm-800 placeholder:text-warm-400 focus:outline-2 focus:outline-offset-0 focus:outline-primary-500 focus:border-primary-500"
            />
            {query && (
              <button
                onClick={() => handleQueryChange("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-warm-400 hover:text-warm-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="flex gap-2">
            {/* Mobile filter toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </Button>

            {/* Sort dropdown */}
            <div className="relative">
              <select
                value={sort}
                onChange={(e) =>
                  handleSortChange(e.target.value as SortOption)
                }
                className="appearance-none rounded-md border border-warm-300 bg-white pl-3 pr-8 py-2 text-sm text-warm-700 focus:outline-2 focus:outline-offset-0 focus:outline-primary-500 focus:border-primary-500"
              >
                {Object.entries(SORT_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
              <ArrowUpDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-warm-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Result count */}
        <p className="text-sm text-warm-500 mb-4">
          {resultCount} {resultCount === 1 ? "result" : "results"}
        </p>

        {/* Results grid */}
        {tab === "treatment" ? (
          filteredInterventions.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {filteredInterventions.map((intervention) => (
                <InterventionCard
                  key={intervention.id}
                  intervention={intervention}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              message="No interventions match your filters."
              onClear={clearAllFilters}
            />
          )
        ) : filteredPublications.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {filteredPublications.map((publication) => (
              <PublicationCard
                key={publication.id}
                publication={publication}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            message="No publications match your filters."
            onClear={clearAllFilters}
          />
        )}
      </div>
    </div>
  );
}

function EmptyState({
  message,
  onClear,
}: {
  message: string;
  onClear: () => void;
}) {
  return (
    <div className="rounded-lg border border-warm-200 bg-white px-6 py-16 text-center">
      <p className="text-sm text-warm-500">{message}</p>
      <button
        onClick={onClear}
        className="mt-3 text-sm text-primary-600 hover:text-primary-800"
      >
        Clear all filters
      </button>
    </div>
  );
}
