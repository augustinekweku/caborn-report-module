'use client'
import Image from "next/image";
import { PluseIcon } from "@/components/svg/PlusIcon";
import { SwitchColumnButton } from "@/components/svg/SwitchColumnButton";
import { RemoveColumnButton } from "@/components/svg/RemoveColumnButton";
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { useState, Fragment, useRef } from "react";
import { ColumnSelectionModal } from "@/components/ColumnSelectionModal";
import { WidgetSelectionModal } from "@/components/WidgetSelectionModal";


export default function Home() {
  const [openColumnsModal, setOpen] = useState(false)
  const [openWidgetsModal, setWidgetModal] = useState(false)
    const cancelButtonRef = useRef(null)


  return (
    <main className="min-h-screen  p-24 bg-[#F7F7F7]">

      <div className="grid grid-cols-12 gap-5">
       
        
        {/* Table of content */}
        <div className="col-span-3">
          <h1 className="mb-4 font-bold">Table of content</h1>
          <ol>
            
              <li>
                <p className=" font-semibold">1. Random Title</p>
                <ul className=" list-disc pl-2">
                  <ol className=" list-inside">a. Something </ol>
                  <ol>b. Something </ol>
                </ul>
            </li>

            <li>
                <p className=" font-semibold">1. Random Title</p>
                <ul className=" list-disc pl-2">
                  <ol className=" list-inside">a. Something </ol>
                  <ol>b. Something </ol>
                </ul>
            </li>
            
            </ol>
        </div>

        
        {/* content section */}
        <div className="col-span-9 bg-white p-10 h-screen  gap-5">

            {/* Single columng row */}
          <div className="grid grid-cols-12 gap-5 mb-5">

            <div className="col-span-12 relative min-h-[320px]">

              {/* floating button */}
              <span className="cursor-pointer absolute top-3 right-3">
                  <SwitchColumnButton />
              </span>
              

              {/* Emptystate */}
              <div className="bg-[#F7F7F7]  flex h-full">
                <span className="m-auto flex items-center flex-col gap-4 cursor-pointer" onClick={()=>setWidgetModal(true)}>
                  <PluseIcon/>
                  Add Widget
                </span>
              </div>

              {/* If there is content or widget hide the above empty state */}
              <div className=" h-full hidden">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae dolorum consectetur nobis expedita debitis beatae esse voluptate, odit nisi necessitatibus facere magnam error recusandae corporis. Adipisci beatae rerum deleniti neque.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae dolorum consectetur nobis expedita debitis beatae esse voluptate, odit nisi necessitatibus facere magnam error recusandae corporis. Adipisci beatae rerum deleniti neque.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae dolorum consectetur nobis expedita debitis beatae esse voluptate, odit nisi necessitatibus facere magnam error recusandae corporis. Adipisci beatae rerum deleniti neque.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae dolorum consectetur nobis expedita debitis beatae esse voluptate, odit nisi necessitatibus facere magnam error recusandae corporis. Adipisci beatae rerum deleniti neque.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae dolorum consectetur nobis expedita debitis beatae esse voluptate, odit nisi necessitatibus facere magnam error recusandae corporis. Adipisci beatae rerum deleniti neque.
              </div>

            </div>
          </div>
           
            {/* double columng row */}
          <div className="grid grid-cols-12 gap-5">
            <div className="bg-[#F7F7F7] min-h-[320px] flex relative col-span-6">
              <span className="cursor-pointer absolute top-3 right-3">
                <RemoveColumnButton/>
              </span>
              
              <span className="m-auto flex items-center flex-col gap-4 cursor-pointer">
                <PluseIcon/>
                Add Widget
              </span>
            </div> 

            {/* Single columng */}
            <div className="bg-[#F7F7F7] min-h-[320px] flex relative col-span-6">
               <span className="cursor-pointer absolute top-3 right-3">
                <RemoveColumnButton/>
              </span>
              <span className="m-auto flex items-center flex-col gap-4 cursor-pointer">
                <PluseIcon/>
                Add Widget
              </span>
            </div>  
          </div>

          <button className="inline-flex items-center gap-1 bg-white border border-gray-300 py-3 pl-4 pr-6 rounded-lg w-full justify-center mt-5" onClick={()=>setOpen(true)}>
            <Image src='/assets/images/icons/add.svg' width={24} height={24} alt="add section"/>
            New Section
          </button>
        </div>
      </div>

      <ColumnSelectionModal open={openColumnsModal} setOpen={setOpen} />
      <WidgetSelectionModal open={openWidgetsModal} setOpen={setWidgetModal} />

    </main>
  );
}
