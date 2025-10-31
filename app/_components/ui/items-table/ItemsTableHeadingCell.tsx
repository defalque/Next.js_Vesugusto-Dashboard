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
      className={`dark:text-light px-4 py-3 text-sm font-semibold tracking-wider text-neutral-700 uppercase ${className ? className : "text-left"}`}
    >
      {children}
    </th>
  );
}

export default ItemsTableHeadingCell;
