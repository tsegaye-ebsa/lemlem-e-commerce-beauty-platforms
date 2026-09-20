// Bolds every occurrence of a search word inside `text`.
const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export default function Highlight({ text, query }) {
  const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return text;
  const parts = text.split(new RegExp(`(${tokens.map(escape).join("|")})`, "i"));
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <mark key={i} className="bg-transparent font-semibold text-black">
        {part}
      </mark>
    ) : (
      part
    )
  );
}
