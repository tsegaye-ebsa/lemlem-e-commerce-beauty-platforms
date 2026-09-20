"use client";
import { ArrowRight, Loader2, Search, SearchX } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import Highlight from "@/componet/highlight";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { getAllProducts, searchProducts } from "@/lib/products";

const MAX_SUGGESTIONS = 6;
const POPULAR = ["Lipstick", "Mascara", "Foundation", "Blush", "Nail polish"];

export default function SearchBar() {
  const router = useRouter();
  const id = useId();
  const rootRef = useRef(null);

  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("idle");

  const query = search.trim();
  const results = useMemo(() => searchProducts(products, query), [products, query]);
  const suggestions = results.slice(0, MAX_SUGGESTIONS);
  // Arrow keys move through the suggestions, then the "See all results" row.
  const rowCount = suggestions.length + (results.length > 0 ? 1 : 0);

  // The catalogue loads the first time the field is focused, not on every page view.
  function ensureLoaded() {
    if (status !== "idle") return;
    setStatus("loading");
    getAllProducts()
      .then((list) => {
        setProducts(list);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }

  // Close when clicking outside the search area.
  useEffect(() => {
    const onPointerDown = (e) => {
      if (!rootRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  function go(value) {
    const q = value.trim();
    if (!q) return;
    setOpen(false);
    setActive(-1);
    router.push(`/search?q=${encodeURIComponent(q)}`);
  }

  function onSubmit(e) {
    e.preventDefault();
    go(active >= 0 && active < suggestions.length ? suggestions[active].name : search);
  }

  function onKeyDown(e) {
    if (e.key === "Escape") {
      setOpen(false);
    } else if (e.key === "ArrowDown" && rowCount) {
      e.preventDefault();
      setOpen(true);
      setActive((i) => (i + 1) % rowCount);
    } else if (e.key === "ArrowUp" && rowCount) {
      e.preventDefault();
      setActive((i) => (i <= 0 ? rowCount - 1 : i - 1));
    }
  }

  const showPanel = open;

  return (
    <div ref={rootRef} className="relative w-full">
      <form role="search" onSubmit={onSubmit}>
        <InputGroup className="w-full py-3">
          <InputGroupInput
            placeholder="Search..."
            value={search}
            role="combobox"
            aria-label="Search products"
            aria-expanded={showPanel}
            aria-controls={`${id}-list`}
            aria-activedescendant={active >= 0 ? `${id}-opt-${active}` : undefined}
            aria-autocomplete="list"
            autoComplete="off"
            onChange={(e) => {
              setSearch(e.target.value);
              setActive(-1);
              setOpen(true);
            }}
            onFocus={() => {
              ensureLoaded();
              setOpen(true);
            }}
            onKeyDown={onKeyDown}
          />
          <InputGroupAddon className="  p-2 border-2 border-gray-300 bg-black rounded-md  ">
            <button type="submit" aria-label="Search">
              <Search className="w-5 h-5 text-white" />
            </button>
          </InputGroupAddon>
        </InputGroup>
      </form>
      {showPanel && (
        <div className="absolute left-0 right-0 top-full z-50 mt-1 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xl animate-in fade-in slide-in-from-top-1 duration-150">
          {query === "" ? (
            <div className="p-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400">Popular searches</p>
              <div className="flex flex-wrap gap-2">
                {POPULAR.map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => {
                      setSearch(term);
                      go(term);
                    }}
                    className="rounded-full border border-gray-300 px-4 py-1.5 text-sm text-gray-700 transition hover:border-black hover:bg-gray-50 hover:text-black"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : status === "error" ? (
            <p className="p-5 text-sm text-gray-500">Search is unavailable right now. Please try again later.</p>
          ) : status !== "ready" ? (
            <div className="flex items-center gap-2 p-5 text-sm text-gray-500">
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Searching…
            </div>
          ) : results.length === 0 ? (
            <div className="flex flex-col items-center px-5 py-8 text-center">
              <SearchX className="mb-2 h-8 w-8 text-gray-300" aria-hidden="true" />
              <p className="text-sm text-gray-700">
                No results for <span className="font-semibold text-black">“{query}”</span>
              </p>
              <p className="mt-1 text-xs text-gray-400">Check the spelling or try a brand or a product type.</p>
            </div>
          ) : (
            <div id={`${id}-list`} role="listbox" aria-label="Suggestions">
              <p className="px-5 pb-1 pt-4 text-xs font-semibold uppercase tracking-widest text-gray-400">
                Products
              </p>
              <ul role="presentation" className="max-h-96 overflow-y-auto pb-2">
                {suggestions.map((x, i) => (
                  <li
                    key={x.id}
                    id={`${id}-opt-${i}`}
                    role="option"
                    aria-selected={active === i}
                    onMouseEnter={() => setActive(i)}
                    onClick={() => go(x.name)}
                    className={`flex cursor-pointer items-center gap-4 px-5 py-2.5 transition-colors ${
                      active === i ? "bg-gray-100" : ""
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={x.image_link}
                      alt=""
                      className="h-12 w-12 shrink-0 rounded-md border border-gray-100 bg-white object-contain"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm text-gray-700">
                        <Highlight text={x.name} query={query} />
                      </p>
                      <p className="truncate text-xs capitalize text-gray-400">
                        {[x.brand, x.product_type?.replace(/_/g, " ")].filter(Boolean).join(" · ")}
                      </p>
                    </div>
                    {Number(x.price) > 0 && (
                      <span className="shrink-0 text-sm font-medium text-gray-900">{x.price} €</span>
                    )}
                  </li>
                ))}
              </ul>
              <div
                id={`${id}-opt-${suggestions.length}`}
                role="option"
                aria-selected={active === suggestions.length}
                onMouseEnter={() => setActive(suggestions.length)}
                onClick={() => go(search)}
                className={`flex cursor-pointer items-center justify-between border-t border-gray-100 px-5 py-3 text-sm font-medium transition-colors ${
                  active === suggestions.length ? "bg-gray-100" : "bg-gray-50"
                }`}
              >
                <span>
                  See all {results.length} result{results.length === 1 ? "" : "s"} for “{query}”
                </span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
