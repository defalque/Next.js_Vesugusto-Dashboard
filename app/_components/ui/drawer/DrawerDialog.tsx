"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ReactNode } from "react";

function DrawerDialog({
  className,
  open,
  setOpen,
  children,
}: {
  className: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
}) {
  return (
    <Dialog open={open} onClose={setOpen} className="relative z-200 xl:hidden">
      <DialogBackdrop
        transition
        className="_backdrop-blur-xs _transition-opacity _duration-500 _ease-in-out _data-closed:opacity-0 fixed inset-0 dark:bg-black/5"
      />
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full">
            <DialogPanel
              transition
              className="pointer-events-auto relative grid transform grid-cols-[var(--spacing-sidebar)] transition duration-500 ease-in-out data-closed:-translate-x-full sm:duration-700"
              // className="pointer-events-auto relative grid w-screen max-w-md transform grid-cols-[var(--spacing-sidebar)] transition duration-500 ease-in-out data-closed:-translate-x-full sm:duration-700"
            >
              <div className={`relative h-full ${className}`}>{children}</div>

              <TransitionChild>
                <div className="absolute top-0 -right-10 flex pt-4 duration-500 ease-in-out data-closed:opacity-0">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="dark:hover:text-brand-50 _focus-visible:outline-hidden focus relative cursor-pointer rounded-md text-zinc-900 hover:text-zinc-400 focus-visible:ring-2 focus-visible:ring-white dark:text-gray-300"
                  >
                    <span className="absolute -inset-2.5" />
                    <span className="sr-only">Close panel</span>
                    <XMarkIcon
                      aria-hidden="true"
                      className="size-8 sm:size-6"
                    />
                  </button>
                </div>
              </TransitionChild>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

export default DrawerDialog;
