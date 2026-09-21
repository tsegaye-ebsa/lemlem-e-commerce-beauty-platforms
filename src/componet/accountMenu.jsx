"use client";
import { Check, User } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { useLiked } from "@/componet/context";

const PERKS = ["Save the products you love", "2 free samples with every order"];

// The single account entry point. Guests get sign in / create account here.
// Once real accounts exist, this is where the signed-in name and links would go.
export default function AccountMenu() {
  const { openAuth } = useLiked();
  const [open, setOpen] = useState(false);
  const [shift, setShift] = useState(0);
  const rootRef = useRef(null);
  const buttonRef = useRef(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e) => {
      if (!rootRef.current?.contains(e.target)) setOpen(false);
    };
    const onKeyDown = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  // Keep the panel fully on screen: right-aligned to the avatar, nudged in if it would overflow.
  function toggle() {
    if (!open) {
      const rect = buttonRef.current.getBoundingClientRect();
      const width = Math.min(288, window.innerWidth - 32);
      const rightEdge = Math.max(Math.min(rect.right, window.innerWidth - 16), 16 + width);
      setShift(rect.right - rightEdge);
    }
    setOpen((o) => !o);
  }

  const choose = (mode) => {
    setOpen(false);
    openAuth(mode);
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-label="Account"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        onClick={toggle}
        className={`flex h-9 w-9 items-center justify-center rounded-full border transition ${
          open ? "border-black bg-black text-white" : "border-gray-300 bg-gray-100 text-gray-700 hover:border-black hover:bg-white"
        }`}
      >
        <User className="h-4 w-4" aria-hidden="true" />
      </button>

      {open && (
        <div
          id={panelId}
          style={{ right: shift }}
          role="dialog"
          aria-label="Account"
          className="absolute top-full z-50 mt-3 w-72 max-w-[calc(100vw-2rem)] rounded-2xl border border-gray-200 bg-white p-5 shadow-2xl animate-in fade-in slide-in-from-top-1 duration-150"
        >
          <p className="font-serif text-xl text-gray-700">Welcome to lemlem.</p>
          <p className="mt-1 text-sm text-gray-500">Sign in to keep your favorites and your cart close.</p>

          <div className="mt-5 space-y-2">
            <button
              type="button"
              onClick={() => choose("login")}
              className="w-full rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-700"
            >
              Sign in
            </button>
            <button
              type="button"
              onClick={() => choose("register")}
              className="w-full rounded-full border border-gray-300 px-5 py-2.5 text-sm font-medium transition hover:border-black"
            >
              Create account
            </button>
          </div>

          <ul className="mt-5 space-y-2 border-t border-gray-100 pt-4 text-sm text-gray-500">
            {PERKS.map((perk) => (
              <li key={perk} className="flex items-center gap-2.5">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gray-100">
                  <Check className="h-3 w-3 text-gray-600" aria-hidden="true" />
                </span>
                {perk}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
