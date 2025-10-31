"use client";

import { Data } from "@/app/_lib/definitions";

import dynamic from "next/dynamic";
import { OrdersAreaChartSkeleton } from "../ui/Skeletons";
const OrdersAreaChart = dynamic(() => import("./OrdersAreaChart"), {
  ssr: false,
  loading: () => <OrdersAreaChartSkeleton />,
});

function LazyOrdersAreaChart({ data }: { data: Data[] }) {
  return <OrdersAreaChart data={data} />;
}

export default LazyOrdersAreaChart;
