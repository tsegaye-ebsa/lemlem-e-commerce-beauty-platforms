
"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart,  Search, ShoppingBasket } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  
  InputGroupInput,
  
} from "@/components/ui/input-group"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
export default function Nav() {
const [isOpen, setIsOpen] = useState(["G","u","e","s","t"]);
const [holder, setHolder] = useState("2 free samples for each order* Free shipping from €35.00")
const [search, setSearch] = useState("")
const [products,setProducts]= useState([])
const [nav, setNav]= useState("")

const navs = {
  promo: ["OMAGGI","DOUGLAS" ,"DEAL"],
  brad:["TOP BRAND",
  "Lemlem COLLECTION",
  "DIOR",
  "CHANEL",
  "SWEED",
  "MILK_SHAKE",
  "Visualizza", "tutto", "Top brand"],
  perfum:[
    "View all Men",
    "BOXES",
    "Caskets for her",
    "Caskets for Him",
    "View all Caskets",
    "NICHE SCENTS",
    "PERFUME REFILL",
    "ARABIC PERFUMES"
  ]

};
    useEffect(()=>{
           async function  GetProduct() {
               const product = await fetch("http://makeup-api.herokuapp.com/api/v1/products.json");
               const data = await product.json();
               setProducts(data)
           };
           GetProduct();
       },[]);

console.log(search)
return (

<header className="shadow-xl " >
<div className="flex justify-between pl-10 pr-10 p-2 bg-gray-100">
  
 <div><h4>{holder}</h4></div>

  <div className="flex gap-2 text-sm items-center">
  <p>Find Store </p>
  <span>|</span>
  <p> Help </p>
  <span>|</span>
  <p>Join Us </p>
  <span>|</span>
  <p> Log In</p>
  </div>
</div>

<div className="flex flex-row items-center justify-between pl-10 pr-10 p-2 ">
<div>
  <Link href="/"> <h1 className="text-5xl p-1 font-bold text-gray-700  font-serif ">lemlem.</h1> </Link>
  </div>
   <div >
   <InputGroup className="w-180 py-3  ">
  <InputGroupInput placeholder="Search..."  value={search} onChange={(e)=>(setSearch(e.target.value))} />
  <InputGroupAddon className="  p-2 border-2 border-gray-300 bg-black rounded-md  ">
    <Search className="w-5 h-5 text-white" />
  </InputGroupAddon>
  
</InputGroup>
{search && (<div className="w-180 absolute z-50  bg-white mx-1 ">
<Searching className="relative" search ={search} product={products}/>
</div>
)}

   </div>
 

<div className="flex flex-row gap-4 items-center">

  <Avatar  >
  
    <AvatarImage src="/public/assets/images.png" alt="Avatar" />
   
    <AvatarFallback>{isOpen.slice(0,2)}</AvatarFallback>
  </Avatar>
  
  
  <Link href="/feavorite"> <Heart className="w-10 h-6 text-black-500"/></Link>
  <Link href="/cart">  <ShoppingBasket className="w-10 h-6 text-black-500"/></Link> 
    
</div>
</div>


 
  <div className="flex justify-around  space-x-4 text-black font-sans text-lg font-normal pb-1">
    
    <Link href="/promo" onMouseEnter={()=>(setNav(navs.promo))} >Promo</Link> 
  
    <Link href="/"  onMouseEnter={()=>(setNav(navs.brad))}>New</Link>
    <Link href="/about" onMouseEnter={()=>(setNav(navs.brad))}>Brand </Link>
    <Link href="/contact" onMouseEnter={()=>(setNav(navs.brad))}>Perfumes</Link>
    <Link href="/contact" onMouseEnter={()=>(setNav(navs.brad))}>K-beauty</Link>
    <Link href="/contact" onMouseEnter={()=>(setNav(navs.brad))}>Face</Link>
    <Link href="/contact" onMouseEnter={()=>(setNav(navs.brad))}>Body</Link>
    <Link href="/contact" onMouseEnter={()=>(setNav(navs.bad))}>Hair</Link>
    <Link href="/contact" onMouseEnter={()=>(setNav(navs.brad))}>Makeup</Link>
    <Link href="/contact" onMouseEnter={()=>(setNav(navs.brad))}>Sunscreen</Link>

  </div>

  {
    nav && (
      <div className="w-full flex flex-col flex-wrap space-y-4 py-5 h-100 bg-white absolute z-50 px-10 " onMouseLeave={()=>(setNav(""))}>
      {nav.map((x,index)=>(<p key={index}>{x}</p>))}
      </div>)
  }
 
  
</header>

)
}
function Searching ({search , product}){
  const Filters = product.filter((x)=>(x.name.includes(search)))
  
  console.log(Filters)
  return (
    <>
     
    {Filters.map((x) => (<Result key={x.id} name={x.name} image={x.image} />)).slice(1,10)}
 
    </>
  )
}



 function Result({name , image }){
  return (
   <>
   <div className="flex ">
    <img src={image} alt="" className="w-6 h-6 object-contain" />
    <p className="text-normal">{name}</p>

   </div>
   
   </>

  )
 }
 

 




