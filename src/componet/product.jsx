"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ProductCard } from "@/componet/productGrid";
import { getAllProducts } from "@/lib/products";

const arrowClass = "size-10 border border-gray-300 bg-white text-black shadow-md hover:bg-gray-100 disabled:opacity-0";

export default function Main() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let cancelled = false;
    getAllProducts()
      .then((list) => {
        if (cancelled) return;
        setProducts(list.slice(60, 72));
        setStatus("ready");
      })
      .catch(() => !cancelled && setStatus("error"));
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section aria-label="Brand highlights" className="px-4 sm:px-10 pb-10">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-gray-400">Featured</p>
          <h2 className="mt-1 text-2xl sm:text-3xl font-medium text-gray-700 font-serif">Brand highlights</h2>
        </div>
        <Link href="/category/makeup" className="text-sm font-medium underline underline-offset-4 hover:text-gray-500">
          View all
        </Link>
      </div>

      {status === "error" ? (
        <p className="py-16 text-center text-gray-500">We couldn&apos;t load products right now. Please try again later.</p>
      ) : (
        <Carousel opts={{ align: "start", slidesToScroll: 1 }}>
          <CarouselContent className="-ml-4">
            {status === "loading"
              ? Array.from({ length: 4 }).map((_, i) => (
                  <CarouselItem key={i} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/4">
                    <div className="h-96 animate-pulse rounded-md bg-gray-100" />
                  </CarouselItem>
                ))
              : products.map((p) => (
                  <CarouselItem key={p.id} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/4">
                    <ProductCard id={p.id} name={p.name} img={p.image_link} price={p.price} />
                  </CarouselItem>
                ))}
          </CarouselContent>
          <CarouselPrevious className={`left-1 sm:-left-5 ${arrowClass}`} />
          <CarouselNext className={`right-1 sm:-right-5 ${arrowClass}`} />
        </Carousel>
      )}
    </section>
  );
}
