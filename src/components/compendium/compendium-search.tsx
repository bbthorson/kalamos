"use client";

import { useState, useMemo } from "react";
import type {
  TreatmentIntervention,
  PreventionPublication,
  CompendiumMetadata,
} from "@/types/compendium";
import { InterventionCard } from "./intervention-card";
import { PublicationCard } from "./publication-card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, X, Filter, ChevronDown, ChevronUp } from "lucide-react";

type Tab = "treatment" | "prevention";

interface Props {
  treatments: TreatmentIntervention[];
  publications: PreventionPublication[];
  metadata: CompendiumMetadata;
}

function FilterSection({
  title,
  options,
  selected,
  onToggle,
}: {
  title: string;
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = search
    ? options.filter((o) => o.toLowerCase().includes(search.toLowerCase()))
    : options;
  const visible = expanded ? filtered : filtered.slice(0, 5);

  return (
    <div className="border-b border-warm-200 pb-3">
      <h3 className="text-sm font-medium text-warm-800 mb-2">{title}</h3>
      {options.length > 5 && (
        <input
          type="text"
          placeholder="Filter..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full text-xs border border-warm-200 rounded px-2 py-1 mb-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
        />
      )}
      <div className="space-y-1">
        {visible.map((option) => (
          <label
            key={option}
            className="flex items-start gap-2 text-xs text-warm-600 cursor-pointer hover:text-warm-900"
          >
            <input
              type="checkbox"
              checked={selected.includes(option)}
              onChange={() => onToggle(option)}
              className="mt-0.5 rounded border-warm-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="leading-snug">{option}</span>
          </label>
        ))}
      </div>
      {filtered.length > 5 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs text-primary-600 hover:text-primary-700 mt-1 flex items-center gap-1"
        >
          {expanded ? (
            <>
              Show less <ChevronUp className="h-3 w-3" />
            </>
          ) : (
            <>
              Show all {filtered.length} <ChevronDown className="h-3 w-3" />
            </>
          )}
        </button>
      )}
    </div>
  );
}

