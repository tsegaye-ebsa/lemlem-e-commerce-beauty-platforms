"use client";
import {  useState } from "react";
import { createContext, useContext} from "react";
import AuthDialog from "@/componet/authDialog";


const MAX_QTY = 99;
const sender = createContext();
export default function MainProvider({children}) {
    const [liked, setliked] = useState ([])
    const [cart, setCart] = useState([])
    // null = closed, otherwise "login" or "register"
    const [authMode, setAuthMode] = useState(null)
    // Adding a product that is already in the cart increases its quantity.
    function Handelcart (x) {
        setCart((prev) =>
            prev.some((item) => item.id === x.id)
                ? prev.map((item) => (item.id === x.id ? { ...item, qty: Math.min(item.qty + 1, MAX_QTY) } : item))
                : [...prev, { ...x, qty: 1 }]
        )
    }
    function setQty (id, qty) {
        const next = Math.min(Math.max(qty, 1), MAX_QTY)
        setCart((prev) => prev.map((item) => (item.id === id ? { ...item, qty: next } : item)))
    }
    function removeFromCart (id) {
        setCart((prev) => prev.filter((item) => item.id !== id))
    }
    function clearCart () {
        setCart([])
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
        <sender.Provider value={{liked, setliked,handelLiked , cart, setCart, Handelcart, setQty, removeFromCart, clearCart, openAuth: setAuthMode}}>
        {children}
        {authMode && (
            <AuthDialog mode={authMode} onModeChange={setAuthMode} onClose={() => setAuthMode(null)} />
        )}
        </sender.Provider>
        </>
    )
}
export const useLiked = () => useContext(sender);