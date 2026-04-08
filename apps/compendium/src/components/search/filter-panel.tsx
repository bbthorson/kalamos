"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp, Search } from "lucide-react";

interface FilterSectionProps {
  title: string;
  options: string[];
  selected: string[];
  onChange: (values: string[]) => void;
  initialVisible?: number;
}

function FilterSection({
  title,
  options,
  selected,
  onChange,
  initialVisible = 5,
}: FilterSectionProps) {
  const [expanded, setExpanded] = useState(false);
  const [search, setSearch] = useState("");

  const filteredOptions = useMemo(() => {
    if (!search) return options;
    const q = search.toLowerCase();
    return options.filter((o) => o.toLowerCase().includes(q));
  }, [options, search]);

  const visibleOptions =
    expanded || filteredOptions.length <= initialVisible
      ? filteredOptions
      : filteredOptions.slice(0, initialVisible);

  const canExpand = filteredOptions.length > initialVisible && !search;
  const hiddenCount = filteredOptions.length - initialVisible;

  function toggle(value: string) {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  }

  return (
    <div className="border-b border-warm-200 py-4 last:border-b-0">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-semibold text-warm-800">{title}</h4>
        {selected.length > 0 && (
          <span className="text-xs font-medium text-primary-700 bg-primary-50 rounded-full px-2 py-0.5">
            {selected.length}
          </span>
        )}
      </div>

      {options.length > 5 && (
        <div className="relative mb-2">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-warm-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`Filter ${title.toLowerCase()}...`}
            className="w-full rounded border border-warm-200 bg-warm-50 pl-7 pr-2 py-1 text-xs text-warm-700 placeholder:text-warm-400 focus:outline-none focus:border-primary-400"
          />
        </div>
      )}

      <div className="space-y-1">
        {visibleOptions.map((option) => (
          <label
            key={option}
            className="flex items-start gap-2 cursor-pointer group py-0.5"
          >
            <input
              type="checkbox"
              checked={selected.includes(option)}
              onChange={() => toggle(option)}
              className="mt-0.5 h-3.5 w-3.5 rounded border-warm-300 text-primary-600 focus:ring-primary-500 shrink-0"
            />
            <span className="text-xs text-warm-700 leading-snug group-hover:text-warm-900">
              {option}
            </span>
          </label>
        ))}
      </div>

      {canExpand && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-1.5 flex items-center gap-1 text-xs text-primary-600 hover:text-primary-800"
        >
          {expanded ? (
            <>
              Show less <ChevronUp className="h-3 w-3" />
            </>
          ) : (
            <>
              Show {hiddenCount} more <ChevronDown className="h-3 w-3" />
            </>
          )}
        </button>
      )}
    </div>
  );
}

interface FilterPanelProps {
  sections: {
    key: string;
    title: string;
    options: string[];
    selected: string[];
  }[];
  onChange: (key: string, values: string[]) => void;
  onClearAll: () => void;
  className?: string;
}

export function FilterPanel({
  sections,
  onChange,
  onClearAll,
  className,
}: FilterPanelProps) {
  const totalSelected = sections.reduce(
    (sum, s) => sum + s.selected.length,
    0
  );

  return (
    <div className={cn("bg-white rounded-lg border border-warm-200", className)}>
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <h3 className="text-sm font-semibold text-warm-900 font-[family-name:var(--font-heading)]">
          Filters
        </h3>
        {totalSelected > 0 && (
          <button
            onClick={onClearAll}
            className="text-xs text-primary-600 hover:text-primary-800"
          >
            Clear all ({totalSelected})
          </button>
        )}
      </div>
      <div className="px-4 pb-2">
        {sections
          .filter((s) => s.options.length > 0)
          .map((section) => (
            <FilterSection
              key={section.key}
              title={section.title}
              options={section.options}
              selected={section.selected}
              onChange={(values) => onChange(section.key, values)}
            />
          ))}
      </div>
    </div>
  );
}
