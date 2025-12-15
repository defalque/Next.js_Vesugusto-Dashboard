"use client";

import { useRef, useState } from "react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/outline";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  type: string;
  placeholder?: string;
  label: string;
  showForgotPwd?: boolean;
  nonInteractive?: boolean;
};

function FormRow({
  type,
  placeholder,
  label,
  showForgotPwd,
  nonInteractive = false,
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  function handleOnClick() {
    setShowPassword((prev) => !prev);

    setTimeout(() => {
      if (ref.current) {
        ref.current.focus();
        ref.current.setSelectionRange(
          ref.current.value.length,
          ref.current.value.length,
        );
      }
    }, 0);
  }

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex justify-between text-base/6">
        <label
          htmlFor={type + "-"}
          className="text-[15px] font-semibold sm:text-sm"
        >
          {label}
        </label>
        {type === "password" && showForgotPwd && (
          <a
            href="#"
            className="focus dark:text-light self-end rounded text-xs font-medium text-neutral-700 transition-colors duration-300 hover:underline"
          >
            Password dimenticata?
          </a>
        )}
      </div>

      <div className="relative">
        <input
          ref={ref}
          id={type + "-"}
          placeholder={placeholder}
          type={type === "password" ? (showPassword ? "text" : type) : type}
          className={`bg-style focus:border-brand-950 focus:ring-brand-950/20 w-full appearance-none rounded-md border border-gray-300 px-2.5 py-1.5 text-base placeholder:text-sm focus:ring-[3px] focus:outline-none md:py-2 md:text-sm ${!nonInteractive && "disabled:animate-pulse"} disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:placeholder:text-zinc-600 dark:focus:border-zinc-400 dark:focus:ring-zinc-600 dark:disabled:opacity-25`}
          {...props}
        />
        {type === "password" && (
          <button
            type="button"
            aria-label={showPassword ? "Nascondi password" : "Mostra password"}
            onClick={handleOnClick}
            className="touch-hitbox absolute top-1/2 right-0 size-4 -translate-1/2 cursor-pointer text-gray-700 dark:text-gray-100"
          >
            {showPassword ? (
              <EyeSlashIcon aria-hidden="true" />
            ) : (
              <EyeIcon aria-hidden="true" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}

export default FormRow;
