
"use client";
import MegaMenu from "@/componet/megaMenu";
import SearchBar from "@/componet/searchBar";
import { useState } from "react";
import Link from "next/link";
import { Heart, ShoppingBasket } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
export default function Nav() {
const [isOpen, setIsOpen] = useState(["G","u","e","s","t"]);
const [holder, setHolder] = useState("2 free samples for each order* Free shipping from €35.00")

return (

<header className="shadow-xl relative z-40">
<div className="flex justify-center md:justify-between px-4 md:px-10 p-2 bg-gray-100 text-xs sm:text-sm text-center">
  
 <div><h4>{holder}</h4></div>

  <div className="hidden md:flex gap-2 text-sm items-center">
  <p>Find Store </p>
  <span>|</span>
  <p> Help </p>
  <span>|</span>
  <p>Join Us </p>
  <span>|</span>
  <p> Log In</p>
  </div>
</div>

<div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 md:px-10 p-2">
<div>
  <Link href="/"> <h1 className="text-4xl md:text-5xl p-1 font-bold text-gray-700  font-serif ">lemlem.</h1> </Link>
  </div>
   <div className="order-3 w-full md:order-none md:w-auto md:flex-1 md:max-w-180 md:mx-8">
     <SearchBar />
   </div>

<div className="flex flex-row gap-2 sm:gap-4 items-center">

  <Avatar  >
  
    <AvatarImage src="/assets/images.png" alt="Avatar" />
   
    <AvatarFallback>{isOpen.slice(0,2)}</AvatarFallback>
  </Avatar>
  
  
  <Link href="/feavorite"> <Heart className="w-10 h-6 text-black-500"/></Link>
  <Link href="/cart">  <ShoppingBasket className="w-10 h-6 text-black-500"/></Link> 
    
</div>
</div>


 
  <MegaMenu />

</header>

)
}
