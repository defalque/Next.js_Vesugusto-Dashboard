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

  // const iconVariants = {
  //   hover: { rotate: [-35, 23, -11, 8, -5, 3, -2, 0] },
  // };

  return (
    <LazyMotion features={loadFeatures}>
      <div className="dark:text-light flex w-full flex-col overflow-hidden rounded-md border border-gray-200 bg-gray-50/30 p-0.5 text-neutral-700 dark:border-zinc-700/40 dark:bg-zinc-800/40">
        <m.button
          // whileHover="hover"
          // initial="initial"
          onClick={() => setIsOpen((prev) => !prev)}
          className="group flex cursor-pointer items-center px-3 py-3 text-left text-base font-medium"
        >
          {label}
          <m.span
            // variants={iconVariants}
            className="ml-auto"
          >
            <ChevronDownIcon
              className={`ml-auto size-5 transition-transform duration-300 ${
                isOpen ? "-rotate-90" : "-rotate-0"
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
                  className="_border-t border-gray-200 px-3 pb-3 text-sm/6 text-neutral-600 dark:border-zinc-700/40 dark:text-zinc-300"
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
