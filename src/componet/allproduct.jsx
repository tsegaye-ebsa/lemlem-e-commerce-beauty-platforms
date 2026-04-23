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
                   setProducts(data.slice(50, 60));
                   
               };
               GetProduct();
           },[]);

return (
    
    <div className="w-full  border-2 border-black grid grid-cols-5 gap-2 p-5  ">
    
         {products.map((x)=>(<Apps key={x.id} id={x.id} name={x.name} price={x.price}
            img={x.image_link}/>))}
          
    </div>
    
)
}



function Apps ({name, img , id ,price }){
  const {liked,cart, handelLiked , Handelcart} = useLiked();
  console.log(cart)
    return (
    
   <div className="flex flex-col justify-between border-2 border-gray-300 p-2 relative">
    <div>
    <button onClick={()=>(handelLiked({name,img, id}))} ><Heart className="w-8 h-8 px-1 absolute righ shadow "/> </button>
    <img src={img} alt="" className="w-80 h-80 object-cover shadow" />
    </div>
    <p>{name}</p>
    <p>{price} euro</p>
    <button onClick={()=>(Handelcart({name,img, id,price}))}  className="flex justify-center items-center  border-gray-300 border-2 w-full h-10 rounded-md shadow">
      <h2>Buy</h2>
    </button>
    </div>
    
    )
}