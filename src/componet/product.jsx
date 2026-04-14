"use client";

import { useEffect, useState } from "react";

  
export default function Main() { 
  
    return (
        <>


       <div className="w-full  flex  flex-wrap gap-0 justify-center items-start pt-15  ">
         <Product/>
         
         </div>
         
        </>
    );
}

function Product(){
    
   const [products,setProducts]= useState([])
    useEffect(()=>{
           async function  GetProduct() {
               const product = await fetch("http://makeup-api.herokuapp.com/api/v1/products.json");
               const data = await product.json();
               const slicedData = data.slice(60, 63);
               setProducts(slicedData);
               console.log(data);
           };
           GetProduct();
       },[]);
       return (
           <>
           
          
         {products.map((result)=>(<Brand key={result.id} 
         name={result.name}
         price={result.price}
        image={result.image_link}
        description={result.description}
       

          />))}
     
           </>
       );
}
function Brand({name, price, image ,description}){
  
    return(
      
     <>
     <div className="w-1/3 h-150 flex flex-col border-grey border-2 justify-between">
      <div>
       <img src={image} className="w-full h-100 object-cover p-2" >
      </img>
      <img src="/assets/channel.jpeg" alt="" className="w-25 h-25 relative top-5 left-2 border-grey border-2" />
      </div>
      <div className=" border-y-2 h-50 border-white text-white bg-black">
        <h2 className="py-5 text-3xl text-white">{name}</h2>
        <h3 className="py-5">{price} euro</h3>
      </div>
      <div>
       
      </div>
      <div>
     
      </div>
     </div>
     
     </>
     
    );
}