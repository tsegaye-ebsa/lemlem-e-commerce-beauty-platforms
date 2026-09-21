import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categoryTiles, moreCategories } from "@/lib/categoryTiles";

// Bento layout: the first tile is large, the last one is wide, the rest are square-ish.
const SIZES = [
  "col-span-2 aspect-[4/3] lg:row-span-2 lg:aspect-auto",
  "aspect-square lg:aspect-auto",
  "aspect-square lg:aspect-auto",
  "col-span-2 aspect-[2/1] lg:aspect-auto",
];

export default function CategoryTiles() {
  return (
    <section aria-label="Shop by category" className="mx-auto max-w-7xl px-4 pb-4 pt-2 sm:px-10">
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-gray-400">Explore</p>
        <h2 className="mt-2 font-serif text-3xl font-medium text-gray-700 sm:text-4xl">Shop by category</h2>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:h-[34rem] lg:grid-cols-4 lg:grid-rows-2">
        {categoryTiles.map((tile, i) => (
          <Link
            key={tile.title}
            href={tile.href}
            className={`group relative block overflow-hidden rounded-3xl bg-gray-200 ${SIZES[i] ?? "aspect-square"}`}
          >
            <Image
              src={tile.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              style={{ objectPosition: tile.position }}
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/10" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 text-white sm:p-6">
              <div>
                <h3 className="font-serif text-2xl leading-tight sm:text-3xl">{tile.title}</h3>
                <p className="mt-1 text-sm text-white/80">{tile.text}</p>
              </div>
              <span className={`${i === 1 || i === 2 ? "hidden sm:flex" : "flex"} h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-black transition group-hover:translate-x-1`}>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
        <span className="mr-1 text-sm text-gray-500">Also explore</span>
        {moreCategories.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="rounded-full border border-gray-300 bg-white px-4 py-1.5 text-sm text-gray-600 transition hover:border-black hover:bg-black hover:text-white"
          >
            {c.title}
          </Link>
        ))}
      </div>
    </section>
  );
}
