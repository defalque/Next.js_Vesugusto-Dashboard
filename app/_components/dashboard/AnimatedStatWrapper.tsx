"use client";

// import { BanknotesIcon } from "@heroicons/react/24/outline";
// import AnimatedStat from "./AnimatedStat";

import dynamic from "next/dynamic";
import { StatSkeleton } from "../ui/Skeletons";
const AnimatedStat = dynamic(() => import("./AnimatedStat"), {
  ssr: false,
  loading: () => <StatSkeleton />,
});
import { ReactNode } from "react";

type StatProps = {
  children: ReactNode;
  title: string;
  value: number | string;
  isCurrency?: boolean;
};

function AnimatedStatWrapper({
  title,
  value,
  isCurrency,
  children,
}: StatProps) {
  return (
    <AnimatedStat title={title} value={value} isCurrency={isCurrency}>
      <div className="bg-brand-100 dark:border-brand-950 dark:bg-brand-950/20 row-span-full flex aspect-square size-15 items-center justify-center rounded-full dark:border">
        {/* <BanknotesIcon className="text-brand-950 size-8 md:size-10" /> */}
        {children}
      </div>
    </AnimatedStat>
  );
}

export default AnimatedStatWrapper;
