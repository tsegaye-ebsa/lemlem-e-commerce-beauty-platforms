"use client";
import { Sparkles } from "lucide-react";
import { useState } from "react";

// Product photo that falls back to a soft placeholder when the catalogue link is dead.
export default function ProductImage({ src, alt, className = "" }) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-rose-50 to-gray-100 text-rose-300"
      >
        <Sparkles className="h-8 w-8" aria-hidden="true" />
        <span className="text-[10px] uppercase tracking-[0.25em] text-gray-400">lemlem.</span>
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} onError={() => setFailed(true)} className={className} />
  );
}
