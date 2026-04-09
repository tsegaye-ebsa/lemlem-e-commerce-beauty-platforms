import Slider from "@/componet/slider";
import Bradnd from "@/componet/brandCarousel";
import Image from "next/image";

export default function Home() {
  return (
    <div >
     <Slider/>
     <Bradnd/>
     <div className="w-full h-200"></div>
    </div>
  );
}
