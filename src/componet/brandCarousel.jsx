"use client";
import Image from "next/image";
import { Carousel , CarouselItem, CarouselContent, CarouselPrevious, CarouselNext} from "@/components/ui/carousel";

export default function BrandCarousel() {
    return (
        <header>
            <Carousel className=" my-12 " >
  <CarouselContent className=" w-full h-10 relative  " >
   <CarouselItem className="basis-1/8"  >
   <Image src="/assets/channel.svg" alt="Slider Image 1" width={2000} height={1000} className=" w-full h-full object-contain" />
       </CarouselItem>
       <CarouselItem className="basis-1/8"  >
   <Image src="/assets/logo-dior-oggi.png" alt="Slider Image 1" width={2000} height={1000} className=" w-full h-full object-contain" />
       </CarouselItem>
       <CarouselItem className="basis-1/8">
    <Image src="/assets/laroche.png" alt="Slider Image 1" width={2000} height={1000} className=" w-full h-full object-contain" />
    </CarouselItem>
    <CarouselItem className="basis-1/8">
    <Image src="/assets/douglas.png" alt="Slider Image 1" width={2000} height={1000} className=" w-full h-full object-contain" />
    </CarouselItem>
    <CarouselItem className="basis-1/8"  >
   <Image src="/assets/channel.jpeg" alt="Slider Image 1" width={2000} height={1000} className=" w-full h-full object-contain" />
       </CarouselItem>
       <CarouselItem className="basis-1/8"  >
   <Image src="/assets/logo-dior-oggi.png" alt="Slider Image 1" width={2000} height={1000} className=" w-full h-full object-contain" />
       </CarouselItem>
       <CarouselItem className="basis-1/8">
    <Image src="/assets/laroche.png" alt="Slider Image 1" width={2000} height={1000} className=" w-full h-full object-contain" />
    </CarouselItem>
    <CarouselItem className="basis-1/8">
    <Image src="/assets/douglas.png" alt="Slider Image 1" width={2000} height={1000} className=" w-full h-full object-contain" />
    </CarouselItem><CarouselItem className="basis-1/5"  >
   <Image src="/assets/channel.jpeg" alt="Slider Image 1" width={2000} height={1000} className=" w-full h-full object-contain" />
       </CarouselItem>
       <CarouselItem className="basis-1/8"  >
   <Image src="/assets/logo-dior-oggi.png" alt="Slider Image 1" width={2000} height={1000} className=" w-full h-full object-contain" />
       </CarouselItem>
       <CarouselItem className="basis-1/8">
    <Image src="/assets/laroche.png" alt="Slider Image 1" width={2000} height={1000} className=" w-full h-full object-contain" />
    </CarouselItem>
    <CarouselItem className="basis-1/8">
    <Image src="/assets/douglas.png" alt="Slider Image 1" width={2000} height={1000} className=" w-full h-full object-contain" />
    </CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>
        </header>
    );

}