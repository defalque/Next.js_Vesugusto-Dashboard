"use client";

import { useDateRangeContext } from "@/app/_contexts/DateRangeProvider";
import { DateRange } from "@/app/_lib/definitions";
import { Select } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/24/solid";

function DateRangePicker() {
  const { router, pathname, createQueryString, urlSearchParams } =
    useDateRangeContext();

  const activeDateRange = urlSearchParams.get("dateRange") || "last-7-days";

  const selected =
    ["last-7-days", "last-month", "last-year"].find(
      (opt) => opt === activeDateRange,
    ) ?? "last-7-days";

  const handleChange = (option: DateRange) => {
    router.push(pathname + "?" + createQueryString("dateRange", option));
  };

  return (
    <div className="relative">
      <Select
        value={selected}
        onChange={(e) => handleChange(e.target.value as DateRange)}
        name="dateRange"
        aria-label="Data range"
        className="data-focus:outline-brand-950 w-42 appearance-none rounded-lg border border-gray-300 px-2.5 py-2 shadow-xs transition-colors duration-100 ease-in hover:border-gray-400/70 focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 dark:border-zinc-700 dark:bg-zinc-700/35 dark:hover:border-zinc-600/80"
      >
        <option value="last-7-days">Ultima settimana</option>
        <option value="last-month">Ultimo mese</option>
        <option value="last-year">Ultimo anno</option>
      </Select>
      <ChevronUpDownIcon
        className="group pointer-events-none absolute top-1/2 right-2 size-4 -translate-y-1/2 fill-black dark:fill-white"
        aria-hidden="true"
      />
    </div>
  );
}

export default DateRangePicker;
