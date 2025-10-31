"use client";

import { useDialog } from "@/app/_contexts/DialogContext";
import { useSelectedImage } from "@/app/_contexts/SelectedImageContext";
import { ReactNode } from "react";

function CancelProductImageButton({
  name,
  children,
}: {
  name: string;
  children: ReactNode;
}) {
  const { openDialog } = useDialog();
  const { selectedImage } = useSelectedImage();

  return (
    <div className="absolute top-2 right-2 h-fit w-fit rounded-full">
      <button
        title="Cancella immagine"
        aria-label="Cancella immagine"
        className="focus dark:text-light cursor-pointer rounded-md border-gray-200 bg-gray-50/30 px-2 py-1.5 font-medium text-neutral-700 transition-colors duration-300 hover:bg-gray-100/80 dark:border-zinc-700/40 dark:bg-zinc-900/60 dark:hover:bg-zinc-800/80"
        onClick={(e) => {
          e.preventDefault();
          openDialog({
            type: "cancel",
            name,
            itemName: selectedImage,
          });
        }}
      >
        {children}
      </button>
    </div>
  );
}

export default CancelProductImageButton;
