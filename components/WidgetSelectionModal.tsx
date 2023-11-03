
'use client'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { useState, Fragment, useRef } from "react";
import { ColumnOne } from './ColumnOne';
import { ColumnTwo } from './ColumnTwo';
import { TextWidgetIcon } from './TextWidgetIcon';
import { PieWidgetIcon } from './PieWidgetIcon';
import { ImageWidgetIcon } from './ImageWidgetIcon';

type PropTypes = {
    open: boolean,
    setOpen: (open: boolean) => void,
    cancelButtonRef?: React.RefObject<HTMLButtonElement>
}

export const WidgetSelectionModal = ({open, setOpen, cancelButtonRef}:PropTypes) => {
const [selectedColumn, setColumn] = useState<number>(0)
const [selectedWidgetIcon, setWidget] = useState<string>('')
    // const cancelButtonRef = useRef(null)


    return (<>
    <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={()=>setOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    
                                    
                    <div className="sm:flex sm:items-start">
                      
                                        
                     <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                          Add widget
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                                                    Select a widget to add
                            </p>

                                                {/* Wdigets */}
                                                
                            <div className='grid grid-cols-12 gap-5 mt-7'>
                                                    <div className='col-span-4'>
                                <TextWidgetIcon selectedWidgetIcon={selectedWidgetIcon} onClick={()=>setWidget('text')} />
                                </div>
                                                    <div className='col-span-4'>
                                <PieWidgetIcon selectedWidgetIcon={selectedWidgetIcon} onClick={()=>setWidget('chart')} />

                                                    </div>
                                                    
                                                    <div className='col-span-4'>
                                <ImageWidgetIcon selectedWidgetIcon={selectedWidgetIcon} onClick={()=>setWidget('image')} />

                                </div>
                                
                            </div>
                                                

                                                


                                  <form>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
           
           
           <div className="col-span-full">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                Emission histories
              </label>
              <div className="mt-2">
                <select
                  id="country"
                  name="country"
                  autoComplete="country-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option>United States</option>
                  <option>Canada</option>
                  <option>Mexico</option>
                </select>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                Chart type
              </label>
              <div className="mt-2">
                <select
                  id="country"
                  name="country"
                  autoComplete="country-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option>United States</option>
                  <option>Canada</option>
                  <option>Mexico</option>
                </select>
              </div>
            </div>
        </div>
    </div>
</div>
</form>              
                        </div>

                      </div>
                    </div>
                                    
                                    
                  </div>
                  
                                {/* Footer */}
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black sm:ml-3 sm:w-auto"
                      onClick={() => setOpen(false)}
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>)
}