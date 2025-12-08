"use client";

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";

import {
  AdjustmentsVerticalIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import { useControlsContext } from "@/app/_contexts/ControlsProvider";
import { FilterOption } from "@/app/_lib/definitions";

type FilterProps = {
  filterField: "status" | "type";
  options: FilterOption[];
};

function Filter({ filterField, options }: FilterProps) {
  const { router, pathname, createQueryString, urlSearchParams } =
    useControlsContext();

  const activeStatusFilter =
    urlSearchParams.get(filterField) || options[0].value;

  const selected =
    options.find((opt) => opt.value === activeStatusFilter) ?? options[0];
  const selectedLabel = selected.label;

  const handleChange = (option: FilterOption) => {
    router.push(pathname + "?" + createQueryString(filterField, option.value));
  };

  return (
    <div className="hidden lg:flex">
      <Listbox value={selected} by="value" onChange={handleChange}>
        <div className="relative w-52">
          <ListboxButton className="data-focus:border-brand-950 data-focus:ring-brand-950/20 relative h-full w-full cursor-pointer rounded-lg border border-gray-300 py-2 pr-8 pl-3 text-left text-black shadow-sm focus:not-data-focus:outline-none data-focus:ring-4 data-focus:outline-none dark:border-zinc-700/60 dark:bg-zinc-700/35 dark:text-white dark:data-focus:border-zinc-400 dark:data-focus:ring-zinc-600">
            {selectedLabel}
            <AdjustmentsVerticalIcon
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

export default Filter;

// const containerRef = useRef<HTMLDivElement | null>(null);
// const activeTabElementRef = useRef<HTMLButtonElement | null>(null);
// const [activeTab, setActiveTab] = useState(
//   searchParams.get(filterField) || options[0].value,
// );

// useEffect(() => {
//   const container = containerRef.current;

//   if (activeTab && container) {
//     const activeTabElement = activeTabElementRef.current;

//     if (activeTabElement) {
//       const { offsetLeft, offsetWidth } = activeTabElement;

//       const clipLeft = offsetLeft;
//       const clipRight = offsetLeft + offsetWidth;
//       container.style.clipPath = `inset(0 ${Number(100 - (clipRight / container.offsetWidth) * 100).toFixed()}% 0 ${Number((clipLeft / container.offsetWidth) * 100).toFixed()}% round 4px)`;
//     }
//   }
// }, [activeTab, activeTabElementRef, containerRef]);

// <div className="relative">
//   <ul className="relative flex h-9 items-center justify-center gap-3 px-1 font-semibold">
//     {options.map((option) => (
//       <li key={option.value}>
//         <button
//           ref={activeTab === option.value ? activeTabElementRef : null}
//           className={`focus relative cursor-pointer rounded px-2 py-1`}
//           onClick={() => {
//             router.push(
//               pathname + "?" + createQueryString(filterField, option.value),
//             );
//             setActiveTab(option.value);
//           }}
//           disabled={activeTab === option.value}
//         >
//           {option.label}
//         </button>
//       </li>
//     ))}
//   </ul>

//   <div
//     aria-hidden
//     className="absolute top-0 z-100 h-full w-full overflow-hidden"
//     style={{
//       clipPath: "inset(0px 10% 0px 0% round 4px)",
//       transition: "clip-path 0.25s ease",
//     }}
//     ref={containerRef}
//   >
//     <ul className="dark:bg-brand-950/45 bg-brand-950 relative flex h-9 items-center justify-center gap-3 px-1 font-semibold">
//       {options.map((option) => (
//         <li key={option.value}>
//           <button
//             tabIndex={-1}
//             className={`focus relative z-10 cursor-pointer rounded px-2 py-1 text-white`}
//             onClick={() => {
//               router.push(
//                 pathname +
//                   "?" +
//                   createQueryString(filterField, option.value),
//               );
//               setActiveTab(option.value);
//             }}
//             disabled={activeTab === option.value}
//           >
//             {option.label}
//           </button>
//         </li>
//       ))}
//     </ul>
//   </div>
// </div>
