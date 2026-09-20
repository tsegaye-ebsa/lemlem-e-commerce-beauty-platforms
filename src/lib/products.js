const API = "https://makeup-api.herokuapp.com/api/v1/products.json";

let cache;

// Loads the full catalogue once per page session and shares it between callers.
export function getAllProducts() {
  if (!cache) {
    cache = fetch(API)
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then((list) => list.filter((p) => p.name && p.image_link))
      .catch((err) => {
        cache = undefined; // allow a retry after a failure
        throw err;
      });
  }
  return cache;
}

// Every word must appear in the name, brand or type. Names that start with the
// phrase rank first, then names that contain it.
export function searchProducts(products, query) {
  const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return [];
  const phrase = tokens.join(" ");
  const scored = [];
  for (const p of products) {
    const name = p.name.toLowerCase();
    const haystack = `${name} ${(p.brand || "").toLowerCase()} ${(p.product_type || "").replace(/_/g, " ")}`;
    if (!tokens.every((t) => haystack.includes(t))) continue;
    scored.push([name.startsWith(phrase) ? 2 : name.includes(phrase) ? 1 : 0, p]);
  }
  return scored.sort((a, b) => b[0] - a[0]).map(([, p]) => p);
}
