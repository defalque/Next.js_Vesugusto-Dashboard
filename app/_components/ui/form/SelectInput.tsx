import React, { ComponentPropsWithoutRef } from "react";

type SelectInputProps = ComponentPropsWithoutRef<"select"> & {
  id: string;
  label: string;
  options: string[];
};

function SelectInput({ id, label, options, ...props }: SelectInputProps) {
  return (
    <div className="flex flex-col gap-1 text-sm/6">
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        {...props}
        className={`bg-style w-full appearance-none rounded-md border border-gray-300 px-2.5 py-1.5 text-base placeholder:text-sm focus:border-zinc-400 focus:ring-2 focus:ring-gray-300 focus:outline-none disabled:animate-pulse disabled:cursor-not-allowed disabled:opacity-35 dark:border-zinc-700 dark:placeholder:text-zinc-600 dark:focus:border-zinc-400 dark:focus:ring-zinc-600`}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option.at(0)?.toUpperCase() + option.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectInput;
