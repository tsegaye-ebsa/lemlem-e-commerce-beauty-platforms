import Slider from "@/componet/slider";
import Bradnd from "@/componet/brandCarousel";
import Product from "@/componet/product";
import AllProduct from "@/componet/allproduct"
import Image from "next/image";

export default function Home() {
  return (
    <div >
     <Slider/>
     <Bradnd/>
     <Product/>
     <AllProduct/>
    </div>
  );
}
