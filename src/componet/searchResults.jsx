"use client";
import { useEffect, useMemo, useState } from "react";
import { ProductCard } from "@/componet/productGrid";
import { getAllProducts, searchProducts } from "@/lib/products";

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

  const results = useMemo(() => searchProducts(products, query), [products, query]);

  if (!query.trim()) return <p className="p-8 sm:p-20 text-center text-gray-500">Type something in the search bar to find products.</p>;
  if (status === "loading") return <p className="p-8 sm:p-20 text-center text-gray-500">Searching…</p>;
  if (status === "error") return <p className="p-8 sm:p-20 text-center text-gray-500">We couldn&apos;t load products right now. Please try again later.</p>;
  if (results.length === 0) return <p className="p-8 sm:p-20 text-center text-gray-500">No results for “{query}”. Check the spelling or try a brand or product type.</p>;

  return (
    <>
      <p className="px-4 sm:px-10 pt-8 text-sm text-gray-500">
        {results.length} result{results.length === 1 ? "" : "s"}
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 px-4 sm:px-10 pb-10 pt-4">
        {results.slice(0, 60).map((p) => (
          <ProductCard key={p.id} id={p.id} name={p.name} img={p.image_link} price={p.price} />
        ))}
      </div>
    </>
  );
}
