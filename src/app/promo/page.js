import PageHeader from "@/componet/pageHeader";
import ProductGrid from "@/componet/productGrid";

export const metadata = { title: "Promo | lemlem." };

const perks = [
  ["2 free samples", "with every order, at your choice"],
  ["Free shipping", "on orders from €35.00"],
  ["Delivery in 3–6 days", "tracked, across the country"],
];

export default function PromoPage() {
  return (
    <>
      <PageHeader title="Promo" blurb="Our best-value picks, all priced at €10 or less." />
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 sm:px-10 pt-6 sm:pt-10">
        {perks.map(([title, text]) => (
          <div key={title} className="border border-gray-300 rounded-md p-6 text-center">
            <h2 className="font-semibold text-lg">{title}</h2>
            <p className="text-gray-500">{text}</p>
          </div>
        ))}
      </section>
      <ProductGrid maxPrice={10} limit={24} emptyMessage="No promotions right now. Check back soon." />
    </>
  );
}
