"use client";

import { useSelectedImage } from "@/app/_contexts/SelectedImageContext";
import { ComponentPropsWithoutRef, ReactNode } from "react";

type IconButtonProps = ComponentPropsWithoutRef<"button"> & {
  length: number;
  children: ReactNode;
};

function IconButton({ length, children, ...props }: IconButtonProps) {
  const { selectedIndex, setSelectedIndex } = useSelectedImage();

  return (
    <button
      className="focus cursor-pointer rounded"
      onClick={() => setSelectedIndex((selectedIndex - 1 + length) % length)}
      {...props}
    >
      {children}
    </button>
  );
}

export default IconButton;
