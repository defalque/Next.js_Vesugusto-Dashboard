"use client";

import { CheckIcon } from "@heroicons/react/24/outline";
import { FilterOption } from "@/app/_lib/definitions";
import { useControlsContext } from "@/app/_contexts/ControlsProvider";

type FilterProps = {
  filterField: "status" | "type";
  options: FilterOption[];
  onClose: (state: boolean) => void;
};

function DrawerFilter({ filterField, options, onClose }: FilterProps) {
  const { router, pathname, createQueryString, urlSearchParams } =
    useControlsContext();

  const activeStatusFilter =
    urlSearchParams.get(filterField) || options[0].value;

  const handleChange = (option: FilterOption) => {
    router.push(pathname + "?" + createQueryString(filterField, option.value));
  };

  return (
    <div className="py-2">
      <h5 className="p-2 text-xs tracking-wide text-zinc-500/90 dark:text-zinc-500">
        Filtri
      </h5>
      <ul className="space-y-1 text-sm">
        {options.map((option) => (
          <li key={option.value}>
            <button
              onClick={() => {
                handleChange(option);
                onClose(false);
              }}
              className={`${activeStatusFilter === option.value && "bg-gray-200/50 dark:bg-zinc-900"} flex w-full cursor-pointer justify-between rounded-md px-2 py-3 hover:bg-gray-200/50 dark:hover:bg-zinc-900`}
            >
              {option.label}
              {activeStatusFilter === option.value && (
                <CheckIcon className="size-5" />
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DrawerFilter;
