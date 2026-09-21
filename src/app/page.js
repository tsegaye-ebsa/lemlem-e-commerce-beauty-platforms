import Slider from "@/componet/slider";
import BrandCarousel from "@/componet/brandCarousel";
import CategoryTiles from "@/componet/categoryTiles";
import BrandHighlights from "@/componet/product";
import ProductShowcase from "@/componet/allproduct";
import PromoBanner from "@/componet/promoBanner";
import BrandStory from "@/componet/brandStory";

export default function Home() {
  return (
    <div>
      <Slider />
      <BrandCarousel />
      <CategoryTiles />
      <BrandHighlights />
      <ProductShowcase />
      <PromoBanner />
      <BrandStory />
    </div>
  );
}
