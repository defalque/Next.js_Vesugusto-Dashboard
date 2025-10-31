import { Suspense } from "react";

import Stats from "@/app/_components/dashboard/Stats";
import OrdersActivityWrapper from "@/app/_components/dashboard/OrdersActivityWrapper";
import BestSellerChartWrapper from "@/app/_components/dashboard/BestSellerChartWrapper";
import ChartsWrapper from "@/app/_components/dashboard/ChartsWrapper";
import RevenueChartWrapper from "@/app/_components/dashboard/RevenueChartWrapper";
import OrdersChartWrapper from "@/app/_components/dashboard/OrdersChartWrapper";

import DialogContextProvider from "@/app/_contexts/DialogContext";
import CustomDialogWrapper from "@/app/_components/ui/dialog/CustomDialogWrapper";

import {
  BestSellersSkeleton,
  OrdersActivitySkeleton,
  OrdersAreaChartSkeleton,
  RevenueChartSkeleton,
  StatsSkeleton,
} from "@/app/_components/ui/Skeletons";

export const metadata = {
  title: "Dashboard",
};

export default function Page() {
  return (
    <>
      <div className="grid grid-cols-2 grid-rows-[auto_22rem_auto_1fr] gap-x-8 gap-y-12 md:grid-cols-[1fr_1fr] md:grid-rows-[auto_28rem_auto_1fr] lg:grid-cols-[1fr_1fr] lg:grid-rows-[auto_auto_1fr]">
        <div className="col-span-full">
          <Suspense fallback={<StatsSkeleton />}>
            <Stats />
          </Suspense>
        </div>

        <Suspense fallback={<BestSellersSkeleton />}>
          <BestSellerChartWrapper />
        </Suspense>

        <DialogContextProvider>
          <Suspense fallback={<OrdersActivitySkeleton />}>
            <OrdersActivityWrapper />
          </Suspense>

          <CustomDialogWrapper />
        </DialogContextProvider>

        <ChartsWrapper
          revenueChart={
            <Suspense fallback={<RevenueChartSkeleton />}>
              <RevenueChartWrapper />
            </Suspense>
          }
          ordersChart={
            <Suspense fallback={<OrdersAreaChartSkeleton />}>
              <OrdersChartWrapper />
            </Suspense>
          }
        />
      </div>
    </>
  );
}
