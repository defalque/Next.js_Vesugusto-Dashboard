"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";

import { formatCurrency } from "@/app/_lib/utils";

import { LazyMotion, useSpring, useTransform } from "motion/react";
import * as m from "motion/react-m";
const loadFeatures = () =>
  import("../../_lib/features").then((res) => res.default);

type StatProps = {
  children: ReactNode;
  title: string;
  value: number;
  position?: string;
};

function AnimatedStat({ title, value, position, children }: StatProps) {
  const countValue = useSpring(0, {
    stiffness: 185,
    damping: 25,
  });

  const countDisplay = useTransform(countValue, (value) =>
    formatCurrency(value),
  );

  useEffect(() => {
    countValue.set(value);
  }, [value, countValue]);

  return (
    <LazyMotion features={loadFeatures}>
      <div
        className={`dark:text-light grid grow-1 grid-cols-[4.2rem_auto] grid-rows-[auto_auto] gap-x-2 gap-y-1 rounded-md border border-gray-200 bg-gray-50/30 p-3 text-neutral-700 md:p-4 lg:grid-cols-[auto_auto] dark:border-zinc-700/40 dark:bg-zinc-800/40 ${position}`}
      >
        {children}
        <h5 className="self-baseline text-xs font-medium tracking-wide uppercase md:font-semibold">
          {title}
        </h5>

        <m.pre className="self-baseline text-3xl leading-none font-medium">
          {countDisplay}
        </m.pre>
      </div>
    </LazyMotion>
  );
}

export default AnimatedStat;
