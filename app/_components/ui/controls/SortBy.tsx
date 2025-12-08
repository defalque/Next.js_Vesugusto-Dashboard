"use client";

import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/react";

import { ArrowsUpDownIcon, CheckIcon } from "@heroicons/react/24/outline";
import { useControlsContext } from "@/app/_contexts/ControlsProvider";
import { SortOption } from "@/app/_lib/definitions";

function SortBy({
  filterField,
  options,
}: {
  filterField: "sort";
  options: SortOption[];
}) {
  const { router, pathname, createQueryString, urlSearchParams } =
    useControlsContext();

  const activeSortFilter = urlSearchParams.get(filterField) ?? "most-recent";

  const selected =
    options.find((opt) => opt.value === activeSortFilter) ?? options[0];
  const selectedLabel = selected.label;

  const handleChange = (option: SortOption) => {
    router.push(pathname + "?" + createQueryString("sort", option.value));
  };

  return (
    <div className="hidden lg:flex">
      <Listbox value={selected} by="value" onChange={handleChange}>
        <div className="relative w-52">
          <ListboxButton className="data-focus:border-brand-950 data-focus:ring-brand-950/20 relative h-full w-full cursor-pointer rounded-lg border border-gray-300 py-2.5 pr-8 pl-3 text-left text-black shadow-sm focus:not-data-focus:outline-none data-focus:ring-4 data-focus:outline-none dark:border-zinc-700/60 dark:bg-zinc-700/35 dark:text-white dark:data-focus:border-zinc-400 dark:data-focus:ring-zinc-600">
            {selectedLabel}
            <ArrowsUpDownIcon
              className="group pointer-events-none absolute top-1/2 right-2.5 size-5 -translate-y-1/2 dark:text-white"
              aria-hidden="true"
            />
          </ListboxButton>
        </div>

        <ListboxOptions
          modal={false}
          anchor="bottom"
          transition
          className="w-(--button-width) rounded-lg border border-gray-300 bg-white p-1 text-white transition duration-100 ease-in [--anchor-gap:--spacing(1)] focus:outline-none data-leave:data-closed:opacity-0 dark:border-zinc-700 dark:bg-zinc-950"
        >
          {options.map((option) => (
            <ListboxOption
              key={option.value}
              value={option}
              className="group data-focus:bg-brand-950/10 flex cursor-default items-center gap-2 rounded px-3 py-1.5 select-none dark:data-focus:bg-zinc-800/85"
            >
              <CheckIcon className="invisible size-4 text-black group-data-selected:visible dark:text-white" />
              <div className="text-sm/6 text-zinc-700 dark:text-white">
                {option.label}
              </div>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </div>
  );
}

export default SortBy;

// return (
//   <div className="w-max">
//     <label htmlFor="ordina" className="sr-only">
//       Ordina
//     </label>
//     <select
//       id="ordina"
//       name="ordina"
//       aria-label="Ordina prodotti"
//       title="Ordina prodotti per prezzo o data creazione"
//       value={activeSortFilter}
//       onChange={(e) => {
//         const value = e.target.value;
//         router.push(pathname + "?" + createQueryString("sort", value));
//       }}
//       className="focus-visible:outline-brand-950 outline-brand-dark-100 block rounded border border-gray-200 px-1 py-3 text-sm shadow focus-visible:outline-2 dark:border-zinc-700"
//     >
//       <option value="default">Ordina</option>
//       <option value="price-asc">Prezzo: dal più basso</option>
//       <option value="price-desc">Prezzo: dal più alto</option>
//     </select>
//   </div>
// );
