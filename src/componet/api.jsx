"use client";

import { useLiked } from "@/componet/context";

export default function Api() {

     
              return (
                <>
                  <div className="w-full my-5 border-2 border-black grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 p-3 sm:p-5">
                <Cart/>
                </div>
                </>
              )
}

const Cart = () => {
        const {liked} = useLiked();

        return(
                <>
                {liked.map((x,index)=>(<Apps key={x.id ?? index} name={x.name} img={x.img}/>))}
                </>
        )
        
}

function Apps ({name, img }){
       
          return (
          
         <div>
          <div>
          <img src={img} alt={name} className="w-full aspect-square object-cover shadow" />
          </div>
          <p>{name}</p>
          </div>
          
          )
      }