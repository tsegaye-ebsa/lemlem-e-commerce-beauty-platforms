"use client";
import {  useState } from "react";
import { createContext, useContext} from "react";


const sender = createContext();
export default function MainProvider({children}) {
    const [liked, setliked] = useState ([])
    const [cart, setCart] = useState([])
    function Handelcart (x) {
        setCart([...cart, x]) 
    }
   const handelLiked  = (provide) => { 
    if(liked.some((x)=>(x.id==provide.id))){
        const filter = liked.filter((x)=>(x.id !== provide.id))
        setliked(filter)
    }else setliked([...liked, provide])
    
    setliked(

    
    [...liked, provide])}   
    return(
        <>
        <sender.Provider value={{liked, setliked,handelLiked , cart, setCart, Handelcart}}>
        {children}
        </sender.Provider>
        </>
    )
}
export const useLiked = () => useContext(sender);