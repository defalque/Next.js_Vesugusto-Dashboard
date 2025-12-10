import { Suspense } from "react";
import {
  BestSellersSkeleton,
  OrdersActivitySkeleton,
  OrdersAreaChartSkeleton,
  RevenueChartSkeleton,
  StatsSkeleton,
} from "../ui/Skeletons";
import BestSellerChartWrapper from "./BestSellerChartWrapper";
import DialogContextProvider from "@/app/_contexts/DialogContext";
import OrdersActivityWrapper from "./OrdersActivityWrapper";
import CustomDialogWrapper from "../ui/dialog/CustomDialogWrapper";
import ChartsWrapper from "./ChartsWrapper";
import RevenueChartWrapper from "./RevenueChartWrapper";
import OrdersChartWrapper from "./OrdersChartWrapper";
import { DateRangeParams } from "@/app/_lib/definitions";
import Stats from "./Stats";

async function DateRangeResolver({
  dateRangeParams,
}: {
  dateRangeParams: Promise<DateRangeParams>;
}) {
  const filter = await dateRangeParams;
  const dateRange = filter.dateRange ?? "last-7-days";

  return (
    <>
      <div className="col-span-full">
        <Suspense fallback={<StatsSkeleton />} key={dateRange}>
          <Stats dateRange={dateRange} />
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
    </>
  );
}

export default DateRangeResolver;
