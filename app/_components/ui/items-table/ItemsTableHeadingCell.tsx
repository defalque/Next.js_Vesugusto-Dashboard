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
      className={`px-4 py-3 font-medium tracking-wider uppercase ${className ? className : "text-left"}`}
    >
      {children}
    </th>
  );
}

export default ItemsTableHeadingCell;
