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
        className="focus hidden cursor-pointer rounded-full bg-gray-200/95 p-1 transition-colors duration-300 hover:bg-gray-100 md:block dark:bg-zinc-700/95 dark:hover:bg-zinc-600"
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
        className="px-2 md:hidden"
        // className="focus block cursor-pointer rounded-full px-2 text-base transition-colors duration-300 hover:opacity-80 md:hidden"
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
