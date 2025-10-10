"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

type Option = {
  value: string;
  label: string;
};

type FilterProps = {
  filterField: string;
  options: Option[];
};

function Filter({ filterField, options }: FilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentFilter = searchParams.get(filterField) || options[0].value;

  // Get a new searchParams string by merging the current searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (filterField: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", "1");
      params.set(filterField, value);

      return params.toString();
    },
    [searchParams],
  );

  return (
    <div className="flex items-center gap-3 rounded border border-gray-200 p-1 font-semibold shadow-xs dark:border-zinc-700">
      {options.map((option) => (
        <button
          key={option.value}
          className={`dark:text-brand-50 focus:ring-brand-dark-300 focus-visible:outline-brand-950 outline-brand-dark-100 inset-shadow-brand-50/60 hover:bg-brand-950 dark:hover:bg-brand-950/25 dark:hover:border-brand-dark-300 hover:text-brand-50 relative z-10 cursor-pointer rounded px-1.5 py-1 inset-shadow-sm hover:transition-colors hover:duration-200 focus-visible:outline-2 dark:inset-shadow-none ${currentFilter === option.value && "text-brand-50 dark:bg-brand-950/25 bg-brand-950 dark:border-brand-dark-300 dark:border"}`}
          onClick={() => {
            router.push(
              pathname + "?" + createQueryString(filterField, option.value),
            );
          }}
          disabled={currentFilter === option.value}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export default Filter;
