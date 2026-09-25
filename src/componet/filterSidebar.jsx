"use client";
import { Check, ChevronDown, SlidersHorizontal, Star, X } from "lucide-react";
import { useId, useState } from "react";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { SORTS } from "@/lib/useProductFilters";

function Checkbox({ checked, onChange, label, count }) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-2 py-1.5 text-sm text-gray-600">
      <span className="flex items-center gap-2.5">
        <span className="relative flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded border border-gray-300 bg-white">
          <input
            type="checkbox"
            checked={checked}
            onChange={onChange}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          />
          {checked && (
            <span className="pointer-events-none absolute inset-0 flex items-center justify-center rounded bg-black text-white">
              <Check className="h-3 w-3" aria-hidden="true" />
            </span>
          )}
        </span>
        <span className="capitalize">{label}</span>
      </span>
      {typeof count === "number" && <span className="text-xs text-gray-400">{count}</span>}
    </label>
  );
}

function Section({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  return (
    <div className="border-b border-gray-200 py-5 first:pt-0 last:border-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={id}
        className="flex w-full items-center justify-between text-sm font-semibold text-gray-800"
      >
        {title}
        <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div id={id} className="mt-3">
          {children}
        </div>
      )}
    </div>
  );
}

const STARS = [4, 3, 2, 1];

// The actual filter controls, shared by the desktop sidebar and the mobile sheet.
function Filters({ f }) {
  return (
    <div>
      {f.facets.types.length > 0 && (
        <Section title="Product type">
          {f.facets.types.slice(0, 8).map(({ value, count }) => (
            <Checkbox key={value} label={value} count={count} checked={f.types.includes(value)} onChange={() => f.toggleType(value)} />
          ))}
        </Section>
      )}

      {f.facets.brands.length > 0 && (
        <Section title="Brand">
          <div className="max-h-56 space-y-0.5 overflow-y-auto pr-1">
            {f.facets.brands.slice(0, 20).map(({ value, count }) => (
              <Checkbox key={value} label={value} count={count} checked={f.brands.includes(value)} onChange={() => f.toggleBrand(value)} />
            ))}
          </div>
        </Section>
      )}

      <Section title="Price">
        <div className="px-0.5">
          <input
            type="range"
            min={0}
            max={f.facets.maxPrice}
            value={f.price[1]}
            onChange={(e) => f.setPrice([0, Number(e.target.value)])}
            className="w-full accent-black"
            aria-label="Maximum price"
          />
          <div className="mt-1 flex justify-between text-xs text-gray-500">
            <span>€0</span>
            <span className="font-medium text-gray-700">up to €{f.price[1]}</span>
            <span>€{f.facets.maxPrice}</span>
          </div>
        </div>
      </Section>

      <Section title="Rating">
        <div className="space-y-1.5">
          {STARS.map((n) => (
            <button
              key={n}
              type="button"
              aria-pressed={f.minRating === n}
              onClick={() => f.setMinRating(f.minRating === n ? 0 : n)}
              className={`flex w-full items-center gap-1.5 rounded-lg px-2 py-1 text-sm transition ${
                f.minRating === n ? "bg-gray-100 font-medium text-black" : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`h-3.5 w-3.5 ${i < n ? "fill-amber-400 text-amber-400" : "text-gray-300"}`} aria-hidden="true" />
              ))}
              <span>&amp; up</span>
            </button>
          ))}
        </div>
      </Section>
    </div>
  );
}

// Desktop: a sticky sidebar. Phones/tablets: a "Filters" button that opens a sheet, plus
// a sort dropdown, both in one toolbar above the grid.
export default function FilterSidebar({ f, resultCount }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="mb-6 flex items-center justify-between gap-3 lg:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-4 py-2 text-sm font-medium"
        >
          <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
          Filters
          {f.activeCount > 0 && (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1 text-[11px] text-white">
              {f.activeCount}
            </span>
          )}
        </button>
        <SortSelect f={f} />
      </div>

      {f.activeCount > 0 && (
        <div className="mb-6 flex flex-wrap items-center gap-2">
          {f.types.map((t) => (
            <Chip key={`t-${t}`} label={t} onRemove={() => f.toggleType(t)} />
          ))}
          {f.brands.map((b) => (
            <Chip key={`b-${b}`} label={b} onRemove={() => f.toggleBrand(b)} />
          ))}
          {f.minRating > 0 && <Chip label={`${f.minRating}★ & up`} onRemove={() => f.setMinRating(0)} />}
          {f.price[1] < f.facets.maxPrice && <Chip label={`Up to €${f.price[1]}`} onRemove={() => f.setPrice(null)} />}
          <button type="button" onClick={f.reset} className="text-sm text-gray-500 underline underline-offset-4 hover:text-black">
            Clear all
          </button>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden lg:sticky lg:top-24 lg:block lg:h-fit lg:w-64 lg:shrink-0">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-800">Filters</h2>
          {f.activeCount > 0 && (
            <button type="button" onClick={f.reset} className="text-xs text-gray-500 underline underline-offset-4 hover:text-black">
              Clear all
            </button>
          )}
        </div>
        <Filters f={f} />
      </aside>

      {/* Mobile / tablet sheet */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-80 max-w-[85vw] p-0">
          <SheetHeader className="flex-row items-center justify-between space-y-0 border-b border-gray-200 px-5 py-4">
            <SheetTitle className="text-base">Filters</SheetTitle>
          </SheetHeader>
          <div className="max-h-[calc(100dvh-8.5rem)] overflow-y-auto px-5 py-2">
            <Filters f={f} />
          </div>
          <div className="flex gap-3 border-t border-gray-200 p-4">
            <button type="button" onClick={f.reset} className="flex-1 rounded-full border border-gray-300 py-2.5 text-sm font-medium">
              Clear all
            </button>
            <SheetClose asChild>
              <button type="button" className="flex-1 rounded-full bg-black py-2.5 text-sm font-medium text-white">
                Show {resultCount} result{resultCount === 1 ? "" : "s"}
              </button>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

export function SortSelect({ f }) {
  return (
    <label className="inline-flex items-center gap-2 text-sm text-gray-600">
      <span className="hidden sm:inline">Sort</span>
      <select
        value={f.sort}
        onChange={(e) => f.setSort(e.target.value)}
        className="rounded-full border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-800 outline-none focus:border-black"
      >
        {Object.entries(SORTS).map(([value, text]) => (
          <option key={value} value={value}>
            {text}
          </option>
        ))}
      </select>
    </label>
  );
}

function Chip({ label, onRemove }) {
  return (
    <button
      type="button"
      onClick={onRemove}
      className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 py-1.5 pl-3 pr-2 text-xs font-medium capitalize text-gray-700 transition hover:bg-gray-200"
    >
      {label}
      <X className="h-3 w-3" aria-hidden="true" />
    </button>
  );
}
