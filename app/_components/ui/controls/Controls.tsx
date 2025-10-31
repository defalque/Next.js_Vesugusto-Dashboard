"use client";

import { ReactNode } from "react";

import Filter from "./Filter";
import Search from "./Search";
import SortBy from "./SortBy";
import FiltersDrawer from "./FiltersDrawer";

import { FilterOption, SortOption } from "@/app/_lib/definitions";
import { ControlsProvider } from "@/app/_contexts/ControlsProvider";

type ControlsProps = {
  placeholder: "Cerca prodotto..." | "Cerca ordine...";
  filterField: "type" | "status";
  filterOptions: FilterOption[];
  sortByField: "sort";
  sortByOptions: SortOption[];
  children: ReactNode;
};

function Controls({
  placeholder,
  filterField,
  filterOptions,
  sortByField,
  sortByOptions,
  children,
}: ControlsProps) {
  return (
    <>
      <ControlsProvider>
        <Search placeholder={placeholder} />

        <Filter filterField={filterField} options={filterOptions} />

        <SortBy filterField={sortByField} options={sortByOptions} />

        <FiltersDrawer
          filterField={filterField}
          filterOptions={filterOptions}
          sortByField={sortByField}
          sortByOptions={sortByOptions}
        >
          {children}
        </FiltersDrawer>
      </ControlsProvider>
    </>
  );
}

export default Controls;