export function CompendiumSearch({
  treatments,
  publications,
  metadata,
}: Props) {
  const [tab, setTab] = useState<Tab>("treatment");
  const [query, setQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedEhePillars, setSelectedEhePillars] = useState<string[]>([]);
  const [selectedEffects, setSelectedEffects] = useState<string[]>([]);
  const [selectedOutcomes, setSelectedOutcomes] = useState<string[]>([]);
  const [selectedPubTypes, setSelectedPubTypes] = useState<string[]>([]);

  const toggleFilter = (
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    return (value: string) => {
      setter((prev) =>
        prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
      );
    };
  };

  const activeFilterCount =
    selectedEhePillars.length +
    selectedEffects.length +
    selectedOutcomes.length +
    selectedPubTypes.length;

  const clearFilters = () => {
    setSelectedEhePillars([]);
    setSelectedEffects([]);
    setSelectedOutcomes([]);
    setSelectedPubTypes([]);
    setQuery("");
  };

  const filteredTreatments = useMemo(() => {
    return treatments.filter((item) => {
      if (query) {
        const q = query.toLowerCase();
        if (
          !item.name.toLowerCase().includes(q) &&
          !item.description.toLowerCase().includes(q) &&
          !item.populations.some((p) => p.toLowerCase().includes(q)) &&
          !item.keyEffects.some((e) => e.toLowerCase().includes(q))
        ) {
          return false;
        }
      }
      if (
        selectedEhePillars.length &&
        !item.ehePillars.some((p) => selectedEhePillars.includes(p))
      )
        return false;
      if (
        selectedEffects.length &&
        !item.keyEffects.some((e) =>
          selectedEffects.some((f) => e.toLowerCase().includes(f.toLowerCase()))
        )
      )
        return false;
      return true;
    });
  }, [treatments, query, selectedEhePillars, selectedEffects]);

  const filteredPublications = useMemo(() => {
    return publications.filter((item) => {
      if (query) {
        const q = query.toLowerCase();
        if (
          !item.title.toLowerCase().includes(q) &&
          !item.authors.toLowerCase().includes(q) &&
          !item.populations.some((p) => p.toLowerCase().includes(q)) &&
          !item.keyOutcomes.some((o) => o.toLowerCase().includes(q))
        ) {
          return false;
        }
      }
      if (
        selectedEhePillars.length &&
        !item.ehePillars.some((p) => selectedEhePillars.includes(p))
      )
        return false;
      if (
        selectedOutcomes.length &&
        !item.keyOutcomes.some((o) =>
          selectedOutcomes.some((f) =>
            o.toLowerCase().includes(f.toLowerCase())
          )
        )
      )
        return false;
      if (
        selectedPubTypes.length &&
        !selectedPubTypes.includes(item.publicationType)
      )
        return false;
      return true;
    });
  }, [publications, query, selectedEhePillars, selectedOutcomes, selectedPubTypes]);

  const results = tab === "treatment" ? filteredTreatments : filteredPublications;
  const totalCount = tab === "treatment" ? treatments.length : publications.length;

  return (
    <div>
      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b border-warm-200">
        <button
          onClick={() => setTab("treatment")}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            tab === "treatment"
              ? "border-primary-600 text-primary-700"
              : "border-transparent text-warm-500 hover:text-warm-700"
          }`}
        >
          Treatment Interventions ({treatments.length})
        </button>
        <button
          onClick={() => setTab("prevention")}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            tab === "prevention"
              ? "border-primary-600 text-primary-700"
              : "border-transparent text-warm-500 hover:text-warm-700"
          }`}
        >
          Prevention Research ({publications.length})
        </button>
      </div>

      {/* Search bar */}
      <div className="flex gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-warm-400" />
          <input
            type="text"
            placeholder={
              tab === "treatment"
                ? "Search interventions by name, population, or effect..."
                : "Search publications by title, author, or outcome..."
            }
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-warm-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-warm-400 hover:text-warm-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <Button
          variant={showFilters ? "primary" : "outline"}
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2"
        >
          <Filter className="h-4 w-4" />
          Filters
          {activeFilterCount > 0 && (
            <span className="bg-primary-100 text-primary-700 rounded-full px-1.5 text-xs">
              {activeFilterCount}
            </span>
          )}
        </Button>
      </div>

      {/* Active filters */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {[
            ...selectedEhePillars.map((f) => ({ label: f, clear: () => toggleFilter(setSelectedEhePillars)(f) })),
            ...selectedEffects.map((f) => ({ label: f, clear: () => toggleFilter(setSelectedEffects)(f) })),
            ...selectedOutcomes.map((f) => ({ label: f, clear: () => toggleFilter(setSelectedOutcomes)(f) })),
            ...selectedPubTypes.map((f) => ({ label: f, clear: () => toggleFilter(setSelectedPubTypes)(f) })),
          ].map(({ label, clear }) => (
            <Badge
              key={label}
              variant="primary"
              className="flex items-center gap-1 cursor-pointer"
              onClick={clear}
            >
              {label}
              <X className="h-3 w-3" />
            </Badge>
          ))}
          <button
            onClick={clearFilters}
            className="text-xs text-warm-500 hover:text-warm-700"
          >
            Clear all
          </button>
        </div>
      )}

      <div className="flex gap-6">
        {/* Filter panel */}
        {showFilters && (
          <div className="w-64 shrink-0 space-y-3">
            <FilterSection
              title="EHE Pillars"
              options={[...metadata.ehePillars]}
              selected={selectedEhePillars}
              onToggle={toggleFilter(setSelectedEhePillars)}
            />
            {tab === "treatment" ? (
              <FilterSection
                title="Key Effects"
                options={metadata.effects}
                selected={selectedEffects}
                onToggle={toggleFilter(setSelectedEffects)}
              />
            ) : (
              <>
                <FilterSection
                  title="Key Outcomes"
                  options={metadata.outcomes}
                  selected={selectedOutcomes}
                  onToggle={toggleFilter(setSelectedOutcomes)}
                />
                <FilterSection
                  title="Publication Type"
                  options={metadata.publicationTypes}
                  selected={selectedPubTypes}
                  onToggle={toggleFilter(setSelectedPubTypes)}
                />
              </>
            )}
          </div>
        )}

        {/* Results */}
        <div className="flex-1">
          <p className="text-sm text-warm-500 mb-4">
            Showing {results.length} of {totalCount}{" "}
            {tab === "treatment" ? "interventions" : "publications"}
          </p>
          <div className="grid gap-4">
            {results.map((item) =>
              tab === "treatment" ? (
                <InterventionCard
                  key={(item as TreatmentIntervention).id}
                  intervention={item as TreatmentIntervention}
                />
              ) : (
                <PublicationCard
                  key={(item as PreventionPublication).id}
                  publication={item as PreventionPublication}
                />
              )
            )}
          </div>
          {results.length === 0 && (
            <div className="text-center py-12 text-warm-500">
              <p className="text-lg font-medium">No results found</p>
              <p className="text-sm mt-1">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
