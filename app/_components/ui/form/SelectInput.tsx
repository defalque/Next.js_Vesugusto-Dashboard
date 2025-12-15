import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { ComponentPropsWithoutRef } from "react";

type SelectInputProps = ComponentPropsWithoutRef<"select"> & {
  id: string;
  label: string;
  options: string[];
};

function SelectInput({ id, label, options, ...props }: SelectInputProps) {
  return (
    <div className="flex flex-col gap-2 text-sm/6">
      <label htmlFor={id} className="text-[15px] font-semibold sm:text-sm">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          {...props}
          className={`bg-style focus:border-brand-950 peer focus:ring-brand-950/20 w-full appearance-none rounded-md border border-gray-300 px-2.5 py-1.5 text-base placeholder:text-sm focus:ring-[3px] focus:outline-none disabled:animate-pulse disabled:cursor-not-allowed disabled:opacity-35 dark:border-zinc-700 dark:placeholder:text-zinc-600 dark:focus:border-zinc-400 dark:focus:ring-zinc-600`}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option.at(0)?.toUpperCase() + option.slice(1)}
            </option>
          ))}
        </select>
        <ChevronDownIcon className="peer-focus:text-brand-950 absolute top-1/2 right-0 size-4 -translate-1/2 text-gray-400 dark:text-zinc-600 dark:peer-focus:text-zinc-400" />
      </div>
    </div>
  );
}

export default SelectInput;
