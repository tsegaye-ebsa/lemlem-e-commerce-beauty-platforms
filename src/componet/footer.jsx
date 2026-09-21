import Link from "next/link";
import { Check } from "lucide-react";
import TrustBar from "@/componet/trustBar";

// Edit these to match the store. Add { label, href } entries to SOCIALS to show social links.
const PAYMENT_METHODS = ["Visa", "Mastercard", "PayPal"];
const SHIPPING_INFO = ["Delivery within 3–6 days", "Free shipping from €35.00"];
const SAFE_SHOPPING = ["Secure payments", "Your data stays private"];
const SOCIALS = [];
const LEGAL = ["Privacy Contacts", "Right of withdrawal", "Conditions of sale", "Compliance & Whistleblowing", "Cookie settings"];

// Column heading with a short accent line underneath.
function Heading({ children }) {
  return (
    <div className="mb-5">
      <h2 className="text-sm font-bold text-gray-700">{children}</h2>
      <span aria-hidden="true" className="mt-2 block h-0.5 w-6 rounded-full bg-black" />
    </div>
  );
}

const textLink = "underline underline-offset-4 transition-colors hover:text-black";

export default function Footer() {
  return (
    <footer className="mt-auto bg-gray-100">
      <div>
        <div className="mx-auto max-w-7xl px-4 sm:px-10">
          {/* Store promises: the top row of the footer, as in the original layout */}
          <div className="py-8">
            <TrustBar />
          </div>
          <hr className="border-gray-300" />
        </div>

        {/* Four columns, as in the original layout */}
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-10 px-4 py-12 sm:px-10 md:grid-cols-4 md:gap-x-10 md:py-14">
          <div>
            <Heading>Payment methods</Heading>
            <ul className="flex flex-wrap gap-2">
              {PAYMENT_METHODS.map((m) => (
                <li key={m} className="rounded-md border border-gray-300 bg-white px-3 py-1 text-xs font-medium text-gray-600 shadow-sm">
                  {m}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <Heading>Shipping</Heading>
            <ul className="space-y-2 text-sm text-gray-500">
              {SHIPPING_INFO.map((line) => (
                <li key={line}>{line}</li>
              ))}
              <li>
                <Link href="/contact" className={textLink}>
                  Delivery questions?
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <Heading>Safe Shopping</Heading>
            <ul className="space-y-2">
              {SAFE_SHOPPING.map((line) => (
                <li key={line} className="flex items-center gap-2.5 text-sm text-gray-500">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
                    <Check className="h-3 w-3 text-gray-600" aria-hidden="true" />
                  </span>
                  {line}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <Heading>Follow lemlem.</Heading>
            {SOCIALS.length > 0 ? (
              <ul className="space-y-2 text-sm text-gray-500">
                {SOCIALS.map(({ label, href }) => (
                  <li key={label}>
                    <a href={href} target="_blank" rel="noopener noreferrer" className={textLink}>
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <>
                <p className="text-sm leading-relaxed text-gray-500">Questions or ideas? We&apos;d love to hear from you.</p>
                <Link
                  href="/contact"
                  className="mt-4 inline-block rounded-full bg-black px-6 py-2.5 text-sm font-medium text-white transition hover:bg-gray-700"
                >
                  Contact us
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Bottom bar: legal names on the left, copyright on the right */}
        <div className="border-t border-gray-300">
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 py-6 text-center text-sm text-gray-500 sm:px-10 md:flex-row md:justify-between md:text-left">
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 md:justify-start">
              {LEGAL.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p>©{new Date().getFullYear()} lemlem Italia S.p.A.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
