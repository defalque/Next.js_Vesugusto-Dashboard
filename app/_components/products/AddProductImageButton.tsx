"use client";

import { useDialog } from "@/app/_contexts/DialogContext";
import { ReactNode } from "react";
import Button from "../ui/Button";

function AddProductImageButton({
  id,
  children,
}: {
  id: number;
  children: ReactNode;
}) {
  const { openDialog } = useDialog();

  return (
    <>
      <button
        title="Aggiungi nuova immagine"
        aria-label="Aggiungi nuova immagine"
        className="focus dark:text-light hidden cursor-pointer rounded-md border border-gray-200 bg-gray-50/30 px-2 py-1.5 font-medium text-neutral-700 transition-colors duration-300 hover:bg-gray-100 lg:block dark:border-zinc-700/40 dark:bg-zinc-900/60 dark:hover:bg-zinc-800/70"
        onClick={(e) => {
          e.preventDefault();
          openDialog({
            type: "add",
            itemId: id,
          });
        }}
      >
        {children}
      </button>

      <Button
        className="px-2 lg:hidden"
        onClick={(e) => {
          e.preventDefault();
          openDialog({
            type: "add",
            itemId: id,
          });
        }}
      >
        Aggiungi immagine/i +
      </Button>
    </>
  );
}

export default AddProductImageButton;
