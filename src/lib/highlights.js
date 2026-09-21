// Billboard cards for the "Brand highlights" carousel on the home page.
//
// To use model photography: put the images in public/assets/models/ (portrait,
// ideally 1200x1600 or larger) and point each `image` at them, e.g.
//   image: "/assets/models/chanel.jpg"
// `position` is the CSS object-position used to crop the photo (focus on the face).
// The photos below are stand-ins taken from the existing slider images.
export const highlights = [
  {
    brand: "Chanel",
    logo: "/assets/channel.jpeg",
    image: "/assets/slider1.jpg",
    position: "50% 40%",
    eyebrow: "Fragrance & makeup",
    title: "Timeless elegance",
    href: "/category/perfumes",
  },
  {
    brand: "Dior",
    logo: "/assets/logo-dior-oggi.png",
    image: "/assets/slider2.jpg",
    position: "35% 50%",
    eyebrow: "Couture beauty",
    title: "The art of color",
    href: "/category/makeup",
  },
  {
    brand: "La Roche-Posay",
    logo: "/assets/laroche.png",
    image: "/assets/slider3.jpg",
    position: "70% 50%",
    eyebrow: "Skincare",
    title: "Gentle, everyday care",
    href: "/category/face",
  },
  {
    brand: "Douglas",
    logo: "/assets/douglas.png",
    image: "/assets/slider1.jpg",
    position: "50% 5%",
    eyebrow: "Editor's picks",
    title: "Beauty, your way",
    href: "/category/new",
  },
];
