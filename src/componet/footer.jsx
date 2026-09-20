"use client";
import { Loader, LucideBox, ShipWheel, Tag, TruckIcon, Wallet } from "lucide-react";



export default function Slider() {
  return (
    <header>
    <div className="w-full  bg-gray-100">
    <div className="grid grid-cols-2 gap-6 p-6 md:flex md:justify-around md:p-10">
   
      <div>
      <TruckIcon className="w-5 h-5 text-gray-500" />
      <h4 className="font-normal py-1">Shipping</h4>
      <p className="font-thin">Delivery Within 3/6 days</p>
      </div>

      <div>
      <LucideBox className="w-5 h-5 text-gray-500" />
      <h5 className=" py-1">Free Shipping</h5>
      <p className="font-thin">from 300 birr</p>
      </div>
    
      
      <div>
      <Tag className="w-5 h-5 text-gray-500" />
      <h5 className="font-normal py-1">2 free samples</h5>
      <p className="font-thin">at your choice</p>
      </div>

      <div>
      <Wallet className="w-5 h-5 text-gray-500" />
      <h5 className="font-normal  py-1">Free Shipping</h5>
      <p className="font-thin">from 300 birr</p>
      </div>
  
      </div>
      <hr className=" my-4 border-gray-300" />
      <div className="grid grid-cols-2 gap-6 px-6 pb-10 pt-6 md:flex md:justify-around md:pb-15 md:pt-10 md:px-0"> 
      <div>
        <h5 className="text-sm font-bold text-gray-700">Payment methods</h5>
      </div>
      <div>
        <h5 className="text-sm font-bold text-gray-700">Shipping</h5>
      </div>
      <div>
        <h5 className="text-sm font-bold text-gray-700">Safe Shopping</h5>
      </div>
      <div>
        <h5 className="text-sm font-bold text-gray-700">Follow lemlem.</h5>
      </div>
      </div>
      </div>
      <div className="w-full bg-gray-100 flex flex-col gap-4 items-center text-center md:flex-row md:justify-around mt-4 p-5"> 
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
      <p>Privacy Contacts </p>
      <p>Right of withdrawal</p>
      <p>Conditions of sale</p>
      <p>Compliance & Whistleblowing</p>
        <p>Cookie settings</p>
      </div>
      <p>©2026 lemlem Italia S.p.A. </p>
      </div>
      </header>
  )
}