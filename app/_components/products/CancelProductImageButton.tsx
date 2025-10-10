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
        className="focus cursor-pointer rounded-full bg-gray-200/95 p-1 transition-colors duration-300 hover:bg-gray-100 dark:bg-zinc-700/95 dark:hover:bg-zinc-600"
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
