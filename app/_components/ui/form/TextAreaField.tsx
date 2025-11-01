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
        className={`bg-style placeholder::py-2.5 h-60 w-full appearance-none rounded-md border border-gray-300 px-2.5 py-2.5 text-base/7 placeholder:text-sm focus:border-zinc-400 focus:ring-2 focus:ring-gray-300 focus:outline-none disabled:animate-pulse disabled:cursor-not-allowed disabled:opacity-35 sm:h-40 lg:h-30 dark:border-zinc-700 dark:placeholder:text-zinc-600 dark:focus:border-zinc-400 dark:focus:ring-zinc-600`}
      />
    </div>
  );
}

export default TextAreaField;
