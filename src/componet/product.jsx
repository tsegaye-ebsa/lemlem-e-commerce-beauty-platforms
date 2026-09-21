"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { highlights } from "@/lib/highlights";

const arrow =
  "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gray-300 bg-white text-black shadow-sm transition hover:border-black hover:bg-black hover:text-white disabled:pointer-events-none disabled:opacity-40";

// Editorial "billboard" carousel: tall full-bleed photo cards with the brand and a call to action.
export default function BrandHighlights() {
  const [api, setApi] = useState(null);
  const thumbRef = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  // Called by the carousel once it is ready, then keeps our controls in sync.
  const handleApi = useCallback((embla) => {
    setApi(embla);
    // The progress thumb is as wide as the share of slides in view and moves with the scroll.
    const moveThumb = () => {
      const thumb = thumbRef.current;
      if (!thumb) return;
      const visible = Math.min(embla.rootNode().clientWidth / embla.containerNode().scrollWidth, 1);
      thumb.style.width = `${visible * 100}%`;
      thumb.style.left = `${Math.min(Math.max(embla.scrollProgress(), 0), 1) * (1 - visible) * 100}%`;
    };
    const sync = () => {
      setCanPrev(embla.canScrollPrev());
      setCanNext(embla.canScrollNext());
      moveThumb();
    };
    sync();
    embla.on("select", sync);
    embla.on("reInit", sync);
    embla.on("scroll", moveThumb);
  }, []);

  return (
    <section
      aria-label="Brand highlights"
      className="mx-4 mb-14 mt-4 rounded-[2rem] bg-gray-100 p-5 sm:mx-10 sm:p-8"
    >
      <div className="mb-7">
        <p className="text-xs uppercase tracking-[0.3em] text-gray-400">Featured</p>
        <h2 className="mt-1 font-serif text-2xl font-medium text-gray-700 sm:text-4xl">Brand highlights</h2>
      </div>

      <Carousel opts={{ align: "start" }} setApi={handleApi}>
        <CarouselContent className="-ml-4">
          {highlights.map((item, i) => (
            <CarouselItem key={item.brand} className="basis-[85%] pl-4 sm:basis-1/2 lg:basis-1/3">
              <Link
                href={item.href}
                className="group relative block aspect-[3/4] overflow-hidden rounded-3xl bg-gray-200 outline-offset-4"
              >
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 85vw"
                  style={{ objectPosition: item.position }}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/20" />

                <span className="absolute left-5 top-5 flex h-11 items-center rounded-full bg-white/90 px-5 shadow-md backdrop-blur">
                  <Image src={item.logo} alt={item.brand} width={96} height={32} className="h-6 w-auto max-w-24 object-contain" />
                </span>
                <span className="absolute right-6 top-6 font-serif text-sm text-white/70">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-7">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/70">{item.eyebrow}</p>
                  <h3 className="mt-2 font-serif text-3xl leading-tight">{item.title}</h3>
                  <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition group-hover:gap-3">
                    Shop {item.brand}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* The progress line bridges the cards and the arrows, all on the same panel. */}
      <div className="mt-7 flex items-center gap-5">
        <div className="relative h-1 flex-1 rounded-full bg-gray-300" aria-hidden="true">
          <span ref={thumbRef} className="absolute inset-y-0 left-0 w-1/4 rounded-full bg-black transition-[left] duration-150" />
        </div>
        <div className="flex items-center gap-2">
          <button type="button" aria-label="Previous" disabled={!canPrev} onClick={() => api?.scrollPrev()} className={arrow}>
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button type="button" aria-label="Next" disabled={!canNext} onClick={() => api?.scrollNext()} className={arrow}>
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
