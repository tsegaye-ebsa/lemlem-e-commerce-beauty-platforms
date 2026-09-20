"use client";
import Image from "next/image";
import Link from "next/link";
import { Pause, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const AUTOPLAY_MS = 6000;

const slides = [
  {
    image: "/assets/slider1.jpg",
    eyebrow: "New season",
    title: "New arrivals",
    text: "The latest lipsticks, mascaras and foundations, just landed.",
    primary: { label: "Shop new", href: "/category/new" },
    secondary: { label: "Shop makeup", href: "/category/makeup" },
  },
  {
    image: "/assets/slider2.jpg",
    eyebrow: "With every order",
    title: "2 free samples",
    text: "Choose your favorites, plus free shipping from €35.",
    primary: { label: "See offers", href: "/promo" },
  },
  {
    image: "/assets/slider3.jpg",
    eyebrow: "Beauty, curated",
    title: "Meet lemlem.",
    text: "Perfume, skincare and makeup from brands you love.",
    primary: { label: "Our story", href: "/about" },
    secondary: { label: "Shop face", href: "/category/face" },
  },
];

export default function Slider() {
  const [api, setApi] = useState(null);
  const [current, setCurrent] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [userPaused, setUserPaused] = useState(false);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  // Autoplay: pauses on hover/focus, when the user pauses, when the tab is hidden,
  // and never runs for people who prefer reduced motion.
  const playing = !hovered && !userPaused;
  useEffect(() => {
    if (!api || !playing) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => {
      if (!document.hidden) api.scrollNext();
    }, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [api, playing, current]);

  return (
    <section aria-label="Featured offers">
      <Carousel
        opts={{ loop: true }}
        setApi={setApi}
        className="group"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
      >
        <CarouselContent className="ml-0 h-[28rem] md:h-165">
          {slides.map((slide, i) => (
            <CarouselItem
              key={slide.title}
              className="relative pl-0"
              aria-label={`${i + 1} of ${slides.length}: ${slide.title}`}
            >
              <Image
                src={slide.image}
                alt=""
                fill
                sizes="100vw"
                priority={i === 0}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-center px-10 md:px-24 text-white">
                <p className="mb-3 text-xs md:text-sm uppercase tracking-[0.3em] text-white/80">{slide.eyebrow}</p>
                <h2 className="max-w-xl font-serif text-4xl md:text-6xl leading-tight">{slide.title}</h2>
                <p className="mt-4 max-w-md text-base md:text-lg text-white/85">{slide.text}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href={slide.primary.href}
                    className="rounded-full bg-white px-7 py-3 text-sm font-medium text-black transition hover:bg-gray-200"
                  >
                    {slide.primary.label}
                  </Link>
                  {slide.secondary && (
                    <Link
                      href={slide.secondary.href}
                      className="rounded-full border border-white/80 px-7 py-3 text-sm font-medium text-white transition hover:bg-white hover:text-black"
                    >
                      {slide.secondary.label}
                    </Link>
                  )}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="hidden md:inline-flex left-4 size-11 border-0 bg-white/80 text-black shadow-lg backdrop-blur hover:bg-white md:opacity-0 md:transition-opacity md:group-hover:opacity-100 focus-visible:opacity-100" />
        <CarouselNext className="hidden md:inline-flex right-4 size-11 border-0 bg-white/80 text-black shadow-lg backdrop-blur hover:bg-white md:opacity-0 md:transition-opacity md:group-hover:opacity-100 focus-visible:opacity-100" />

        <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3 rounded-full bg-black/35 px-4 py-2 backdrop-blur">
          <button
            type="button"
            onClick={() => setUserPaused((p) => !p)}
            aria-label={userPaused ? "Play slideshow" : "Pause slideshow"}
            className="text-white"
          >
            {userPaused ? <Play className="size-3.5 fill-white" /> : <Pause className="size-3.5 fill-white" />}
          </button>
          <div className="flex items-center gap-2" role="tablist" aria-label="Choose slide">
            {slides.map((slide, i) => (
              <button
                key={slide.title}
                type="button"
                role="tab"
                aria-selected={current === i}
                aria-label={`Go to slide ${i + 1}: ${slide.title}`}
                onClick={() => api?.scrollTo(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  current === i ? "w-8 bg-white" : "w-2 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </div>
      </Carousel>
    </section>
  );
}
