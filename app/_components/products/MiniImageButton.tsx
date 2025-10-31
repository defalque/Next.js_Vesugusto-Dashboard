"use client";

import { useSelectedImage } from "@/app/_contexts/SelectedImageContext";
import { ReactNode } from "react";

function MiniImageButton({
  index,
  children,
}: {
  index: number;
  children: ReactNode;
}) {
  const { selectedIndex, setSelectedIndex } = useSelectedImage();

  const isSelected = selectedIndex === index;

  return (
    <button
      className="focus relative aspect-2/3 w-full overflow-hidden rounded-md"
      disabled={isSelected}
      aria-pressed={isSelected}
      onMouseOver={() => {
        if (!isSelected) {
          setSelectedIndex(index);
        }
      }}
      onClick={() => {
        if (!isSelected) {
          setSelectedIndex(index);
        }
      }}
    >
      {children}
    </button>
  );
}

export default MiniImageButton;
