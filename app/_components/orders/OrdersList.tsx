import Image from "next/image";

import { formatCurrency, formatDate } from "@/app/_lib/utils";

import { OrdersInfo } from "@/app/_lib/definitions";

import StatusTag from "./StatusTag";
import LazyDropdown from "../ui/dropdown/LazyDropdown";

function OrdersList({ orders }: { orders: OrdersInfo[] }) {
  return (
    <tbody className="divide-y divide-gray-200 bg-gray-50/30 text-gray-800/70 dark:divide-zinc-700/40 dark:bg-zinc-800/40 dark:text-gray-50/80">
      {orders.map((order) => (
        <tr
          key={order.id}
          className="w-full hover:bg-gray-50/60 dark:hover:bg-zinc-800/25"
        >
          <td className="px-4 py-4 whitespace-nowrap">{order.id}</td>

          <td className="px-4 text-sm whitespace-nowrap">
            <div className="flex items-center gap-3">
              <Image
                src={order.userId.image}
                className="flex-shrink-0 rounded-full"
                width={34}
                height={34}
                alt={`Immagine del profilo di ${order.name}`}
              />
              <div className="truncate">
                <p className="dark:text-light truncate font-medium text-neutral-700">
                  {order.name}
                </p>
                <p className="truncate text-zinc-500">{order.email}</p>
              </div>
            </div>
          </td>

          <td className="px-4 py-4 whitespace-nowrap">
            {formatDate(order.orderDate)}
          </td>
          <td className="px-4 py-4 text-center whitespace-nowrap">
            <StatusTag status={order.status} className="text-[10px]" />
          </td>
          <td className="px-4 py-4 whitespace-nowrap">
            {formatCurrency(order.totalCost)}
          </td>
          <td className="px-4 py-4 text-center whitespace-nowrap">
            <LazyDropdown
              type="page"
              variation="ordine"
              itemId={Number(order.id)}
              status={order.status}
            />
          </td>
        </tr>
      ))}
    </tbody>
  );
}

export default OrdersList;
