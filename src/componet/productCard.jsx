"use client";
import { Check, Heart, ShoppingBag, Star } from "lucide-react";
import { useLiked } from "@/componet/context";
import ProductImage from "@/componet/productImage";

const label = (value) => (value ? value.replace(/_/g, " ") : "");

// One product: photo tile with favorite button and type badge, then brand, name, price,
// rating and an add-to-cart button that shows how many are already in the cart.
export default function ProductCard({ id, name, img, price, brand, type, rating }) {
  const { liked, cart, handelLiked, Handelcart } = useLiked();
  const isLiked = liked.some((x) => x.id === id);
  const qty = cart.find((c) => c.id === id)?.qty ?? 0;
  const amount = Number(price);
  const stars = Number(rating);

  return (
    <article className="group flex flex-col">
      <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-gray-50 transition-shadow duration-300 group-hover:shadow-xl">
        <ProductImage
          src={img}
          alt={name}
          className="h-full w-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
        />

        {type && (
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-gray-600 shadow-sm backdrop-blur">
            {label(type)}
          </span>
        )}

        <button
          type="button"
          onClick={() => handelLiked({ name, img, id, price })}
          aria-pressed={isLiked}
          aria-label={isLiked ? `Remove ${name} from favorites` : `Add ${name} to favorites`}
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur transition hover:scale-110"
        >
          <Heart className={`h-5 w-5 ${isLiked ? "animate-heart-pop fill-rose-500 text-rose-500" : "text-gray-600"}`} />
        </button>
      </div>

      <div className="mt-4 flex flex-1 flex-col px-1">
        <p className="h-4 truncate text-[11px] uppercase tracking-[0.2em] text-gray-400">{brand}</p>
        <h3 className="mt-1 line-clamp-2 min-h-10 text-sm font-medium leading-5 text-gray-800">{name}</h3>

        <div className="mt-2 flex items-center justify-between">
          <p className="font-semibold text-gray-900">{amount > 0 ? `€${amount.toFixed(2)}` : "Price on request"}</p>
          {stars > 0 && (
            <p className="flex items-center gap-1 text-xs text-gray-500" aria-label={`Rated ${stars.toFixed(1)} out of 5`}>
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
              {stars.toFixed(1)}
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={() => Handelcart({ name, img, id, price })}
          className={`mt-4 flex w-full items-center justify-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition ${
            qty > 0
              ? "border-black bg-black text-white hover:bg-gray-700"
              : "border-gray-300 hover:border-black hover:bg-black hover:text-white"
          }`}
        >
          {qty > 0 ? (
            <>
              <Check className="h-4 w-4" aria-hidden="true" /> In cart ({qty})
            </>
          ) : (
            <>
              <ShoppingBag className="h-4 w-4" aria-hidden="true" /> Add to cart
            </>
          )}
        </button>
      </div>
    </article>
  );
}

export function ProductSkeleton() {
  return (
    <div aria-hidden="true">
      <div className="aspect-[4/5] animate-pulse rounded-3xl bg-gray-100" />
      <div className="mt-4 space-y-2 px-1">
        <div className="h-3 w-1/3 animate-pulse rounded bg-gray-100" />
        <div className="h-4 w-4/5 animate-pulse rounded bg-gray-100" />
        <div className="h-4 w-1/4 animate-pulse rounded bg-gray-100" />
        <div className="mt-4 h-10 animate-pulse rounded-full bg-gray-100" />
      </div>
    </div>
  );
}

export const productGridClass = "grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-4";
