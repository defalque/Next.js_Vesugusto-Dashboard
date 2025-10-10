"use client";

import dynamic from "next/dynamic";
import { BestSellersChartSkeleton } from "../ui/Skeletons";
// import BestSellersChart from "./BestSellerChart";
const BestSellersChart = dynamic(() => import("./BestSellerChart"), {
  ssr: false, // spesso disattivato per componenti dipendenti dal browser
  loading: () => <BestSellersChartSkeleton />,
});

type Data = {
  id: number;
  name: string;
  value: number;
};

function BestSellerChartClient({ data }: { data: Data[] }) {
  return <BestSellersChart data={data} />;
}

export default BestSellerChartClient;
