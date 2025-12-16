"use client";
import * as m from "motion/react-m";

function Aside({ children }: { children: React.ReactNode }) {
  return (
    <m.aside
      layout
      layoutRoot
      layoutScroll
      className="text-sidebar bg-box inset-y-0 left-0 z-50 row-span-full row-start-1 hidden h-screen w-60 items-center space-y-1 divide-y divide-gray-200 border-r border-gray-200 xl:flex xl:flex-col dark:divide-zinc-700/40 dark:border-zinc-700/40"
      style={{ position: "fixed" }}
    >
      {children}
    </m.aside>
  );
}

export default Aside;
