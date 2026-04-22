"use client";
import { Heart } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useLiked } from "@/componet/context";

export default function Main (){
    const [products,setProducts]= useState([])
    console.log(products)
    const {liked, setLiked} = useLiked();
  console.log(liked)
    useEffect(()=>{
               async function  GetProduct() {
                   const product = await fetch("http://makeup-api.herokuapp.com/api/v1/products.json");
                   const data = await product.json();
                   setProducts(data.sort(() => (0.5 - Math.random()).slice(0, 12))
                   )
               };
               GetProduct();
           },[]);

return (
    
    <div className="w-full  border-2 border-black grid grid-cols-5 gap-2 p-5  ">
    
         {products.map((x)=>(<Apps key={x.id} name={x.name}
            img={x.image_link}/>))}
          
    </div>
    
)
}



function Apps ({name, img }){
  const {liked, handelLiked } = useLiked();
  console.log(liked)
    return (
    
   <div>
    <div>
    <button onClick={()=>(handelLiked({name,img}))} ><Heart className="w-8 h-8 px-1 absolute righ shadow "/> </button>
    <img src={img} alt="" className="w-80 h-80 object-cover shadow" />
    </div>
    <p>{name}</p>
    </div>
    
    )
}