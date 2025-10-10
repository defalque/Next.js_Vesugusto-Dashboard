"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { formatCurrency } from "@/app/_lib/utils";

// import { animate, motion, useMotionValue } from "motion/react";
import { LazyMotion, useMotionValue, animate } from "motion/react";
import * as m from "motion/react-m";
const loadFeatures = () =>
  import("../../_lib/features").then((res) => res.default);

type StatProps = {
  children: ReactNode;
  title: string;
  value: number | string;
  isCurrency?: boolean;
};

function AnimatedStat({ title, value, isCurrency, children }: StatProps) {
  const count = useMotionValue(0);

  const [displayValue, setDisplayValue] = useState<string | number>(value);

  useEffect(() => {
    if (typeof value === "number") {
      const controls = animate(count, isCurrency ? value / 100 : value, {
        duration: 1.5,
        onUpdate(latest) {
          if (isCurrency) {
            setDisplayValue(formatCurrency(latest * 100)); // Moltiplichi per 100 perché l'hai diviso sopra
          } else {
            setDisplayValue(Math.round(latest));
          }
        },
      });

      return () => controls.stop();
    } else {
      setDisplayValue(value);
    }
  }, [value, isCurrency, count]);

  return (
    <div className="border-grey-100 grid grow-1 grid-cols-[4.2rem_auto] grid-rows-[auto_auto] gap-x-5 gap-y-1 rounded-md bg-gray-50/65 p-4 lg:grid-cols-[auto_auto] dark:bg-zinc-800/40">
      {children}
      <h5 className="text-grey-500 self-baseline text-xs font-medium tracking-wide uppercase md:font-semibold">
        {title}
      </h5>

      <LazyMotion features={loadFeatures}>
        <m.pre className="self-baseline text-3xl leading-none font-medium">
          {displayValue}
        </m.pre>
      </LazyMotion>
    </div>
  );
}

export default AnimatedStat;
