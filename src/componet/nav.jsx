
"use client";
import MegaMenu from "@/componet/megaMenu";
import AccountMenu from "@/componet/accountMenu";
import SearchBar from "@/componet/searchBar";
import TopBar from "@/componet/topBar";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Heart, ShoppingBasket } from "lucide-react";
import { useLiked } from "@/componet/context";
export default function Nav() {
const { cart, liked } = useLiked();
const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
const [scrolling, setScrolling] = useState(false)
const topBarRef = useRef(null)
const [topBarHeight, setTopBarHeight] = useState(0)

// The header sticks just above the screen edge by the height of the offer bar, so that
// bar scrolls away while the logo, search and menu stay pinned. It is measured because
// its height differs between phone and desktop.
useEffect(() => {
  const el = topBarRef.current;
  if (!el) return;
  const observer = new ResizeObserver(() => setTopBarHeight(el.offsetHeight));
  observer.observe(el);
  return () => observer.disconnect();
}, []);

// The nav fades while the page is moving and returns to normal shortly after it stops.
useEffect(() => {
  let timer;
  const onScroll = () => {
    if (window.scrollY > 0) setScrolling(true);
    clearTimeout(timer);
    timer = setTimeout(() => setScrolling(false), 250);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  return () => {
    window.removeEventListener("scroll", onScroll);
    clearTimeout(timer);
  };
}, []);

return (

<header
  style={{ top: -topBarHeight }}
  className={`sticky z-40 bg-white shadow-xl transition-opacity duration-300 hover:opacity-100 focus-within:opacity-100 ${
    scrolling ? "opacity-50" : "opacity-100"
  }`}
>
<div ref={topBarRef}>
  <TopBar />
</div>

<div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 md:px-10 p-2">
<div>
  <Link href="/"> <h1 className="text-4xl md:text-5xl p-1 font-bold text-gray-700  font-serif ">lemlem.</h1> </Link>
  </div>
   <div className="order-3 w-full md:order-none md:w-auto md:flex-1 md:max-w-180 md:mx-8">
     <SearchBar />
   </div>

<div className="flex flex-row gap-2 sm:gap-4 items-center">

  <AccountMenu />
  
  
  <Link href="/feavorite" aria-label={`Favorites, ${liked.length} item${liked.length === 1 ? "" : "s"}`} className="relative">
    <Heart className="w-10 h-6 text-black-500"/>
    {liked.length > 0 && (
      <span className="absolute -right-1 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1 text-[11px] font-medium text-white">
        {liked.length}
      </span>
    )}
  </Link>
  <Link href="/cart" aria-label={`Cart, ${cartCount} item${cartCount === 1 ? "" : "s"}`} className="relative">
    <ShoppingBasket className="w-10 h-6 text-black-500"/>
    {cartCount > 0 && (
      <span className="absolute -right-1 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1 text-[11px] font-medium text-white">
        {cartCount}
      </span>
    )}
  </Link> 
    
</div>
</div>


 
  <MegaMenu />

</header>

)
}
