"use client";
import { useMemo, useState } from "react";

export const SORTS = {
  relevance: "Relevance",
  "price-asc": "Price: low to high",
  "price-desc": "Price: high to low",
  rating: "Top rated",
  name: "Name A–Z",
};

const label = (v) => (v ? v.replace(/_/g, " ") : "Other");
const priceOf = (p) => Number(p.price) || 0;

// Derives filter facets (types/brands/price bounds) from a product list, holds the
// current filter + sort state, and returns the filtered, sorted result. Pure client-side:
// the caller has already fetched the full list, this only slices and orders it.
export default function useProductFilters(products) {
  const [types, setTypes] = useState([]);
  const [brands, setBrands] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [price, setPrice] = useState(null); // [min, max] once the user touches the slider
  const [sort, setSort] = useState("relevance");

  const facets = useMemo(() => {
    const typeCounts = new Map();
    const brandCounts = new Map();
    let max = 0;
    for (const p of products) {
      const t = label(p.product_type);
      typeCounts.set(t, (typeCounts.get(t) || 0) + 1);
      if (p.brand) brandCounts.set(p.brand, (brandCounts.get(p.brand) || 0) + 1);
      max = Math.max(max, priceOf(p));
    }
    const byCount = (a, b) => b[1] - a[1];
    return {
      types: [...typeCounts.entries()].sort(byCount).map(([value, count]) => ({ value, count })),
      brands: [...brandCounts.entries()].sort(byCount).map(([value, count]) => ({ value, count })),
      maxPrice: Math.ceil(max) || 100,
    };
  }, [products]);

  const range = useMemo(() => price ?? [0, facets.maxPrice], [price, facets.maxPrice]);

  const result = useMemo(() => {
    let list = products.filter((p) => {
      if (types.length && !types.includes(label(p.product_type))) return false;
      if (brands.length && !brands.includes(p.brand)) return false;
      if (minRating > 0 && !(Number(p.rating) >= minRating)) return false;
      const amount = priceOf(p);
      if (amount > 0 && (amount < range[0] || amount > range[1])) return false;
      return true;
    });
    const byPriceAsc = (a, b) => priceOf(a) - priceOf(b);
    if (sort === "price-asc") list = [...list].sort(byPriceAsc);
    else if (sort === "price-desc") list = [...list].sort((a, b) => byPriceAsc(b, a));
    else if (sort === "rating") list = [...list].sort((a, b) => (Number(b.rating) || 0) - (Number(a.rating) || 0));
    else if (sort === "name") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [products, types, brands, minRating, range, sort]);

  const activeCount = types.length + brands.length + (minRating > 0 ? 1 : 0) + (price ? 1 : 0);

  function reset() {
    setTypes([]);
    setBrands([]);
    setMinRating(0);
    setPrice(null);
    setSort("relevance");
  }

  function toggle(setFn, list, value) {
    setFn(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  }

  return {
    result,
    facets,
    sort,
    setSort,
    types,
    toggleType: (v) => toggle(setTypes, types, v),
    brands,
    toggleBrand: (v) => toggle(setBrands, brands, v),
    minRating,
    setMinRating,
    price: range,
    setPrice,
    activeCount,
    reset,
  };
}
