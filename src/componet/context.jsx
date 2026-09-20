"use client";
import {  useState } from "react";
import { createContext, useContext} from "react";


const sender = createContext();
export default function MainProvider({children}) {
    const [liked, setliked] = useState ([])
    const [cart, setCart] = useState([])
    function Handelcart (x) {
        setCart((prev) => [...prev, x])
    }
    function removeFromCart (index) {
        setCart((prev) => prev.filter((_, i) => i !== index))
    }
    const handelLiked = (provide) => {
        setliked((prev) =>
            prev.some((x) => x.id === provide.id)
                ? prev.filter((x) => x.id !== provide.id)
                : [...prev, provide]
        )
    }
    return(
        <>
        <sender.Provider value={{liked, setliked,handelLiked , cart, setCart, Handelcart, removeFromCart}}>
        {children}
        </sender.Provider>
        </>
    )
}
export const useLiked = () => useContext(sender);