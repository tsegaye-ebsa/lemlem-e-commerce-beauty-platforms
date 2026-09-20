// Mega menu content. Every href points at a real route.
// Sub-links use /category/<slug>?type=<product_type>, which filters that category.
const cat = (slug, label, type) => ({
  label,
  href: type ? `/category/${slug}?type=${type}` : `/category/${slug}`,
});

const shopStore = {
  title: "Shop the store",
  links: [cat("makeup", "Makeup"), cat("face", "Face"), cat("body", "Body")],
};

export const menu = [
  {
    key: "promo",
    label: "Promo",
    href: "/promo",
    columns: [
      {
        title: "Offers",
        links: [
          { label: "Best picks under €10", href: "/promo" },
          { label: "2 free samples with every order", href: "/promo" },
          { label: "Free shipping from €35", href: "/promo" },
        ],
      },
      shopStore,
    ],
    feature: {
      title: "2 free samples",
      text: "Choose your favorites with every order.",
      href: "/promo",
      cta: "See offers",
      image: "/assets/slider1.jpg",
    },
  },
  {
    key: "new",
    label: "New",
    href: "/category/new",
    columns: [
      {
        title: "Just in",
        links: [
          cat("new", "New lipsticks", "lipstick"),
          cat("new", "New mascaras", "mascara"),
          cat("new", "New foundations", "foundation"),
          cat("new", "View all new arrivals"),
        ],
      },
      shopStore,
    ],
    feature: {
      title: "New arrivals",
      text: "The latest additions to the collection.",
      href: "/category/new",
      cta: "Discover",
      image: "/assets/slider2.jpg",
    },
  },
  {
    key: "brand",
    label: "Brand",
    href: "/about",
    columns: [
      {
        title: "lemlem.",
        links: [
          { label: "Our story", href: "/about" },
          { label: "Contact us", href: "/contact" },
        ],
      },
      shopStore,
    ],
    feature: {
      title: "Meet lemlem.",
      text: "Curated beauty from brands you love.",
      href: "/about",
      cta: "Our story",
      image: "/assets/slider3.jpg",
    },
  },
  {
    key: "perfumes",
    label: "Perfumes",
    href: "/category/perfumes",
    columns: [
      { title: "Fragrance", links: [cat("perfumes", "All perfumes")] },
      shopStore,
    ],
    feature: {
      title: "Signature scents",
      text: "Niche fragrances and gift caskets.",
      href: "/category/perfumes",
      cta: "Explore",
      image: "/assets/slider2.jpg",
    },
  },
  {
    key: "k-beauty",
    label: "K-Beauty",
    href: "/category/k-beauty",
    columns: [
      { title: "K-Beauty", links: [cat("k-beauty", "All K-Beauty")] },
      shopStore,
    ],
    feature: {
      title: "Glass-skin essentials",
      text: "Korean skincare and cosmetics.",
      href: "/category/k-beauty",
      cta: "Explore",
      image: "/assets/slider3.jpg",
    },
  },
  {
    key: "face",
    label: "Face",
    href: "/category/face",
    columns: [
      {
        title: "Complexion",
        links: [
          cat("face", "Foundation", "foundation"),
          cat("face", "Blush", "blush"),
          cat("face", "Bronzer", "bronzer"),
          cat("face", "View all face"),
        ],
      },
    ],
    feature: {
      title: "Flawless finish",
      text: "Foundation, blush and bronzer.",
      href: "/category/face",
      cta: "Shop face",
      image: "/assets/slider1.jpg",
    },
  },
  {
    key: "body",
    label: "Body",
    href: "/category/body",
    columns: [
      {
        title: "Body & nails",
        links: [cat("body", "Nail polish", "nail_polish"), cat("body", "View all body")],
      },
    ],
    feature: {
      title: "Finishing touches",
      text: "Care and color from head to toe.",
      href: "/category/body",
      cta: "Shop body",
      image: "/assets/slider2.jpg",
    },
  },
  {
    key: "hair",
    label: "Hair",
    href: "/category/hair",
    columns: [
      { title: "Hair", links: [cat("hair", "All hair")] },
      shopStore,
    ],
    feature: {
      title: "Hair care",
      text: "Treatments and styling for every hair type.",
      href: "/category/hair",
      cta: "Explore",
      image: "/assets/slider3.jpg",
    },
  },
  {
    key: "makeup",
    label: "Makeup",
    href: "/category/makeup",
    columns: [
      {
        title: "Lips",
        links: [cat("makeup", "Lipstick", "lipstick"), cat("makeup", "Lip liner", "lip_liner")],
      },
      {
        title: "Eyes",
        links: [
          cat("makeup", "Eyeshadow", "eyeshadow"),
          cat("makeup", "Eyeliner", "eyeliner"),
          cat("makeup", "Mascara", "mascara"),
          cat("makeup", "Eyebrow", "eyebrow"),
        ],
      },
      { title: "Discover", links: [cat("makeup", "View all makeup"), { label: "Promo", href: "/promo" }] },
    ],
    feature: {
      title: "Build your look",
      text: "Lips, eyes and brows.",
      href: "/category/makeup",
      cta: "Shop makeup",
      image: "/assets/slider1.jpg",
    },
  },
  {
    key: "sunscreen",
    label: "Sunscreen",
    href: "/category/sunscreen",
    columns: [
      { title: "Sun care", links: [cat("sunscreen", "All sunscreen")] },
      shopStore,
    ],
    feature: {
      title: "Daily protection",
      text: "Sunscreen that works under makeup.",
      href: "/category/sunscreen",
      cta: "Explore",
      image: "/assets/slider2.jpg",
    },
  },
];
