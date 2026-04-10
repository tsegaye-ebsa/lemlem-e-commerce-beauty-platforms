"use client";

import { useEffect, useState } from "react";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
export default function Main() { 
    
    return (
        <>
         <div>
            <h2 className="text-3xl text-black font-thin py-10 ">BRAND HIGHLIGHTS</h2>
         </div>

       <div className="w-full  flex  flex-wrap justify-around items-start ">
         <Product/>
         </div>
         
        </>
    );
}

function Product(){
    const [products, setProducts] = useState([]);
   
    useEffect(()=>{
           async function  GetProduct() {
               const product = await fetch("http://makeup-api.herokuapp.com/api/v1/products.json");
               const data = await product.json();
               setProducts(data);
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
function Brand({name, price, image ,description}){
    return(
      
        <Card className="w-64   " >
        <CardHeader>
          <CardTitle>
          
          <img
  src={image}
  alt={name}
  className="w-full h-48 object-cover rounded-t-lg"
/>
            </CardTitle>
          <CardDescription>{name}</CardDescription>
          <CardAction>{price}</CardAction>
        </CardHeader>
        <CardContent>
          <p>{description}</p>
        </CardContent>
        <CardFooter>
          <p>Buy Now</p>
        </CardFooter>
      </Card>
     
    );
}