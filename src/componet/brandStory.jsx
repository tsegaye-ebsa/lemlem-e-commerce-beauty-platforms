import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, Sparkles, Tag } from "lucide-react";

const VALUES = [
  { icon: Sparkles, title: "Curated", text: "Every brand is chosen for quality, performance and honest ingredients." },
  { icon: Tag, title: "Accessible", text: "Fair prices, free shipping from €35 and two free samples with every order." },
  { icon: Heart, title: "Personal", text: "Our team is happy to help you find the right product, shade or scent." },
];

// Short "why lemlem." block that leads into the About page.
export default function BrandStory() {
  return (
    <section aria-label="Our story" className="mx-auto max-w-7xl px-4 pb-16 sm:px-10">
      <div className="grid items-center gap-10 rounded-[2rem] bg-gray-100 p-5 sm:p-8 md:grid-cols-2 md:gap-14 lg:p-10">
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl md:aspect-[4/5]">
          <Image src="/assets/slider3.jpg" alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover object-[60%_50%]" />
        </div>

        <div className="md:pr-4">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-400">Our story</p>
          <h2 className="mt-2 font-serif text-3xl font-medium text-gray-700 sm:text-4xl">Beauty, curated with care.</h2>
          <p className="mt-4 leading-relaxed text-gray-500">
            lemlem. started with a simple idea: shopping for beauty should feel as good as using it. We bring
            well-known houses and emerging labels together in one place, with clear information and fair prices.
          </p>

          <ul className="mt-8 space-y-5">
            {VALUES.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
                  <Icon className="h-5 w-5 text-gray-600" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
                  <p className="text-sm text-gray-500">{text}</p>
                </div>
              </li>
            ))}
          </ul>

          <Link
            href="/about"
            className="group mt-9 inline-flex items-center gap-2 rounded-full bg-black px-7 py-3 text-sm font-medium text-white transition hover:bg-gray-700"
          >
            Read our story
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
