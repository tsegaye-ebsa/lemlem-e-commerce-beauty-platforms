"use client";
import Image from "next/image";
import { Check, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { LoginForm, RegisterForm } from "@/componet/authForms";

const PANELS = {
  login: {
    image: "/assets/slider2.jpg",
    eyebrow: "Welcome back",
    title: "Your favorites are waiting.",
    text: "Sign in to pick up where you left off.",
  },
  register: {
    image: "/assets/slider1.jpg",
    eyebrow: "Join lemlem.",
    title: "Beauty, curated for you.",
    text: "Create an account and make lemlem. yours.",
  },
};
const PERKS = ["Save the products you love", "2 free samples with every order", "Free shipping from €35"];
const FIRST_FIELD = { login: "login-email", register: "register-first" };

function ModeTabs({ mode, onChange }) {
  return (
    <div role="tablist" aria-label="Sign in or create an account" className="relative mb-6 grid grid-cols-2 rounded-full bg-gray-100 p-1 text-sm font-medium">
      <span
        aria-hidden="true"
        className={`absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-white shadow transition-transform duration-300 ${
          mode === "register" ? "translate-x-full" : ""
        }`}
      />
      {[
        ["login", "Sign in"],
        ["register", "Create account"],
      ].map(([value, label]) => (
        <button
          key={value}
          type="button"
          role="tab"
          aria-selected={mode === value}
          onClick={() => onChange(value)}
          className={`relative z-10 rounded-full py-2 transition-colors ${mode === value ? "text-black" : "text-gray-500"}`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

// Modal sign in / sign up. The photo panel slides between the two halves of the card
// when the mode changes; both forms stay mounted so nothing typed is lost.
export default function AuthDialog({ mode, onModeChange, onClose }) {
  const ref = useRef(null);

  // A native <dialog> gives us focus trapping, Escape and an inert page behind it.
  useEffect(() => {
    const dialog = ref.current;
    if (dialog && !dialog.open) dialog.showModal();
    const previous = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = previous;
    };
  }, []);

  useEffect(() => {
    document.getElementById(FIRST_FIELD[mode])?.focus();
  }, [mode]);

  const isRegister = mode === "register";
  const formHalf = (active, side) =>
    `md:absolute md:inset-y-0 md:w-1/2 md:overflow-y-auto transition-opacity duration-500 ${side} ${
      active ? "opacity-100" : "pointer-events-none opacity-0 max-md:hidden"
    }`;

  return (
    <dialog
      ref={ref}
      aria-label={isRegister ? "Create an account" : "Sign in"}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      className="fixed inset-0 m-0 grid h-dvh max-h-none w-screen max-w-none place-items-center bg-transparent p-3 backdrop:bg-black/50 backdrop:backdrop-blur-md sm:p-6"
    >
      <div className="animate-in fade-in zoom-in-95 duration-300 relative max-h-[92dvh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white shadow-2xl md:h-[48rem] md:overflow-hidden">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-md transition hover:scale-110"
        >
          <X className="h-5 w-5" />
        </button>

        {/* sliding photo panel (desktop) */}
        <aside
          aria-hidden="true"
          className={`absolute inset-y-0 left-0 z-20 hidden w-1/2 overflow-hidden transition-transform duration-700 ease-[cubic-bezier(0.7,0,0.2,1)] md:block ${
            isRegister ? "translate-x-full" : ""
          }`}
        >
          {Object.entries(PANELS).map(([key, panel]) => (
            <div key={key} className={`absolute inset-0 transition-opacity duration-700 ${mode === key ? "opacity-100" : "opacity-0"}`}>
              <Image src={panel.image} alt="" fill sizes="448px" priority={key === "login"} className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10" />
              <div className="absolute inset-0 flex flex-col justify-between p-10 text-white">
                <span className="font-serif text-3xl font-bold">lemlem.</span>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/70">{panel.eyebrow}</p>
                  <p className="mt-3 font-serif text-4xl leading-tight">{panel.title}</p>
                  <p className="mt-3 text-sm text-white/80">{panel.text}</p>
                  <ul className="mt-6 space-y-2.5 text-sm">
                    {PERKS.map((perk) => (
                      <li key={perk} className="flex items-center gap-3">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 backdrop-blur">
                          <Check className="h-3 w-3" aria-hidden="true" />
                        </span>
                        {perk}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </aside>

        {/* Sign in sits on the right half, sign up on the left half */}
        <div inert={isRegister} className={formHalf(!isRegister, "md:left-1/2")}>
          <div className="px-6 pb-10 pt-16 sm:px-10 md:my-auto">
            <ModeTabs mode={mode} onChange={onModeChange} />
            <LoginForm onSwitch={() => onModeChange("register")} />
          </div>
        </div>
        <div inert={!isRegister} className={formHalf(isRegister, "md:left-0")}>
          <div className="px-6 pb-10 pt-16 sm:px-10">
            <ModeTabs mode={mode} onChange={onModeChange} />
            <RegisterForm onSwitch={() => onModeChange("login")} />
          </div>
        </div>
      </div>
    </dialog>
  );
}
