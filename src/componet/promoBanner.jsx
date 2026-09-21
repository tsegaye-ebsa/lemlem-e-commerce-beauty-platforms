import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Wide offer banner: the two things we promise on every order.
export default function PromoBanner() {
  return (
    <section aria-label="Current offer" className="mx-auto max-w-7xl px-4 pb-14 sm:px-10">
      <div className="relative overflow-hidden rounded-[2rem] bg-neutral-900 text-white">
        <Image src="/assets/slider2.jpg" alt="" fill sizes="(min-width: 1280px) 1200px, 100vw" className="object-cover object-[70%_50%] opacity-50 md:opacity-100" />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-900 via-neutral-900/60 to-transparent" />

        <div className="relative max-w-xl px-6 py-12 sm:px-12 sm:py-16 md:py-20">
          <p className="text-xs uppercase tracking-[0.3em] text-white/70">With every order</p>
          <h2 className="mt-3 text-balance font-serif text-4xl leading-tight sm:text-5xl">Two free samples, on us.</h2>
          <p className="mt-4 max-w-md text-white/80">
            Pick your favorites and we&apos;ll add two free samples to every order, with free shipping from €35.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/promo"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-medium text-black transition hover:bg-gray-200"
            >
              Shop offers
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
            <Link
              href="/category/new"
              className="rounded-full border border-white/70 px-7 py-3 text-sm font-medium transition hover:bg-white hover:text-black"
            >
              New arrivals
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
