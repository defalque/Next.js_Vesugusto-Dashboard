import { Suspense } from "react";
import {
  BestSellersSkeleton,
  ChartsSkeleton,
  OrdersActivitySkeleton,
  StatsSkeleton,
} from "../ui/Skeletons";
import DialogContextProvider from "@/app/_contexts/DialogContext";
import CustomDialogWrapper from "../ui/dialog/CustomDialogWrapper";
import { DateRangeParams } from "@/app/_lib/definitions";
import Stats from "./stats/Stats";
import ChartsResolver from "./charts/ChartsResolver";
import BestSellerChartWrapper from "./bestSellers/BestSellerChartWrapper";
import OrdersActivityWrapper from "./ordersActivity/OrdersActivityWrapper";

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

      <Suspense fallback={<ChartsSkeleton />}>
        <ChartsResolver dateRange={dateRange} />
      </Suspense>
    </>
  );
}

export default DateRangeResolver;
