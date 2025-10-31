import type { ComponentPropsWithoutRef } from "react";

type FileInputProps = ComponentPropsWithoutRef<"input"> & {
  label: string;
};

function FileInput({ label, ...props }: FileInputProps) {
  return (
    <div className="mt-3 flex flex-col justify-baseline gap-3 md:flex-row">
      <label
        htmlFor={label.toLowerCase().replace("", "-")}
        className="font-medium"
      >
        {label}:
      </label>
      <input
        id={label.toLowerCase().replace("", "-")}
        type="file"
        {...props}
        className="file:text-brand-50 file:bg-brand-950 file:dark:hover:bg-brand-dark-400 file:dark:bg-brand-dark-600 file:hover:bg-brand-900 file:dark:border-brand-dark-200 file:dark:hover:border-brand-dark-100 focus-visible:outline-brand-950 outline-brand-dark-100 rounded-sm border-none text-sm font-medium text-shadow-2xs file:mr-5 file:cursor-pointer file:rounded-sm file:px-5 file:py-2 file:font-semibold file:transition-colors file:duration-200 focus-visible:outline-2 file:dark:border file:dark:inset-shadow-none"
      ></input>
    </div>
  );
}

export default FileInput;
