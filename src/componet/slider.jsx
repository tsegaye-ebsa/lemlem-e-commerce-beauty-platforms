"use client";
import Image from "next/image";
import { Carousel , CarouselItem, CarouselContent, CarouselPrevious, CarouselNext} from "@/components/ui/carousel";


export default function Slider() {

    return (
       <header>
        <Carousel     >    
  <CarouselContent className=" h-165 relative  " >
    <CarouselItem  >
<Image src="/assets/slider1.jpg" alt="Slider Image 1" width={2000} height={1000} className=" w-full h-full object-cover" />
    </CarouselItem>
    <CarouselItem>
    <Image src="/assets/slider2.jpg" alt="Slider Image 2" width={2000} height={1000} className=" w-full h-full object-cover" />    
    </CarouselItem>
    <CarouselItem >
<Image src="/assets/slider3.jpg" alt="Slider Image 3" width={2000} height={1000} className=" w-full h-full object-cover" />
    </CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>
       </header>
    );
}