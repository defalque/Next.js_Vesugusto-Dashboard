"use client";

import { ReactNode } from "react";

import { FilterOption, SortOption } from "@/app/_lib/definitions";

import dynamic from "next/dynamic";
import { ControlsSkeleton } from "../Skeletons";
const Controls = dynamic(() => import("./Controls"), {
  ssr: false,
  loading: () => <ControlsSkeleton />,
});

type ControlsProps = {
  placeholder: "Cerca prodotto..." | "Cerca ordine...";
  filterField: "type" | "status";
  filterOptions: FilterOption[];
  sortByField: "sort";
  sortByOptions: SortOption[];
  children?: ReactNode;
};

function LazyControls({
  placeholder,
  filterField,
  filterOptions,
  sortByField,
  sortByOptions,
  children,
}: ControlsProps) {
  return (
    <Controls
      placeholder={placeholder}
      filterField={filterField}
      filterOptions={filterOptions}
      sortByField={sortByField}
      sortByOptions={sortByOptions}
    >
      {children}
    </Controls>
  );
}

export default LazyControls;
