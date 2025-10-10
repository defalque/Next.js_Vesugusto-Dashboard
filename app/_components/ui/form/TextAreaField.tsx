import React, { ComponentPropsWithoutRef } from "react";

type TextAreaFieldProps = ComponentPropsWithoutRef<"textarea"> & {
  id: string;
  label: string;
};

function TextAreaField({ id, label, ...props }: TextAreaFieldProps) {
  return (
    <div className="flex flex-col gap-1 text-sm/6">
      <label htmlFor={id} className="font-medium">
        {label}
      </label>
      <textarea
        id={id}
        {...props}
        className="focus:border-brand-950 focus:ring-brand-950/20 h-50 w-full rounded-md border border-gray-300 px-2.5 py-1.5 text-sm transition-all duration-200 placeholder:text-gray-500 hover:border-gray-400 focus:ring-2 focus:outline-none disabled:cursor-not-allowed disabled:border-gray-200 sm:h-24 dark:border-gray-500 dark:bg-zinc-600/30"
      />
    </div>
  );
}

export default TextAreaField;
