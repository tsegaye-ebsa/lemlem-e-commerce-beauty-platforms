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

function Product(){
    
   const [products,setProducts]= useState([])
    useEffect(()=>{
           async function  GetProduct() {
               const product = await fetch("http://makeup-api.herokuapp.com/api/v1/products.json");
               const data = await product.json();
               const slicedData = data.slice(60, 72);
               setProducts(slicedData);
               console.log(data);
           };
           GetProduct();
       },[]);
       return (
           <>
           
          
         {products.map((result)=>(<Brand key={result.id} 
         name={result.name}
         price={result.price}
        image={result.image_link}
        description={result.description}
       

          />))}
     
           </>
       );
}
function Brand({name, price, image }){
  
    return(
      
    <CarouselItem className="basis-1/3 p-0 m-0"> 
      <div className="w-full h-150 flex flex-col border-grey border-2 justify-between">
      <div>
       <img src={image} className="w-full h-100 object-cover p-2" >
      </img>
      <img src="/assets/channel.jpeg" alt="" className="w-25 h-25 relative top-5 left-2 border-grey border-2 shadow-2xl" />
      </div>
      
      <div className=" border-y-2 h-100 border-white text-white bg-gray-700">
        <h2 className="p-5
         text-3xl text-white">{name}</h2>
        <h3 className="py-5">{price} euro</h3>
      </div>
      
      <div>
     
      </div>
     </div>
    
     </CarouselItem>
   
     
    );
}