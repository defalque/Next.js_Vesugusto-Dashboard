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
import { Select } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/24/solid";

export const metadata = {
  title: "Dashboard",
};

export default function Page() {
  return (
    <>
      <div className="flex items-center justify-between pb-4">
        <div className="dark:text-light text-2xl font-bold text-neutral-700">
          Panoramica
        </div>
        <div className="relative">
          <Select
            name="status"
            aria-label="Project status"
            className="data-focus:outline-brand-950 w-42 appearance-none rounded-lg border border-gray-300 px-2.5 py-2 shadow-xs transition-colors duration-100 ease-in hover:border-gray-400/70 focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 dark:border-zinc-700 dark:bg-zinc-700/35 dark:hover:border-zinc-600/80"
          >
            <option value="active">Ultima settimana</option>
            <option value="paused">Ultimo mese</option>
            <option value="delayed">Ultimo anno</option>
          </Select>
          <ChevronUpDownIcon
            className="group pointer-events-none absolute top-1/2 right-2 size-4 -translate-y-1/2 fill-black dark:fill-white"
            aria-hidden="true"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 grid-rows-[auto_30rem_auto_1fr] gap-x-15 gap-y-12 md:grid-cols-[1fr_1fr] md:grid-rows-[auto_28rem_auto_1fr] lg:grid-cols-[1fr_1fr] lg:grid-rows-[auto_auto_1fr]">
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
