"use client";

import { LatestOrdersInfo } from "@/app/_lib/definitions";

import dynamic from "next/dynamic";
import { OrdersActivityBodySkeleton } from "../../ui/Skeletons";
const OrdersActivity = dynamic(() => import("./OrdersActivity"), {
  ssr: false,
  loading: () => <OrdersActivityBodySkeleton />,
});

function LazyOrdersActivity({ orders }: { orders: LatestOrdersInfo[] }) {
  return <OrdersActivity orders={orders} />;
}

export default LazyOrdersActivity;
