"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { useRef, useState } from "react";
import { menu } from "@/lib/menu";

const CLOSE_DELAY = 120;

export default function MegaMenu() {
  const [activeKey, setActiveKey] = useState(null);
  const timer = useRef(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileKey, setMobileKey] = useState(null);
  const active = menu.find((m) => m.key === activeKey);

  const open = (key) => {
    clearTimeout(timer.current);
    setActiveKey(key);
  };
  // Small delay so the pointer can cross the gap between the bar and the panel.
  const scheduleClose = () => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setActiveKey(null), CLOSE_DELAY);
  };
  const closeNow = () => {
    clearTimeout(timer.current);
    setActiveKey(null);
  };

  const closeMobile = () => {
    setMobileOpen(false);
    setMobileKey(null);
  };

  return (
    <>
    <div className="border-t border-gray-200 lg:hidden">
      <button
        type="button"
        aria-expanded={mobileOpen}
        aria-controls="mobile-menu"
        onClick={() => setMobileOpen((o) => !o)}
        className="flex w-full items-center gap-2 px-4 py-3 text-sm font-medium uppercase tracking-wide"
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        Menu
      </button>
      {mobileOpen && (
        <ul id="mobile-menu" className="max-h-[70vh] overflow-y-auto border-t border-gray-200">
          {menu.map((item) => {
            const expanded = mobileKey === item.key;
            return (
              <li key={item.key} className="border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <Link href={item.href} onClick={closeMobile} className="flex-1 px-4 py-3 text-sm font-medium uppercase tracking-wide">
                    {item.label}
                  </Link>
                  <button
                    type="button"
                    aria-expanded={expanded}
                    aria-label={`${expanded ? "Collapse" : "Expand"} ${item.label}`}
                    onClick={() => setMobileKey(expanded ? null : item.key)}
                    className="p-3"
                  >
                    <ChevronDown className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`} />
                  </button>
                </div>
                {expanded && (
                  <div className="space-y-4 bg-gray-50 px-4 py-4">
                    {item.columns.map((col) => (
                      <div key={col.title}>
                        <h3 className="mb-2 text-xs font-semibold uppercase tracking-widest text-gray-400">{col.title}</h3>
                        <ul className="space-y-2">
                          {col.links.map((link) => (
                            <li key={link.label}>
                              <Link href={link.href} onClick={closeMobile} className="text-sm text-gray-700">
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>

    <nav
      aria-label="Main"
      className="relative hidden border-t border-gray-200 lg:block"
      onMouseLeave={scheduleClose}
      onMouseEnter={() => clearTimeout(timer.current)}
      onKeyDown={(e) => e.key === "Escape" && closeNow()}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) closeNow();
      }}
    >
      <ul className="flex flex-wrap justify-center gap-x-6 xl:gap-x-8 px-10 text-base font-sans">
        {menu.map((item) => {
          const isActive = item.key === activeKey;
          return (
            <li key={item.key} onMouseEnter={() => open(item.key)}>
              <Link
                href={item.href}
                onFocus={() => open(item.key)}
                onClick={closeNow}
                aria-expanded={isActive}
                className={`group relative flex items-center gap-1 py-3 uppercase tracking-wide text-sm transition-colors ${
                  isActive ? "text-black" : "text-gray-600 hover:text-black"
                }`}
              >
                {item.label}
                <ChevronDown
                  className={`w-3 h-3 transition-transform duration-200 ${isActive ? "rotate-180" : ""}`}
                />
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-black transition-all duration-200 ${
                    isActive ? "w-full" : "w-0"
                  }`}
                />
              </Link>
            </li>
          );
        })}
      </ul>

      {active && (
        <div
          key={active.key}
          className="absolute left-0 right-0 top-full z-50 bg-white border-t border-gray-200 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200"
        >
          <div className="mx-auto max-w-6xl grid grid-cols-12 gap-8 px-10 py-8">
            <div
              className="col-span-7 grid gap-8"
              style={{ gridTemplateColumns: `repeat(${active.columns.length}, minmax(0, 1fr))` }}
            >
              {active.columns.map((col) => (
                <div key={col.title}>
                  <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400">
                    {col.title}
                  </h3>
                  <ul className="space-y-2">
                    {col.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          onClick={closeNow}
                          className="text-gray-700 hover:text-black hover:underline underline-offset-4"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <Link
              href={active.feature.href}
              onClick={closeNow}
              className="group col-span-5 relative block h-56 overflow-hidden rounded-md"
            >
              <Image
                src={active.feature.image}
                alt=""
                fill
                sizes="(min-width: 1152px) 480px, 40vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-0 p-5 text-white">
                <p className="text-2xl font-serif">{active.feature.title}</p>
                <p className="text-sm text-white/80">{active.feature.text}</p>
                <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium">
                  {active.feature.cta}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      )}
    </nav>
    </>
  );
}
