import PageHeader from "@/componet/pageHeader";
import SearchResults from "@/componet/searchResults";

export async function generateMetadata({ searchParams }) {
  const { q } = await searchParams;
  return { title: q ? `“${q}” | Search | lemlem.` : "Search | lemlem." };
}

export default async function SearchPage({ searchParams }) {
  const { q } = await searchParams;
  const query = typeof q === "string" ? q : "";
  return (
    <>
      <PageHeader title={query ? `Results for “${query}”` : "Search"} />
      <SearchResults query={query} />
    </>
  );
}
