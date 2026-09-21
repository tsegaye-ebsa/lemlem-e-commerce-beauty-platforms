"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import ProductCard, { ProductSkeleton, productGridClass } from "@/componet/productCard";
import { getAllProducts } from "@/lib/products";

const SHOWN = 8;

// Chips that filter the home page products. "top" ranks by customer rating.
const TABS = [
  { key: "top", label: "Top rated", href: "/category/makeup" },
  { key: "lipstick", label: "Lipstick", href: "/category/makeup?type=lipstick" },
  { key: "foundation", label: "Foundation", href: "/category/face?type=foundation" },
  { key: "mascara", label: "Mascara", href: "/category/makeup?type=mascara" },
  { key: "blush", label: "Blush", href: "/category/face?type=blush" },
  { key: "eyeshadow", label: "Eyeshadow", href: "/category/makeup?type=eyeshadow" },
  { key: "nail_polish", label: "Nail polish", href: "/category/body?type=nail_polish" },
];

export default function ProductShowcase() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading");
  const [tab, setTab] = useState("top");

  useEffect(() => {
    let cancelled = false;
    getAllProducts()
      .then((list) => {
        if (cancelled) return;
        setProducts(list.filter((p) => Number(p.price) > 0));
        setStatus("ready");
      })
      .catch(() => !cancelled && setStatus("error"));
    return () => {
      cancelled = true;
    };
  }, []);

  const active = TABS.find((t) => t.key === tab);
  const shown = useMemo(() => {
    const byRating = (a, b) => (Number(b.rating) || 0) - (Number(a.rating) || 0);
    if (tab !== "top") {
      return products.filter((p) => p.product_type === tab).sort(byRating).slice(0, SHOWN);
    }
    // Best rated first, but take turns between product types so the row isn't all one kind.
    const groups = new Map();
    for (const p of [...products].filter((p) => Number(p.rating) > 0).sort(byRating)) {
      if (!groups.has(p.product_type)) groups.set(p.product_type, []);
      groups.get(p.product_type).push(p);
    }
    const picked = [];
    const lists = [...groups.values()];
    for (let round = 0; picked.length < SHOWN && lists.some((l) => l[round]); round++) {
      for (const l of lists) if (l[round] && picked.length < SHOWN) picked.push(l[round]);
    }
    return picked;
  }, [products, tab]);

  return (
    <section aria-label="Shop the collection" className="mx-auto max-w-7xl px-4 pb-14 sm:px-10">
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-gray-400">The edit</p>
        <h2 className="mt-2 font-serif text-3xl font-medium text-gray-700 sm:text-4xl">Shop the collection</h2>
        <p className="mx-auto mt-3 max-w-md text-gray-500">Handpicked favorites from across our range.</p>
      </div>

      <div
        role="group"
        aria-label="Filter products"
        className="-mx-4 mt-8 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0"
      >
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            aria-pressed={tab === t.key}
            onClick={() => setTab(t.key)}
            className={`shrink-0 rounded-full border px-5 py-2 text-sm font-medium transition ${
              tab === t.key
                ? "border-black bg-black text-white"
                : "border-gray-300 bg-white text-gray-600 hover:border-black hover:text-black"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-10" aria-live="polite">
        {status === "error" ? (
          <p className="py-16 text-center text-gray-500">We couldn&apos;t load products right now. Please try again later.</p>
        ) : status === "loading" ? (
          <div className={productGridClass} aria-busy="true">
            {Array.from({ length: SHOWN }).map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : shown.length === 0 ? (
          <p className="py-16 text-center text-gray-500">Nothing to show here yet. Try another category.</p>
        ) : (
          <div key={tab} className={`${productGridClass} animate-in fade-in duration-500`}>
            {shown.map((p) => (
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

      <div className="mt-12 text-center">
        <Link
          href={active.href}
          className="group inline-flex items-center gap-2 rounded-full border border-black px-8 py-3 text-sm font-medium transition hover:bg-black hover:text-white"
        >
          View all {active.key === "top" ? "makeup" : active.label.toLowerCase()}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
