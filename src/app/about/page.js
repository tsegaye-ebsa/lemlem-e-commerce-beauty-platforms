import Link from "next/link";
import PageHeader from "@/componet/pageHeader";

export const metadata = { title: "About | lemlem." };

const values = [
  ["Curated", "Every brand on lemlem. is chosen for quality, performance and honest ingredients."],
  ["Accessible", "Free shipping from €35.00 and two free samples with every order."],
  ["Personal", "Our team is happy to help you find the right product, shade or scent."],
];

export default function AboutPage() {
  return (
    <>
      <PageHeader title="About lemlem." blurb="A beauty store built around discovery: perfume, skincare and makeup from brands you love." />
      <section className="max-w-4xl mx-auto px-4 sm:px-10 py-8 sm:py-12 text-gray-700 leading-relaxed">
        <h2 className="text-2xl font-serif mb-4">Our story</h2>
        <p>
          lemlem. started with a simple idea: shopping for beauty should feel as good as using it. We bring together
          well-known houses and emerging labels in one place, with clear information and fair prices.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
          {values.map(([title, text]) => (
            <div key={title} className="border border-gray-300 rounded-md p-6">
              <h3 className="font-semibold mb-2">{title}</h3>
              <p className="text-sm text-gray-500">{text}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link href="/category/makeup" className="bg-black text-white px-6 py-2 rounded-md">Shop makeup</Link>
          <Link href="/contact" className="border-2 border-gray-300 px-6 py-2 rounded-md">Contact us</Link>
        </div>
      </section>
    </>
  );
}
