"use client";

import { Data } from "@/app/_lib/definitions";

import dynamic from "next/dynamic";
const OrdersAreaChart = dynamic(() => import("./OrdersAreaChart"), {
  ssr: false, // spesso disattivato per componenti dipendenti dal browser
  loading: () => <div className="spinner" />,
});

function OrdersAreaChartClient({ data }: { data: Data[] }) {
  return <OrdersAreaChart data={data} />;
}

export default OrdersAreaChartClient;
