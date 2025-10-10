import { ReactNode } from "react";

function OrderHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="mb-3 text-lg font-semibold text-gray-900 dark:text-gray-100">
      {children}
    </h2>
  );
}

export default OrderHeading;
