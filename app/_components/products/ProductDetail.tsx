"use client";

import useMeasure from "react-use-measure";

import { ChevronDownIcon } from "@heroicons/react/24/outline";

import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { useState } from "react";

function ProductDetail({
  productAttribute,
  label,
}: {
  productAttribute: string;
  label: string;
}) {
  const [isOpen, setIsOpen] = useState(true);
  const [ref, bounds] = useMeasure();

  return (
    <button
      type="button"
      aria-label={`${label} - ${isOpen ? "Chiudi" : "Apri"}`}
      aria-expanded={isOpen}
      onClick={() => setIsOpen((prev) => !prev)}
      className="dark:text-light flex w-full cursor-pointer flex-col overflow-hidden border-t border-gray-200 pt-5 pb-3 text-neutral-700 lg:pt-3.5 dark:border-zinc-700/40"
    >
      <div className="group flex items-center border-gray-200 text-left text-lg font-medium lg:text-base">
        {label}
        <span className="ml-auto">
          <ChevronDownIcon
            aria-hidden
            className={`ml-auto size-5 text-gray-300 transition-transform duration-300 dark:text-zinc-600 ${
              isOpen ? "-rotate-90" : "rotate-0"
            }`}
          />
        </span>
      </div>
      <m.div
        animate={{ height: bounds.height }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="w-full overflow-hidden text-left"
      >
        <div ref={ref} className="relative">
          <AnimatePresence mode="popLayout" initial={false}>
            {isOpen && (
              <m.p
                exit={{ opacity: 1, height: 0 }}
                className="border-gray-200 pt-4 text-[15px] text-neutral-600 lg:pt-2 xl:text-sm dark:border-zinc-700/40 dark:text-zinc-300"
              >
                {productAttribute}
              </m.p>
            )}
          </AnimatePresence>
        </div>
      </m.div>
    </button>
  );
}

export default ProductDetail;
