"use client";

import useMeasure from "react-use-measure";

import { ChevronDownIcon } from "@heroicons/react/24/outline";

import { AnimatePresence, LazyMotion } from "motion/react";
import * as m from "motion/react-m";
import { useState } from "react";
const loadFeatures = () =>
  import("../../_lib/features").then((res) => res.default);

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
    <LazyMotion features={loadFeatures}>
      <div className="dark:text-light flex w-full flex-col overflow-hidden border-t border-gray-200 pt-5 text-neutral-700 lg:pt-3.5 dark:border-zinc-700/40">
        <m.button
          onClick={() => setIsOpen((prev) => !prev)}
          className="group flex cursor-pointer items-center border-gray-200 text-left text-lg font-medium lg:text-base"
        >
          {label}
          <m.span className="ml-auto">
            <ChevronDownIcon
              className={`ml-auto size-5 transition-transform duration-300 ${
                isOpen ? "-rotate-90" : "rotate-0"
              }`}
            />
          </m.span>
        </m.button>
        <m.div
          initial={{ height: bounds.height }}
          animate={{ height: bounds.height }}
          className="overflow-hidden"
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
      </div>
    </LazyMotion>
  );
}

export default ProductDetail;
