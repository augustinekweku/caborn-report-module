import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";

type PropsType = {
  isOpen: boolean;
  onDismiss?: () => void;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
};
export default function ModalTemplate({
  children,
  isOpen,
  onDismiss,
  size = "md",
}: PropsType) {
  const cancelButtonRef = useRef(null);

  function returnSize() {
    switch (size) {
      case "sm":
        return "sm:max-w-sm";
      case "md":
        return "sm:max-w-md";
      case "lg":
        return "sm:max-w-[800px]";
      case "xl":
        return "sm:max-w-[1140px]";
      default:
        return "sm:max-w-md";
    }
  }

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        static={true}
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={() => {}}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75  transition-opacity"></div>
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full  justify-center p-4 text-center items-center sm:p-0 ">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className={clsx(
                  "relative transform overflow-hidden rounded-lg bg-transparent text-left shadow-xl transition-all sm:my-8  w-full",
                  returnSize()
                )}
              >
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
