"use client";
import { useLiked } from "@/componet/context";
import { Heart } from "lucide-react";

export default function Home () {
  return (
    <div className="flex flex-col lg:flex-row">
    <div className="w-full lg:w-200 border-2 border-gray-300 flex flex-col">
  <Carts/>
  </div>
  <div className="border-2 border-gray-300 flex flex-col flex-1 p-4">
    <h1 className="text-2xl font-bold text-center">Your Favorite</h1>
  </div>
  
  </div>
  )
}
function Carts () {
        const {cart} = useLiked();
        return(
                <>
                {cart.map((x,index)=>(<Apps key={index} index={index} id={x.id} name={x.name} img={x.img} price={x.price}/>))}
                </>
        )
        
}

function Apps ({name, img , id ,price, index }){
    const {handelLiked, removeFromCart} = useLiked();
    
      return (
      
     <div className="flex flex-col sm:flex-row gap-4 justify-between border-2 border-gray-300 p-2 relative">
      <div className="sm:shrink-0">
      <button onClick={()=>(handelLiked({name,img, id}))} ><Heart className="w-8 h-8 px-1 absolute right-0 shadow "/> </button>
      <img src={img} alt={name} className="w-full sm:w-56 aspect-square object-cover shadow" />
      </div>
      <div>
      <p>{name}</p>
        <p>{price} euro</p>
        <button onClick={()=>(removeFromCart(index))} className="flex justify-center items-center  border-gray-300 border-2 w-full h-10 rounded-md shadow">
      <h2>Remove</h2>
    </button>
        </div>
       
      </div>
      
      )
  }