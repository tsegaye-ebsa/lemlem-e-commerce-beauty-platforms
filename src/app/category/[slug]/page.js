import { notFound } from "next/navigation";
import PageHeader from "@/componet/pageHeader";
import ProductGrid from "@/componet/productGrid";
import { categories } from "@/lib/categories";

export function generateStaticParams() {
  return Object.keys(categories).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = categories[slug];
  return { title: category ? `${category.title} | lemlem.` : "Not found" };
}

export default async function CategoryPage({ params, searchParams }) {
  const { slug } = await params;
  const { type } = await searchParams;
  const category = categories[slug];
  if (!category) notFound();

  // ?type= narrows the category to one product type (used by the mega menu).
  const types = category.types.includes(type) ? [type] : category.types;

  return (
    <>
      <PageHeader title={category.title} blurb={category.blurb} />
      <ProductGrid key={types.join()} types={types} />
    </>
  );
}
