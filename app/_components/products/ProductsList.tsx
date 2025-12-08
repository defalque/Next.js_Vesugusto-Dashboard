"use client";

import { formatCurrency, formatType } from "@/app/_lib/utils";

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
    <tbody className="divide-y divide-gray-200/80 text-gray-800/70 dark:divide-zinc-700/20 dark:text-gray-50/80">
      {products.map((product) => {
        const isLowStock = product.quantity <= 10 && product.quantity > 0;
        const isOutOfStock = product.quantity === 0;
        const baseClass = "hover:bg-gray-100/60 dark:hover:bg-zinc-700/20";
        let higlightClass;
        if (isOutOfStock) {
          higlightClass =
            "_font-semibold _bg-red-600/10 _dark:bg-red-600/5 hover:bg-gray-100/60 dark:hover:bg-zinc-700/20";
        } else if (isLowStock) {
          higlightClass =
            "_font-semibold _bg-yellow-400/10 _dark:bg-yellow-500/5 hover:bg-gray-100/60 dark:hover:bg-zinc-700/20";
        }

        return (
          <tr
            key={product.id}
            className={higlightClass ? higlightClass : baseClass}
          >
            <td className="px-4 py-3 font-medium whitespace-nowrap">
              {product.name}
            </td>
            <td className="px-4 py-3 font-medium whitespace-nowrap">
              {formatCurrency(product.regularPrice)}
            </td>
            <td className="px-4 py-3 whitespace-nowrap">
              {product.discount ? (
                formatCurrency(product.discount)
              ) : (
                <span className="dark:text-light/30 text-gray-400">
                  {formatCurrency(0)}
                </span>
              )}
            </td>
            <td className="px-4 py-3 text-left whitespace-nowrap capitalize">
              {formatType(product.type)}
            </td>
            <td className="px-4 py-3 text-center font-medium whitespace-nowrap">
              {product.quantity === 0 ? (
                <span className="rounded-lg bg-red-500/10 px-2 py-1 text-xs text-red-500 dark:text-red-400">
                  Fuori scorta
                </span>
              ) : product.quantity <= 10 ? (
                <span className="rounded-lg bg-yellow-400/10 px-2 py-1 text-xs text-yellow-600 dark:text-yellow-400">
                  In esaurimento
                </span>
              ) : (
                <span>{product.quantity}</span>
              )}
            </td>
            <td className="px-4 py-3 text-center whitespace-nowrap">
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
