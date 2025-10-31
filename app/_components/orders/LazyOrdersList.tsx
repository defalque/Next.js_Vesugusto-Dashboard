"use client";

import { OrdersInfo } from "@/app/_lib/definitions";

import dynamic from "next/dynamic";
import { OrdersListBodySkeleton } from "../ui/Skeletons";
const OrdersList = dynamic(() => import("./OrdersList"), {
  ssr: false,
  loading: () => <OrdersListBodySkeleton />,
});

function LazyOrdersList({ orders }: { orders: OrdersInfo[] }) {
  return <OrdersList orders={orders} />;
}

export default LazyOrdersList;
