"use client";

import { formatCurrency } from "@/app/_lib/utils";

import { Product } from "@/app/_lib/definitions";

import dynamic from "next/dynamic";
const Dropdown = dynamic(() => import("../ui/dropdown/Dropdown"), {
  ssr: false,
  loading: () => (
    <div className="mx-auto h-5 w-5 rounded bg-gray-200 dark:bg-zinc-700"></div>
  ),
});

import ItemsListMotionWrapper from "../ui/ItemsListMotionWrapper";
import * as m from "motion/react-m";

const containerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

function ProductsList({ products }: { products: Product[] }) {
  return (
    <ItemsListMotionWrapper>
      <m.tbody
        key="list"
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="divide-y divide-zinc-700/10 text-gray-800/70 dark:divide-zinc-700/40 dark:bg-gradient-to-r dark:from-zinc-900 dark:to-zinc-800 dark:text-gray-50/80"
      >
        {products.map((product) => {
          const isLowStock = product.quantity <= 10 && product.quantity > 0;
          const isOutOfStock = product.quantity === 0;
          let rowClass = "hover:bg-gray-50/60 dark:hover:bg-zinc-800/25";
          if (isOutOfStock) {
            rowClass += " font-semibold text-red-500";
          } else if (isLowStock) {
            rowClass +=
              " font-semibold text-yellow-600/90 dark:text-yellow-500";
          }

          return (
            <m.tr variants={itemVariants} key={product.id} className={rowClass}>
              <td className="px-4 py-4 whitespace-nowrap">{product.name}</td>
              <td className="px-4 py-4 whitespace-nowrap">
                {formatCurrency(product.regularPrice)}
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                {product.discount ? formatCurrency(product.discount) : "-"}
              </td>
              <td className="px-4 py-4 text-left whitespace-nowrap capitalize">
                {product.type}
              </td>
              <td className="px-4 py-4 text-center font-semibold whitespace-nowrap">
                {product.quantity}
              </td>
              <td className="px-4 py-4 text-center whitespace-nowrap">
                <Dropdown
                  variation="prodotto"
                  itemId={product.id}
                  itemName={product.name}
                />
              </td>
            </m.tr>
          );
        })}
      </m.tbody>
    </ItemsListMotionWrapper>
  );
}

export default ProductsList;
