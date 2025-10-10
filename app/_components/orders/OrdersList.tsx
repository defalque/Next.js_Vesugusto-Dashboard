"use client";

import { formatCurrency, formatDate } from "@/app/_lib/utils";
import StatusTag from "./StatusTag";
import { OrdersInfo } from "@/app/_lib/definitions";

import dynamic from "next/dynamic";
const Dropdown = dynamic(() => import("../ui/dropdown/Dropdown"), {
  ssr: false,
  loading: () => (
    <div className="mx-auto h-7 w-7 rounded bg-gray-200 dark:bg-zinc-700"></div>
  ),
});

import ItemsListMotionWrapper from "../ui/ItemsListMotionWrapper";
import * as m from "motion/react-m";
import Image from "next/image";

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

function OrdersList({ orders }: { orders: OrdersInfo[] }) {
  return (
    <ItemsListMotionWrapper>
      <m.tbody
        key="list"
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="divide-y divide-zinc-700/10 text-gray-800/70 dark:divide-zinc-700/40 dark:bg-gradient-to-r dark:from-zinc-900 dark:to-zinc-800 dark:text-gray-50/80"
      >
        {orders.map((order) => (
          <m.tr
            variants={itemVariants}
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
                  <p className="truncate">{order.name}</p>
                  <p className="truncate">{order.email}</p>
                </div>
              </div>
            </td>

            <td className="px-4 py-4 whitespace-nowrap">
              {formatDate(order.orderDate)}
            </td>
            <td className="px-4 py-4 text-xs whitespace-nowrap">
              <StatusTag status={order.status} />
            </td>
            <td className="px-4 py-4 whitespace-nowrap">
              {formatCurrency(order.totalCost)}
            </td>
            <td className="px-4 py-4 text-center whitespace-nowrap">
              <Dropdown
                variation="ordine"
                itemId={Number(order.id)}
                status={order.status}
              />
            </td>
          </m.tr>
        ))}
      </m.tbody>
    </ItemsListMotionWrapper>
  );
}

export default OrdersList;
