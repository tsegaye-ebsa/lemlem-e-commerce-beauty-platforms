"use client";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useEffect, useState } from "react";

  
export default function Main() { 
 
    return (
      <>
      <div>
       <h1 className="text-3xl mx-10 mb-2  font-medium text-gray-700  font-serif ">BRAND HIGHLIGHTS</h1>
       </div>



       <Carousel className="mb-0" >
        <CarouselContent className="w-full flex " >
          
         <Product/>
         
         </CarouselContent>
         <CarouselPrevious/>
         <CarouselNext/>
         </Carousel>
         
         </>
    );
}