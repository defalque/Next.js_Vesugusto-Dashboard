"use client";

import { Data } from "@/app/_lib/definitions";

import dynamic from "next/dynamic";
import { RevenueChartSkeleton } from "../../ui/Skeletons";
const RevenueChart = dynamic(() => import("./RevenueChart"), {
  ssr: false,
  loading: () => <RevenueChartSkeleton />,
});

function LazyRevenueChart({ data }: { data: Data[] }) {
  return <RevenueChart data={data} />;
}

export default LazyRevenueChart;
