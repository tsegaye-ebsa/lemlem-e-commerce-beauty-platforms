"use client";
import { useLiked } from "@/componet/context";
import { Heart } from "lucide-react";

export default function Home () {
  return (
    <div className="flex flex-row   ">
    <div className="w-200  border-2 border-gray-300  flex flex-col flex-1.5  ">
  <Carts/>
  </div>
  <div className=" border-2 border-gray-300 flex flex-col flex-1  "> 
    <h1 className="text-2xl font-bold text-center">Your Favorite</h1>
  </div>
  
  </div>
  )
}
function Carts () {
        const {cart} = useLiked();
        return(
                <>
                {cart.map((x,index)=>(<Apps key={index} name={x.name} img={x.img} price={x.price}/>))}
                </>
        )
        
}

function Apps ({name, img , id ,price }){
    const {Handelcart} = useLiked();
    
      return (
      
     <div className="flex flex-row justify-between border-2 border-gray-300 p-2 relative">
      <div>
      <button onClick={()=>(handelLiked({name,img, id}))} ><Heart className="w-8 h-8 px-1 absolute righ shadow "/> </button>
      <img src={img} alt="" className="w-80 h-80 object-cover shadow" />
      </div>
      <div>
      <p>{name}</p>
        <p>{price} euro</p>
        <button   className="flex justify-center items-center  border-gray-300 border-2 w-full h-10 rounded-md shadow">
      <h2>Remove</h2>
    </button>
        </div>
       
      </div>
      
      )
  }