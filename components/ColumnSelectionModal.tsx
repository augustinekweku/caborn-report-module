"use client";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useState, Fragment, useRef } from "react";
import { ColumnOne } from "./ColumnOne";
import { ColumnTwo } from "./ColumnTwo";
import { Modak } from "next/font/google";
import ModalTemplate from "./shared/ModalTemplate";

type PropTypes = {
  open: boolean;
  setOpen: (open: boolean) => void;
  cancelButtonRef?: React.RefObject<HTMLButtonElement>;
  onSectionAdded: (section: any) => void;
};

export const ColumnSelectionModal = ({
  open,
  setOpen,
  cancelButtonRef,
  onSectionAdded,
}: PropTypes) => {
  const [selectedColumn, setColumn] = useState<number>(0);
  // const cancelButtonRef = useRef(null)

  return (
    <>
      <ModalTemplate isOpen={open} onDismiss={() => setOpen(false)} size="lg">
        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
              <Dialog.Title
                as="h3"
                className="text-base font-semibold leading-6 text-gray-900"
              >
                Section settings
              </Dialog.Title>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Select a layout for this section
                </p>

                <div className="grid grid-cols-12 gap-5 mt-7">
                  <div className="col-span-6">
                    <p className="mb-4">One Column</p>
                    <ColumnOne
                      selectedColumn={selectedColumn}
                      onClick={() => setColumn(1)}
                    />
                  </div>
                  <div className="col-span-6">
                    <p className="mb-4">Two Columns</p>
                    <ColumnTwo
                      selectedColumn={selectedColumn}
                      onClick={() => setColumn(2)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button
            type="button"
            className="inline-flex w-full justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black sm:ml-3 sm:w-auto"
            onClick={() => onSectionAdded(selectedColumn)}
            disabled={selectedColumn === 0}
          >
            Apply Changes
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
      </ModalTemplate>
    </>
  );
};
