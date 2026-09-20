"use client";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { useLiked } from "@/componet/context";

const API = "https://makeup-api.herokuapp.com/api/v1/products.json";

// Fetches products for the given product types (or all products when `types`
// is omitted) and renders them as a grid with favorite / add-to-cart actions.
export default function ProductGrid({ types, maxPrice, limit = 40, emptyMessage }) {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading");
  const noTypes = Boolean(types) && types.length === 0;

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
        let list = results.flat().filter((p) => p.name && p.image_link);
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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-10" aria-busy="true">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-96 bg-gray-100 animate-pulse rounded-md" />
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
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-10">
      {products.map((p) => (
        <ProductCard key={p.id} id={p.id} name={p.name} img={p.image_link} price={p.price} />
      ))}
    </div>
  );
}

export function ProductCard({ id, name, img, price }) {
  const { liked, handelLiked, Handelcart } = useLiked();
  const isLiked = liked.some((x) => x.id === id);
  return (
    <div className="flex flex-col justify-between border border-gray-300 p-2 relative rounded-md">
      <div>
        <button
          onClick={() => handelLiked({ name, img, id })}
          aria-label={isLiked ? "Remove from favorites" : "Add to favorites"}
          className="absolute right-3 top-3 z-10 bg-white/80 rounded-full p-1"
        >
          <Heart className={`w-6 h-6 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
        </button>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={img} alt={name} className="w-full h-64 object-cover" />
      </div>
      <p className="mt-2 text-sm line-clamp-2">{name}</p>
      <p className="my-1 font-semibold">{Number(price) > 0 ? `${price} euro` : "Price on request"}</p>
      <button
        onClick={() => Handelcart({ name, img, id, price })}
        className="flex justify-center items-center border-gray-300 border-2 w-full h-10 rounded-md shadow hover:bg-gray-100"
      >
        Buy
      </button>
    </div>
  );
}
