import { ComponentPropsWithoutRef, ReactNode } from "react";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  className: string;
  children: ReactNode;
};

const variation = {
  base: "text-brand-50 dark:border-brand-dark-300 dark:hover:border-brand-dark-100 focus:dark:ring-brand-950 focus:ring-brand-dark-300 bg-brand-950 hover:bg-brand-800 dark:hover:bg-brand-950/40 disabled:bg-brand-800 dark:bg-brand-950/25 block cursor-pointer rounded-sm py-1 font-semibold transition-colors duration-300 text-shadow-md/10 focus:ring-4 focus:outline-none disabled:dark:bg-brand-950/15 disabled:dark:border-brand-950/15 disabled:cursor-not-allowed dark:border",
};

function DialogButton({ className, children, ...props }: ButtonProps) {
  const buttonClasses = `${variation.base} ${className}`;

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
}

export default DialogButton;
