"use client";
import { useEffect, useState } from "react";
import FilterSidebar, { SortSelect } from "@/componet/filterSidebar";
import ProductCard, { ProductSkeleton, productGridClass } from "@/componet/productCard";
import useProductFilters from "@/lib/useProductFilters";

const API = "https://makeup-api.herokuapp.com/api/v1/products.json";

// Fetches products for the given product types (or all products when `types`
// is omitted) and renders them as a filterable grid with favorite / add-to-cart actions.
export default function ProductGrid({ types, maxPrice, limit = 60, emptyMessage }) {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading");
  const noTypes = Boolean(types) && types.length === 0;
  const f = useProductFilters(products);

  useEffect(() => {
    if (noTypes) return;
    let cancelled = false;
    async function load() {
      try {
        const urls = types ? types.map((t) => `${API}?product_type=${t}`) : [API];
        const results = await Promise.all(
          urls.map(async (u) => {
            const res = await fetch(u);
            if (!res.ok) throw new Error(res.statusText);
            return res.json();
          })
        );
        if (cancelled) return;
        // Take turns between the fetched types so a type with many more results (e.g.
        // lipstick) doesn't crowd out the others before the list is even sliced to `limit`.
        const cleaned = results.map((list) => list.filter((p) => p.name && p.image_link));
        const merged = [];
        for (let i = 0; merged.length < limit && cleaned.some((l) => l[i]); i++) {
          for (const l of cleaned) if (l[i]) merged.push(l[i]);
        }
        let list = merged;
        if (maxPrice) list = list.filter((p) => Number(p.price) > 0 && Number(p.price) <= maxPrice);
        setProducts(list.slice(0, limit));
        setStatus("ready");
      } catch {
        if (!cancelled) setStatus("error");
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [types, noTypes, maxPrice, limit]);

  if (!noTypes && status === "loading") {
    return (
      <div className={`${productGridClass} mx-auto max-w-7xl px-4 py-10 sm:px-10`} aria-busy="true">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    );
  }
  if (status === "error") {
    return <p className="p-6 sm:p-10 text-center text-gray-500">We couldn&apos;t load products right now. Please try again later.</p>;
  }
  if (products.length === 0) {
    return (
      <p className="p-8 sm:p-20 text-center text-gray-500">
        {emptyMessage ?? "New products are arriving soon. Check back shortly."}
      </p>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-10">
      <div className="lg:flex lg:items-start lg:gap-10">
        <FilterSidebar f={f} resultCount={f.result.length} />

        <div className="min-w-0 flex-1">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              {f.result.length} product{f.result.length === 1 ? "" : "s"}
            </p>
            <div className="hidden lg:block">
              <SortSelect f={f} />
            </div>
          </div>

          {f.result.length === 0 ? (
            <p className="py-20 text-center text-gray-500">No products match these filters.</p>
          ) : (
            <div className={productGridClass}>
              {f.result.map((p) => (
                <ProductCard
                  key={p.id}
                  id={p.id}
                  name={p.name}
                  img={p.image_link}
                  price={p.price}
                  brand={p.brand}
                  type={p.product_type}
                  rating={p.rating}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
