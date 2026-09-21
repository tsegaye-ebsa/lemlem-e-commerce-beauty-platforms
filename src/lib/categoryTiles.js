// Image tiles for the "Shop by category" section on the home page.
//
// To use your own photography: put images in public/assets/categories/ and point each
// `image` at them, e.g. image: "/assets/categories/makeup.jpg". `position` is the CSS
// object-position used to crop the photo. The photos below are stand-ins from the sliders.
export const categoryTiles = [
  { title: "Makeup", text: "Lips, eyes and brows", href: "/category/makeup", image: "/assets/slider1.jpg", position: "50% 45%" },
  { title: "Face", text: "Foundation, blush, bronzer", href: "/category/face", image: "/assets/slider3.jpg", position: "70% 50%" },
  { title: "Body", text: "Nails and finishing touches", href: "/category/body", image: "/assets/slider2.jpg", position: "30% 50%" },
  { title: "New arrivals", text: "Just landed at lemlem.", href: "/category/new", image: "/assets/slider1.jpg", position: "50% 58%" },
];

// Smaller links under the tiles for categories that don't have a photo tile yet.
export const moreCategories = [
  { title: "Perfumes", href: "/category/perfumes" },
  { title: "K-Beauty", href: "/category/k-beauty" },
  { title: "Hair", href: "/category/hair" },
  { title: "Sunscreen", href: "/category/sunscreen" },
];
