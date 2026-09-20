import Image from "next/image";

const brands = [
  { name: "Chanel", src: "/assets/channel.jpeg" },
  { name: "Dior", src: "/assets/logo-dior-oggi.png" },
  { name: "La Roche-Posay", src: "/assets/laroche.png" },
  { name: "Douglas", src: "/assets/douglas.png" },
];

// Enough repeats that one copy is wider than a large screen.
const row = Array.from({ length: 3 }, () => brands).flat();

function Logos({ hidden }) {
  return (
    <ul className="flex shrink-0 items-center gap-16 pr-16" aria-hidden={hidden || undefined}>
      {row.map((brand, i) => (
        <li key={i} className="shrink-0">
          <Image
            src={brand.src}
            alt={hidden ? "" : brand.name}
            width={160}
            height={64}
            className="h-14 w-40 object-contain grayscale opacity-60 transition duration-300 hover:grayscale-0 hover:opacity-100"
          />
        </li>
      ))}
    </ul>
  );
}

// Continuous, pause-on-hover logo strip. The second copy makes the loop seamless.
export default function BrandCarousel() {
  return (
    <section aria-label="Our brands" className="marquee my-12 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div className="animate-marquee flex w-max">
        <Logos />
        <Logos hidden />
      </div>
    </section>
  );
}
