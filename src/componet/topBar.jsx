"use client";
import Link from "next/link";
import { CircleHelp, Gift, MapPin, Package, Tag, Truck } from "lucide-react";
import { useEffect, useState } from "react";

const MESSAGES = [
  { icon: Gift, text: "2 free samples with every order" },
  { icon: Package, text: "Free shipping from €35.00" },
  { icon: Truck, text: "Delivery within 3–6 days" },
];
const ROTATE_MS = 4000;

// Quick links on the right; every one goes to a real page.
const LINKS = [
  { icon: MapPin, label: "Find Store", href: "/stores" },
  { icon: CircleHelp, label: "Help & Contact", href: "/contact" },
  { icon: Tag, label: "Offers", href: "/promo" },
];

// Offer bar: rotating store messages on the left, quick links on the right.
export default function TopBar() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % MESSAGES.length), ROTATE_MS);
    return () => clearInterval(timer);
  }, [paused]);

  // Side padding lines the bar up with the logo (left) and the icon row (right) below.
  return (
    <div className="flex items-center justify-center bg-gray-100 px-4 py-1 text-xs sm:text-sm text-center md:justify-between md:py-1.5 md:pl-11 md:pr-9">
      {/* All messages share one grid cell, so swapping them never shifts the layout. */}
      <div
        className="grid justify-items-center md:justify-items-start"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {MESSAGES.map(({ icon: Icon, text }, i) => (
          <h4
            key={text}
            aria-hidden={i !== index}
            className={`col-start-1 row-start-1 flex h-6 items-center gap-2 font-medium text-gray-700 transition-all duration-500 md:h-7 ${
              i === index ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-1 opacity-0"
            }`}
          >
            <Icon className="h-3.5 w-3.5 text-gray-500" aria-hidden="true" />
            {text}
          </h4>
        ))}
      </div>

      <nav aria-label="Help" className="hidden h-7 items-center text-sm md:flex">
        <div className="flex items-center gap-1">
          {LINKS.map(({ icon: Icon, label, href }) => (
            <Link
              key={href}
              href={href}
              className="inline-flex h-7 items-center gap-1.5 rounded-full px-3 text-gray-600 transition hover:bg-white hover:text-black hover:shadow-sm"
            >
              <Icon className="h-3.5 w-3.5" aria-hidden="true" />
              {label}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
