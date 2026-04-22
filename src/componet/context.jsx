"use client";
import {  useState } from "react";
import { createContext, useContext} from "react";


const sender = createContext();
export default function MainProvider({children}) {
    const [liked, setliked] = useState ("hellowww")
   const handelLiked  = (provide) => { setliked([...liked, provide])}   
    return(
        <>
        <sender.Provider value={{liked, setliked,handelLiked }}>
        {children}
        </sender.Provider>
        </>
    )
}
export const useLiked = () => useContext(sender);