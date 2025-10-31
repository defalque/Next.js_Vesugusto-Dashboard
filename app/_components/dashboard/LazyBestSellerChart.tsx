"use client";

import dynamic from "next/dynamic";
import { BestSellersChartSkeleton } from "../ui/Skeletons";
const BestSellersChart = dynamic(() => import("./BestSellerChart"), {
  ssr: false,
  loading: () => <BestSellersChartSkeleton />,
});

type Data = {
  id: number;
  name: string;
  value: number;
};

function LazyBestSellerChart({ data }: { data: Data[] }) {
  return <BestSellersChart data={data} />;
}

export default LazyBestSellerChart;
