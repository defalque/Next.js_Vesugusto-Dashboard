"use client";

import * as m from "motion/react-m";

function Navbar({ children }: { children: React.ReactNode }) {
  return (
    <m.nav
      layout
      layoutRoot
      layoutScroll
      aria-label="Navigazione principale"
      className="h-full min-h-0 self-stretch overflow-y-auto py-5"
    >
      {children}
    </m.nav>
  );
}

export default Navbar;
