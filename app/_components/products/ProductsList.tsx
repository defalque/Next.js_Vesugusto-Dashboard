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

function ProductsList({ products }: { products: Product[] }) {
  return (
    <tbody className="divide-y divide-gray-200 bg-gray-50/30 text-gray-800/70 dark:divide-zinc-700/40 dark:bg-zinc-800/40 dark:text-gray-50/80">
      {products.map((product) => {
        const isLowStock = product.quantity <= 10 && product.quantity > 0;
        const isOutOfStock = product.quantity === 0;
        const baseClass = "hover:bg-gray-50/60 dark:hover:bg-zinc-800/25";
        let higlightClass;
        if (isOutOfStock) {
          higlightClass =
            "font-semibold bg-red-600/75 text-light text-shadow-2xs dark:bg-red-600/10 dark:text-red-400";
        } else if (isLowStock) {
          higlightClass =
            "font-semibold _text-shadow-2xs bg-amber-300 dark:bg-amber-500/10 dark:text-amber-500";
        }

        return (
          <tr
            key={product.id}
            className={higlightClass ? higlightClass : baseClass}
          >
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
          </tr>
        );
      })}
    </tbody>
  );
}

export default ProductsList;
