"use client";

import { OrdersInfo } from "@/app/_lib/definitions";

import dynamic from "next/dynamic";
import { OrdersListSkeleton } from "../ui/Skeletons";
const OrdersList = dynamic(() => import("./OrdersList"), {
  ssr: false,
  loading: () => <OrdersListSkeleton />,
});

function OrdersListClient({ orders }: { orders: OrdersInfo[] }) {
  return <OrdersList orders={orders} />;
}

export default OrdersListClient;
