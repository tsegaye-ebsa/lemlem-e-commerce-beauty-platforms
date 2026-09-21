"use client";
import Link from "next/link";
import { ArrowRight, Heart, Minus, Plus, ShoppingBag, Trash2, Truck } from "lucide-react";
import { useLiked } from "@/componet/context";
import ProductImage from "@/componet/productImage";

const FREE_SHIPPING_FROM = 35;

const money = (n) => `€${n.toFixed(2)}`;
const unitPrice = (item) => Number(item.price) || 0;

export default function Cart() {
  const { cart } = useLiked();
  const count = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <main className="mx-auto w-full max-w-6xl px-4 sm:px-10 py-8 sm:py-12">
      <div className="mb-8 flex items-baseline gap-3">
        <h1 className="font-serif text-3xl sm:text-4xl font-medium text-gray-700">Shopping cart</h1>
        {count > 0 && (
          <span className="text-sm text-gray-500">
            {count} item{count === 1 ? "" : "s"}
          </span>
        )}
      </div>

      {cart.length === 0 ? <EmptyCart /> : <CartContent />}
    </main>
  );
}

function EmptyCart() {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-gray-300 px-6 py-20 text-center">
      <span className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
        <ShoppingBag className="h-9 w-9 text-gray-400" aria-hidden="true" />
      </span>
      <h2 className="mt-6 font-serif text-2xl text-gray-700">Your cart is empty</h2>
      <p className="mt-2 max-w-sm text-gray-500">
        Looks like you haven&apos;t added anything yet. Discover our latest arrivals and favorites.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/category/new" className="rounded-full bg-black px-7 py-3 text-sm font-medium text-white transition hover:bg-gray-700">
          Shop new arrivals
        </Link>
        <Link href="/feavorite" className="rounded-full border border-gray-300 px-7 py-3 text-sm font-medium transition hover:border-black">
          View favorites
        </Link>
      </div>
    </div>
  );
}

function CartContent() {
  const { cart, clearCart } = useLiked();
  const subtotal = cart.reduce((sum, item) => sum + unitPrice(item) * item.qty, 0);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px] lg:items-start">
      <section aria-label="Items in your cart">
        <ul className="space-y-4">
          {cart.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </ul>
        <div className="mt-6 flex items-center justify-between text-sm">
          <Link href="/category/makeup" className="font-medium underline underline-offset-4 hover:text-gray-500">
            ← Continue shopping
          </Link>
          <button type="button" onClick={clearCart} className="text-gray-500 underline underline-offset-4 hover:text-black">
            Clear cart
          </button>
        </div>
      </section>

      <Summary subtotal={subtotal} />
    </div>
  );
}

function CartItem({ item }) {
  const { liked, handelLiked, setQty, removeFromCart } = useLiked();
  const isLiked = liked.some((x) => x.id === item.id);
  const price = unitPrice(item);

  return (
    <li className="flex gap-4 rounded-2xl border border-gray-200 bg-white p-3 sm:gap-6 sm:p-4">
      <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-gray-50 sm:h-32 sm:w-32">
        <ProductImage src={item.img} alt={item.name} className="h-full w-full object-contain" />
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-between gap-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="line-clamp-2 text-sm font-medium text-gray-800 sm:text-base">{item.name}</h2>
            <p className="mt-1 text-sm text-gray-500">{price > 0 ? `${money(price)} each` : "Price on request"}</p>
          </div>
          <p className="shrink-0 text-base font-semibold sm:text-lg">{price > 0 ? money(price * item.qty) : "–"}</p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center rounded-full border border-gray-300">
            <button
              type="button"
              aria-label={`Decrease quantity of ${item.name}`}
              disabled={item.qty <= 1}
              onClick={() => setQty(item.id, item.qty - 1)}
              className="flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-8 text-center text-sm font-medium" aria-live="polite">
              {item.qty}
            </span>
            <button
              type="button"
              aria-label={`Increase quantity of ${item.name}`}
              onClick={() => setQty(item.id, item.qty + 1)}
              className="flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-gray-100"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          <div className="flex items-center gap-1 text-sm">
            <button
              type="button"
              aria-pressed={isLiked}
              aria-label={isLiked ? "Remove from favorites" : "Save to favorites"}
              onClick={() => handelLiked({ id: item.id, name: item.name, img: item.img, price: item.price })}
              className="flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-gray-100"
            >
              <Heart className={`h-5 w-5 ${isLiked ? "fill-red-500 text-red-500" : "text-gray-500"}`} />
            </button>
            <button
              type="button"
              onClick={() => removeFromCart(item.id)}
              className="inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-gray-500 transition hover:bg-gray-100 hover:text-black"
            >
              <Trash2 className="h-4 w-4" aria-hidden="true" />
              Remove
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}

function Summary({ subtotal }) {
  const remaining = Math.max(FREE_SHIPPING_FROM - subtotal, 0);
  const progress = Math.min((subtotal / FREE_SHIPPING_FROM) * 100, 100);
  const freeShipping = remaining === 0;

  return (
    <aside aria-label="Order summary" className="rounded-2xl border border-gray-200 bg-gray-50 p-6 lg:sticky lg:top-6">
      <h2 className="font-serif text-2xl text-gray-700">Order summary</h2>

      <div className="mt-5 rounded-xl bg-white p-4">
        <p className="flex items-center gap-2 text-sm text-gray-700">
          <Truck className="h-4 w-4 shrink-0" aria-hidden="true" />
          {freeShipping ? (
            <span className="font-medium">You&apos;ve unlocked free shipping!</span>
          ) : (
            <span>
              Add <span className="font-semibold">{money(remaining)}</span> more for free shipping
            </span>
          )}
        </p>
        <div
          role="progressbar"
          aria-label="Progress toward free shipping"
          aria-valuemin={0}
          aria-valuemax={FREE_SHIPPING_FROM}
          aria-valuenow={Math.min(subtotal, FREE_SHIPPING_FROM)}
          className="mt-3 h-2 overflow-hidden rounded-full bg-gray-200"
        >
          <div className="h-full rounded-full bg-black transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <dl className="mt-6 space-y-3 text-sm">
        <div className="flex justify-between">
          <dt className="text-gray-500">Subtotal</dt>
          <dd className="font-medium">{money(subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-gray-500">Shipping</dt>
          <dd className="font-medium">{freeShipping ? "Free" : "Calculated at checkout"}</dd>
        </div>
        <div className="flex items-baseline justify-between border-t border-gray-200 pt-4 text-base">
          <dt className="font-semibold">Total</dt>
          <dd className="text-xl font-semibold">{money(subtotal)}</dd>
        </div>
      </dl>

      {/* No payment backend yet, so checkout is shown but disabled rather than faked. */}
      <button
        type="button"
        disabled
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-black px-6 py-3.5 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        Proceed to checkout
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </button>
      <p className="mt-3 text-center text-xs text-gray-500">Online checkout isn&apos;t available yet.</p>

      <p className="mt-5 border-t border-gray-200 pt-4 text-center text-xs text-gray-500">
        2 free samples with every order · Delivery within 3–6 days
      </p>
    </aside>
  );
}
