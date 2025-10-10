import type { ComponentPropsWithoutRef, ReactNode } from "react";

type HeadingFormHiddenProps = ComponentPropsWithoutRef<"h1"> & {
  children: ReactNode;
};

function HeadingFormHidden({ children, ...props }: HeadingFormHiddenProps) {
  return <div {...props}>{children}</div>;
}

export default HeadingFormHidden;
