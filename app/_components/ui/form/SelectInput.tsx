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
        className="focus:border-brand-950 focus:ring-brand-950/20 w-full rounded-md border border-gray-300 px-2.5 py-1.5 text-sm transition-all duration-200 placeholder:text-gray-500 hover:border-gray-400 focus:ring-2 focus:outline-none disabled:cursor-not-allowed disabled:border-gray-200 dark:border-gray-500 dark:bg-zinc-600/30"
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
