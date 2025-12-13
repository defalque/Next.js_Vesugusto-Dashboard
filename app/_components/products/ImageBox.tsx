"use client";

import { useSelectedImage } from "@/app/_contexts/SelectedImageContext";
import { ReactNode } from "react";

function ImageBox({ index, children }: { index: number; children: ReactNode }) {
  const { selectedIndex } = useSelectedImage();

  return (
    <div
      key={index + 1}
      className={`box-style absolute top-0 h-full w-full overflow-hidden rounded-md border transition-opacity duration-500 ${
        selectedIndex === index ? "opacity-100" : "opacity-0"
      }`}
    >
      {children}
    </div>
  );
}

export default ImageBox;
