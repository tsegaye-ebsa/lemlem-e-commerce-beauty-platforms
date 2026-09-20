// Maps store categories to product types in the makeup API.
// Categories with no matching types show an "arriving soon" state.
export const categories = {
  new: {
    title: "New Arrivals",
    blurb: "The latest additions to the lemlem. collection.",
    types: ["lipstick", "mascara", "foundation"],
  },
  perfumes: {
    title: "Perfumes",
    blurb: "Signature scents, niche fragrances and gift caskets.",
    types: [],
  },
  "k-beauty": {
    title: "K-Beauty",
    blurb: "Korean skincare and cosmetics, from glass-skin essentials to cushion compacts.",
    types: [],
  },
  face: {
    title: "Face",
    blurb: "Foundation, blush and bronzer for a flawless finish.",
    types: ["foundation", "blush", "bronzer"],
  },
  body: {
    title: "Body",
    blurb: "Care and finishing touches for the body.",
    types: ["nail_polish"],
  },
  hair: {
    title: "Hair",
    blurb: "Treatments and styling for every hair type.",
    types: [],
  },
  makeup: {
    title: "Makeup",
    blurb: "Lips, eyes and brows: everything to build your look.",
    types: ["lipstick", "eyeshadow", "eyeliner", "mascara", "eyebrow", "lip_liner"],
  },
  sunscreen: {
    title: "Sunscreen",
    blurb: "Daily protection that works under makeup.",
    types: [],
  },
};
