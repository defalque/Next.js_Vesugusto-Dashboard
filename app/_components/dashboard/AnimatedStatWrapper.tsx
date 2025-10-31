"use client";

import dynamic from "next/dynamic";
import { StatSkeleton } from "../ui/Skeletons";
const AnimatedStat = dynamic(() => import("./AnimatedStat"), {
  ssr: false,
  loading: () => (
    <StatSkeleton
      position="row-start-1 col-span-full md:col-span-1"
      label="Ricavi"
    />
  ),
});
import { ReactNode } from "react";

type StatProps = {
  children: ReactNode;
  title: string;
  value: number;
  position: string;
};

function AnimatedStatWrapper({ title, value, position, children }: StatProps) {
  return (
    <AnimatedStat title={title} value={value} position={position}>
      <div className="bg-brand-950 dark:border-brand-950 dark:bg-brand-dark-600 row-span-full flex aspect-square size-15 items-center justify-center rounded-full dark:border">
        {children}
      </div>
    </AnimatedStat>
  );
}

export default AnimatedStatWrapper;
