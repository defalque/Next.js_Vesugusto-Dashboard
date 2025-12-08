import type { ComponentPropsWithoutRef, ReactNode } from "react";

type ItemsTableHeadingCellProps = ComponentPropsWithoutRef<"th"> & {
  children: ReactNode;
  className?: string;
};

function ItemsTableHeadingCell({
  className,
  children,
  ...props
}: ItemsTableHeadingCellProps) {
  return (
    <th
      scope="col"
      {...props}
      className={`dark:text-light/80 px-4 py-3 text-sm font-medium tracking-wide text-neutral-700 ${className ? className : "text-left"}`}
    >
      {children}
    </th>
  );
}

export default ItemsTableHeadingCell;
