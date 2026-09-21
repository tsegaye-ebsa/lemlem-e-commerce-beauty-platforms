import Link from "next/link";
import { Gift, Headset, Package, Truck } from "lucide-react";

const ITEMS = [
  { icon: Truck, title: "Fast delivery", text: "Within 3–6 days" },
  { icon: Package, title: "Free shipping", text: "On orders from €35.00" },
  { icon: Gift, title: "2 free samples", text: "With every order" },
  { icon: Headset, title: "Friendly support", text: "Talk to our team", href: "/contact" },
];

// Row of store promises. It has no background or container of its own, so it sits inside the footer.
export default function TrustBar() {
  return (
    <section aria-label="Why shop with us">
      <ul className="grid grid-cols-2 gap-x-4 gap-y-6 lg:grid-cols-4 lg:gap-0">
        {ITEMS.map(({ icon: Icon, title, text, href }, i) => {
          const body = (
            <>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
                <Icon className="h-5 w-5 text-gray-600" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-gray-700">{title}</span>
                <span className="block text-sm text-gray-500">{text}</span>
              </span>
            </>
          );
          const cls = `flex items-center gap-3 lg:justify-center ${i > 0 ? "lg:border-l lg:border-gray-300" : ""}`;
          return (
            <li key={title}>
              {href ? (
                <Link href={href} className={`${cls} transition hover:opacity-70`}>
                  {body}
                </Link>
              ) : (
                <div className={cls}>{body}</div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
