"use client";

import { ReactNode, useEffect } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";

import { useDrawer } from "@/app/_contexts/DrawerContext";

// import DrawerDialog from "./DrawerDialog";
import dynamic from "next/dynamic";
const DrawerDialog = dynamic(() => import("./DrawerDialog"), { ssr: false });

export default function Drawer({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const { open, setOpen } = useDrawer();

  // Gestisce l'overflow del body quando il dialog è aperto
  useEffect(() => {
    if (open) {
      // Salva la posizione di scroll attuale
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
    } else {
      // Ripristina la posizione quando il dialog si chiude
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }

    // Cleanup
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className={`${className}`}>
      <button
        onClick={() => {
          setOpen(true);
        }}
        className="focus sticky top-5 cursor-pointer rounded-md p-1 text-sm hover:bg-gray-950/10 dark:hover:bg-white/5"
      >
        <Bars3Icon
          aria-hidden="true"
          className="dark:text-light size-8 text-zinc-900"
        />
      </button>

      <DrawerDialog
        className="text-sidebar padding-sidebar flex flex-col items-center space-y-1 border-r border-gray-200 bg-gray-50/30 text-sm dark:border-zinc-700/40 dark:bg-zinc-800"
        open={open}
        setOpen={setOpen}
      >
        {children}
      </DrawerDialog>
    </div>
  );
}
