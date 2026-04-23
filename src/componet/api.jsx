"use client";

import { useLiked } from "@/componet/context";
export default  function Api() {

     
              return (
                <>
                  <div className="w-full my-5 border-2 border-black grid grid-cols-5 gap-2 p-5  ">
                <Cart/>
                </div>
                </>
              )
}

const Cart = () => {
        const {liked} = useLiked();

        return(
                <>
                {liked.map((x,index)=>(<Apps key={index} name={x.name} img={x.img}/>))}
                </>
        )
        
}

function Apps ({name, img }){
       
          return (
          
         <div>
          <div>
          <img src={img} alt="" className="w-80 h-80 object-cover shadow" />
          </div>
          <p>{name}</p>
          </div>
          
          )
      }