"use client";
import Link from "next/link";
import { ArrowRight, Check, Heart, ShoppingBag, Sparkles, Undo2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useLiked } from "@/componet/context";
import ProductImage from "@/componet/productImage";

const money = (n) => `€${n.toFixed(2)}`;
const priceOf = (item) => Number(item.price) || 0;

const SORTS = {
  recent: "Recently added",
  name: "Name A–Z",
  price: "Price: low to high",
};

export default function Favorites() {
  const { liked, cart, handelLiked, Handelcart } = useLiked();
  const [sort, setSort] = useState("recent");
  const [removed, setRemoved] = useState(null);

  // The undo toast disappears by itself after a few seconds.
  useEffect(() => {
    if (!removed) return;
    const timer = setTimeout(() => setRemoved(null), 5000);
    return () => clearTimeout(timer);
  }, [removed]);

  const items = useMemo(() => {
    const list = [...liked];
    if (sort === "recent") return list.reverse();
    if (sort === "name") return list.sort((a, b) => a.name.localeCompare(b.name));
    return list.sort((a, b) => priceOf(a) - priceOf(b));
  }, [liked, sort]);

  const inCart = (id) => cart.find((c) => c.id === id)?.qty ?? 0;
  const notInCart = liked.filter((x) => inCart(x.id) === 0);
  const totalValue = liked.reduce((sum, x) => sum + priceOf(x), 0);

  function remove(item) {
    handelLiked(item);
    setRemoved(item);
  }
  function undo() {
    handelLiked(removed);
    setRemoved(null);
  }

  return (
    <main>
      <section className="relative overflow-hidden border-b border-rose-100 bg-gradient-to-b from-rose-50 to-white">
        <Heart
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 -top-10 h-72 w-72 fill-rose-100 text-rose-100 sm:right-10"
        />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-10 py-12 sm:py-16">
          <p className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-rose-400">
            <Sparkles className="h-4 w-4" aria-hidden="true" /> Your wishlist
          </p>
          <h1 className="mt-3 font-serif text-4xl sm:text-5xl text-gray-700">Your favorites</h1>
          <p className="mt-3 max-w-md text-gray-500">
            {liked.length === 0
              ? "The pieces you fall in love with will live here."
              : `${liked.length} piece${liked.length === 1 ? "" : "s"} you love${
                  totalValue > 0 ? `, worth ${money(totalValue)} together` : ""
                }.`}
          </p>

          {liked.length > 0 && (
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                disabled={notInCart.length === 0}
                onClick={() => notInCart.forEach((x) => Handelcart(x))}
                className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-700 disabled:cursor-default disabled:bg-gray-300"
              >
                <ShoppingBag className="h-4 w-4" aria-hidden="true" />
                {notInCart.length === 0 ? "All in your cart" : `Add all to cart (${notInCart.length})`}
              </button>
              <label className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2.5 text-sm">
                <span className="text-gray-500">Sort</span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="bg-transparent font-medium outline-none"
                >
                  {Object.entries(SORTS).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-10 py-10 sm:py-14">
        {liked.length === 0 ? (
          <Empty />
        ) : (
          <ul className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-4">
            {items.map((item, i) => {
              const qty = inCart(item.id);
              const price = priceOf(item);
              return (
                <li
                  key={item.id}
                  style={{ animationDelay: `${Math.min(i, 12) * 50}ms`, animationFillMode: "backwards" }}
                  className="group animate-in fade-in slide-in-from-bottom-3 duration-500"
                >
                  <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-gray-50 transition-shadow duration-300 group-hover:shadow-xl">
                    <ProductImage
                      src={item.img}
                      alt={item.name}
                      className="h-full w-full object-contain p-6 transition-transform duration-500 group-hover:scale-110"
                    />
                    <span className="absolute left-4 top-4 font-serif text-sm text-gray-300">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <button
                      type="button"
                      onClick={() => remove(item)}
                      aria-label={`Remove ${item.name} from favorites`}
                      className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur transition hover:scale-110"
                    >
                      <Heart className="h-5 w-5 fill-rose-500 text-rose-500" />
                    </button>
                  </div>

                  <div className="mt-4 px-1">
                    <h2 className="line-clamp-2 min-h-10 text-sm font-medium text-gray-800">{item.name}</h2>
                    <p className="mt-1 text-sm text-gray-500">{price > 0 ? money(price) : "Price on request"}</p>
                    <button
                      type="button"
                      onClick={() => Handelcart(item)}
                      className={`mt-3 flex w-full items-center justify-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition ${
                        qty > 0
                          ? "border-black bg-black text-white hover:bg-gray-700"
                          : "border-gray-300 hover:border-black hover:bg-gray-50"
                      }`}
                    >
                      {qty > 0 ? (
                        <>
                          <Check className="h-4 w-4" aria-hidden="true" /> In cart ({qty}) · add another
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="h-4 w-4" aria-hidden="true" /> Add to cart
                        </>
                      )}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {removed && (
        <div
          role="status"
          className="fixed bottom-6 left-1/2 z-50 flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 items-center justify-between gap-4 rounded-full bg-gray-900 py-3 pl-5 pr-3 text-sm text-white shadow-2xl animate-in fade-in slide-in-from-bottom-4"
        >
          <span className="truncate">Removed “{removed.name}”</span>
          <button
            type="button"
            onClick={undo}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white px-4 py-1.5 font-medium text-black transition hover:bg-gray-200"
          >
            <Undo2 className="h-4 w-4" aria-hidden="true" /> Undo
          </button>
        </div>
      )}
    </main>
  );
}

function Empty() {
  const hearts = [
    { className: "left-2 top-6 h-10 w-10 text-rose-200", r: "-15deg", delay: "0s" },
    { className: "right-4 top-2 h-8 w-8 text-rose-300", r: "12deg", delay: "0.8s" },
    { className: "-left-4 bottom-8 h-7 w-7 text-rose-200", r: "20deg", delay: "1.6s" },
    { className: "right-0 bottom-4 h-12 w-12 text-rose-100", r: "-8deg", delay: "2.4s" },
  ];
  return (
    <div className="flex flex-col items-center py-10 text-center">
      <div className="relative flex h-44 w-44 items-center justify-center">
        {hearts.map((h, i) => (
          <Heart
            key={i}
            aria-hidden="true"
            style={{ "--r": h.r, animationDelay: h.delay }}
            className={`animate-float absolute fill-current ${h.className}`}
          />
        ))}
        <span className="flex h-24 w-24 items-center justify-center rounded-full bg-rose-50 ring-8 ring-rose-50/60">
          <Heart className="h-10 w-10 text-rose-400" aria-hidden="true" />
        </span>
      </div>
      <h2 className="mt-4 font-serif text-2xl text-gray-700">Nothing here yet</h2>
      <p className="mt-2 max-w-sm text-gray-500">
        Tap the heart on any product to save it. Your favorites are one click from your cart.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/category/new"
          className="group inline-flex items-center gap-2 rounded-full bg-black px-7 py-3 text-sm font-medium text-white transition hover:bg-gray-700"
        >
          Discover new arrivals
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </Link>
        <Link
          href="/category/makeup"
          className="rounded-full border border-gray-300 px-7 py-3 text-sm font-medium transition hover:border-black"
        >
          Browse makeup
        </Link>
      </div>
    </div>
  );
}
