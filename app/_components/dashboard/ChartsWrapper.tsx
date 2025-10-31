"use client";

import { ReactNode } from "react";

import dynamic from "next/dynamic";
import { ChartsSkeleton } from "../ui/Skeletons";
const Charts = dynamic(() => import("./Charts"), {
  ssr: false,
  loading: () => <ChartsSkeleton />,
});

function ChartsWrapper({
  revenueChart,
  ordersChart,
}: {
  revenueChart: ReactNode;
  ordersChart: ReactNode;
}) {
  return <Charts revenueChart={revenueChart} ordersChart={ordersChart} />;
}

export default ChartsWrapper;
