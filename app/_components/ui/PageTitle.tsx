import type { ComponentPropsWithoutRef, ReactNode } from "react";

type PageTitleProps = ComponentPropsWithoutRef<"h1"> & {
  children: ReactNode;
};

function PageTitle({ children, ...props }: PageTitleProps) {
  return (
    <h1
      className="_dark:bg-zinc-800/40 _bg-gray-50 _px-6 w-fit rounded py-2 text-xl md:text-2xl"
      {...props}
    >
      {children}
    </h1>
  );
}

export default PageTitle;
