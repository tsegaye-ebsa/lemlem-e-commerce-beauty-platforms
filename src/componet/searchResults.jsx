"use client";
import { useEffect, useMemo, useState } from "react";
import FilterSidebar, { SortSelect } from "@/componet/filterSidebar";
import ProductCard, { productGridClass } from "@/componet/productCard";
import { getAllProducts, searchProducts } from "@/lib/products";
import useProductFilters from "@/lib/useProductFilters";

export default function SearchResults({ query }) {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let cancelled = false;
    getAllProducts()
      .then((list) => {
        if (cancelled) return;
        setProducts(list);
        setStatus("ready");
      })
      .catch(() => !cancelled && setStatus("error"));
    return () => {
      cancelled = true;
    };
  }, []);

  const matches = useMemo(() => searchProducts(products, query), [products, query]);
  const f = useProductFilters(matches);

  if (!query.trim()) return <p className="p-8 sm:p-20 text-center text-gray-500">Type something in the search bar to find products.</p>;
  if (status === "loading") return <p className="p-8 sm:p-20 text-center text-gray-500">Searching…</p>;
  if (status === "error") return <p className="p-8 sm:p-20 text-center text-gray-500">We couldn&apos;t load products right now. Please try again later.</p>;
  if (matches.length === 0) return <p className="p-8 sm:p-20 text-center text-gray-500">No results for “{query}”. Check the spelling or try a brand or product type.</p>;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-10">
      <div className="lg:flex lg:items-start lg:gap-10">
        <FilterSidebar f={f} resultCount={f.result.length} />

        <div className="min-w-0 flex-1">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              {f.result.length} result{f.result.length === 1 ? "" : "s"}
            </p>
            <div className="hidden lg:block">
              <SortSelect f={f} />
            </div>
          </div>

          {f.result.length === 0 ? (
            <p className="py-20 text-center text-gray-500">No products match these filters.</p>
          ) : (
            <div className={productGridClass}>
              {f.result.slice(0, 60).map((p) => (
                <ProductCard key={p.id} id={p.id} name={p.name} img={p.image_link} price={p.price} brand={p.brand} type={p.product_type} rating={p.rating} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
