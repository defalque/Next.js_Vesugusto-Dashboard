import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  children: ReactNode;
  href?: string;
  isPaginationButton?: boolean;
};

// const variation = {
//   base: "text-brand-50 dark:border-brand-dark-300 focus:dark:ring-brand-950 focus:ring-brand-dark-300 bg-brand-950 hover:bg-brand-800 dark:hover:bg-brand-950/40 disabled:bg-brand-800 dark:bg-brand-950/25 block cursor-pointer rounded-sm py-1 font-semibold transition-colors duration-300 text-shadow-md/10 focus:ring-4 focus:outline-none disabled:dark:bg-brand-950/15 disabled:dark:border-brand-950/15 disabled:cursor-not-allowed dark:border",

//   pagination:
//     "text-brand-50 dark:border-brand-dark-300 bg-brand-950 hover:bg-brand-800 dark:hover:bg-brand-950/40 dark:bg-brand-950/25 flex items-center cursor-pointer rounded-sm px-2 py-1 font-semibold transition-colors duration-300 text-shadow-md/10 focus:outline disabled:cursor-not-allowed disabled:border-none disabled:bg-transparent dark:border py-2 disabled:text-dark disabled:dark:text-brand-50 disabled:text-shadow-none focus-visible:outline-brand-950 outline-brand-dark-100 focus-visible:outline-2",
// };

const variation = {
  base: "text-brand-50 dark:border-brand-dark-200 focus-visible:dark:ring-brand-950 focus-visible:ring-brand-dark-300 bg-brand-950 hover:bg-brand-900 dark:hover:bg-brand-dark-400 disabled:bg-brand-900 shadow-sm disabled:shadow-none disabled:text-shadow-none dark:bg-brand-dark-600 block cursor-pointer rounded-sm py-1 font-semibold transition-colors duration-300 text-shadow-md/10 focus-visible:ring-4 focus-visible:outline-none disabled:dark:bg-brand-950/15 disabled:dark:border-brand-950/15 disabled:cursor-not-allowed dark:border",

  pagination:
    "text-brand-50 dark:border-brand-dark-200 bg-brand-950 hover:bg-brand-900 dark:hover:bg-brand-dark-400 dark:bg-brand-dark-600 flex items-center cursor-pointer rounded-sm px-2 py-1 font-semibold transition-colors duration-300 text-shadow-md/10 focus-visible:outline disabled:cursor-not-allowed disabled:border-none disabled:bg-transparent dark:border py-2 shadow-sm disabled:shadow-none disabled:text-shadow-none disabled:text-dark disabled:dark:text-brand-50 disabled:text-shadow-none focus-visible:outline-brand-dark-300 focus-visible:dark:ring-brand-950 focus-visible:ring-brand-dark-300 outline-brand-dark-100 focus-visible:ring-4 focus-visible:outline-none",
};

function Button({
  className = "",
  href,
  isPaginationButton,
  children,
  ...props
}: ButtonProps) {
  const buttonClasses = ` ${
    isPaginationButton ? variation.pagination : variation.base
  } ${className}`;

  if (href) {
    return (
      <Link href={href} className={buttonClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
}

export default Button;
