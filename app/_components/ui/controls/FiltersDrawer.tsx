"use client";

import { ListBulletIcon } from "@heroicons/react/24/outline";
import { ReactNode, useState } from "react";
import { Drawer } from "vaul";
import DrawerSortBy from "./DrawerSortBy";
import DrawerFilter from "./DrawerFilter";
import { FilterOption, SortOption } from "@/app/_lib/definitions";

type FiltersDrawerProps = {
  filterField: "type" | "status";
  filterOptions: FilterOption[];
  sortByField: "sort";
  sortByOptions: SortOption[];
  children?: ReactNode;
};

export default function FiltersDrawer({
  filterField,
  filterOptions,
  sortByField,
  sortByOptions,
  children,
}: FiltersDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex lg:hidden">
      <button
        className="focus-visible:shadow-focus-ring-button dark:text-light rounded-md border border-gray-300 bg-white px-4 py-2 font-medium text-neutral-700 transition-colors hover:bg-gray-100/70 md:font-medium dark:border-zinc-700 dark:bg-zinc-900/60 dark:hover:bg-zinc-800/70"
        onClick={() => setIsOpen(true)}
      >
        <ListBulletIcon className="size-6" />
      </button>
      <Drawer.Root open={isOpen} onOpenChange={setIsOpen}>
        <Drawer.Portal>
          <Drawer.Overlay
            className="fixed inset-0 z-250 bg-black/5 lg:hidden dark:bg-black/20"
            onClick={() => setIsOpen(false)}
          />
          <Drawer.Content className="fixed right-0 bottom-0 left-0 z-250 mt-24 flex h-fit flex-col rounded-t-[10px] outline-none lg:hidden dark:bg-zinc-800">
            <div className="flex-1 rounded-t-[10px] bg-white p-4 dark:bg-zinc-900/60">
              <div
                aria-hidden
                className="mx-auto mb-8 h-1.5 w-12 flex-shrink-0 rounded-full bg-gray-200 dark:bg-zinc-600"
              />
              <div className="mx-auto max-w-2xl">
                <Drawer.Title className="dark:text-light sr-only mb-4 font-medium text-neutral-700">
                  Drawer for React.
                </Drawer.Title>

                {children}

                <div className="dark:text-light divide-y divide-gray-200 text-neutral-700 dark:divide-zinc-700/50">
                  <DrawerFilter
                    filterField={filterField}
                    options={filterOptions}
                    onClose={setIsOpen}
                  />
                  <DrawerSortBy
                    filterField={sortByField}
                    options={sortByOptions}
                    onClose={setIsOpen}
                  />
                </div>
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  );
}
