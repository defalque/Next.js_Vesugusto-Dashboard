// import { Suspense } from "react";

// import Stats from "@/app/_components/dashboard/Stats";
// import OrdersActivityWrapper from "@/app/_components/dashboard/OrdersActivityWrapper";
// import BestSellerChartWrapper from "@/app/_components/dashboard/BestSellerChartWrapper";
// import ChartsWrapper from "@/app/_components/dashboard/ChartsWrapper";
// import RevenueChartWrapper from "@/app/_components/dashboard/RevenueChartWrapper";
// import OrdersChartWrapper from "@/app/_components/dashboard/OrdersChartWrapper";

// import DialogContextProvider from "@/app/_contexts/DialogContext";
// import CustomDialogWrapper from "@/app/_components/ui/dialog/CustomDialogWrapper";

// import {
//   BestSellersSkeleton,
//   OrdersActivitySkeleton,
//   OrdersAreaChartSkeleton,
//   RevenueChartSkeleton,
//   StatsSkeleton,
// } from "@/app/_components/ui/Skeletons";
// import { Select } from "@headlessui/react";
// import StatsWrapper from "@/app/_components/dashboard/StatsWrapper";
// import Stats from "@/app/_components/dashboard/Stats";
// import { ChevronUpDownIcon } from "@heroicons/react/24/solid";

import { DateRangeParams } from "@/app/_lib/definitions";
import { DateRangeProvider } from "@/app/_contexts/DateRangeProvider";
import DateRangeResolver from "@/app/_components/dashboard/DateRangeResolver";
import DateRangePicker from "@/app/_components/dashboard/DateRangePicker";
import { DashboardSkeleton } from "@/app/_components/ui/Skeletons";
import { Suspense } from "react";

export const metadata = {
  title: "Dashboard",
};

export default function Page({
  searchParams,
}: {
  searchParams: Promise<DateRangeParams>;
}) {
  const dateRangeParam = searchParams.then((sp) => ({
    dateRange: sp.dateRange,
  }));

  return (
    <>
      <div className="flex items-center justify-between pb-4">
        <div className="dark:text-light text-2xl font-bold text-neutral-700">
          Panoramica
        </div>
        <DateRangeProvider>
          <DateRangePicker />
        </DateRangeProvider>
      </div>

      <div className="grid grid-cols-2 grid-rows-[auto_30rem_auto_1fr] gap-x-15 gap-y-12 md:grid-cols-[1fr_1fr] md:grid-rows-[auto_28rem_auto_1fr] lg:grid-cols-[1fr_1fr] lg:grid-rows-[auto_auto_1fr]">
        <Suspense fallback={<DashboardSkeleton />}>
          <DateRangeResolver dateRangeParams={dateRangeParam} />
        </Suspense>
      </div>
    </>
  );
}
