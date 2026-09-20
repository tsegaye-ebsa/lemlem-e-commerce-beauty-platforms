"use client";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { useLiked } from "@/componet/context";

export default function Main (){
    const [products,setProducts]= useState([])
        useEffect(()=>{
               async function  GetProduct() {
                   const product = await fetch("https://makeup-api.herokuapp.com/api/v1/products.json");
                   const data = await product.json();
                   setProducts(data.slice(50, 60));
                   
               };
               GetProduct();
           },[]);

return (
    
    <div className="w-full border-2 border-black grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 p-3 sm:p-5">
    
         {products.map((x)=>(<Apps key={x.id} id={x.id} name={x.name} price={x.price}
            img={x.image_link}/>))}
          
    </div>
    
)
}



function Apps ({name, img , id ,price }){
  const {handelLiked , Handelcart} = useLiked();
    return (
    
   <div className="flex flex-col justify-between border-2 border-gray-300 p-2 relative">
    <div>
    <button onClick={()=>(handelLiked({name,img, id}))} ><Heart className="w-8 h-8 px-1 absolute right-0 shadow "/> </button>
    <img src={img} alt={name} className="w-full aspect-square object-cover shadow" />
    </div>
    <p>{name}</p>
    <p>{price} euro</p>
    <button onClick={()=>(Handelcart({name,img, id,price}))}  className="flex justify-center items-center  border-gray-300 border-2 w-full h-10 rounded-md shadow">
      <h2>Buy</h2>
    </button>
    </div>
    
    )
}