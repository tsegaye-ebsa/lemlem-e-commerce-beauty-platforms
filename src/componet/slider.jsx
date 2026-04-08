"use client";
import Image from "next/image";
import { Carousel , CarouselItem, CarouselContent, CarouselPrevious, CarouselNext} from "@/components/ui/carousel";


export default function Slider() {

    return (
       <header>
        <Carousel className="w-full h-full ">    
  <CarouselContent >
    <CarouselItem>
<Image src="/assets/slider1.jpg" alt="Slider Image 1" width={10000} height={0} className="w-full h-100 object-cover" />
    </CarouselItem>
    <CarouselItem>
    <Image src="/assets/slider2.jpg" alt="Slider Image 2" width={100000} height={0} className="w-full h-100 object-cover" />    
    </CarouselItem>
    <CarouselItem>.
<Image src="/assets/slider3.jpg" alt="Slider Image 3" width={10000} height={10} className="w-full h-100 object-cover" />
    </CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>
       </header>
    );
}