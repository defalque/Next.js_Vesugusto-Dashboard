"use client";

import { Data } from "@/app/_lib/definitions";

import dynamic from "next/dynamic";
const RevenueChart = dynamic(() => import("./RevenueChart"), {
  ssr: false, // spesso disattivato per componenti dipendenti dal browser
  loading: () => <div className="spinner" />,
});

function RevenueChartClient({ data }: { data: Data[] }) {
  return <RevenueChart data={data} />;
}

export default RevenueChartClient;
