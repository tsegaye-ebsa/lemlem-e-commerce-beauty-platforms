import Link from "next/link";
import { MapPin } from "lucide-react";
import PageHeader from "@/componet/pageHeader";

export const metadata = { title: "Find a store | lemlem." };

// Placeholder until store locations are available.
export default function StoresPage() {
  return (
    <>
      <PageHeader title="Find a store" blurb="Visit us in person and try before you buy." />
      <section className="mx-auto flex max-w-xl flex-col items-center px-4 py-16 text-center sm:px-10">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
          <MapPin className="h-7 w-7 text-gray-500" aria-hidden="true" />
        </span>
        <h2 className="mt-6 font-serif text-2xl text-gray-700">Store locator coming soon</h2>
        <p className="mt-2 text-gray-500">
          We&apos;re getting our store details ready. In the meantime our team can answer any question, and you can shop
          the full collection online.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/contact" className="rounded-full bg-black px-7 py-3 text-sm font-medium text-white transition hover:bg-gray-700">
            Contact us
          </Link>
          <Link href="/category/new" className="rounded-full border border-gray-300 px-7 py-3 text-sm font-medium transition hover:border-black">
            Shop new arrivals
          </Link>
        </div>
      </section>
    </>
  );
}
