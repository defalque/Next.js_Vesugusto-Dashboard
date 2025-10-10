import { Suspense } from "react";

import Stats from "@/app/_components/dashboard/Stats";
import PageTitle from "@/app/_components/ui/PageTitle";
import OrdersChartWrapper from "@/app/_components/dashboard/OrdersChartWrapper";
import RevenueChartWrapper from "@/app/_components/dashboard/RevenueChartWrapper";
import {
  AreaChartSkeleton,
  BestSellersSkeleton,
  LatestOrdersSkeleton,
  StatsSkeleton,
} from "@/app/_components/ui/Skeletons";
import LatestOrdersWrapper from "@/app/_components/dashboard/LatestOrdersWrapper";
import BestSellerChartWrapper from "@/app/_components/dashboard/BestSellerChartWrapper";
import DialogContextProvider from "@/app/_contexts/DialogContext";
import CustomDialogWrapper from "@/app/_components/ui/dialog/CustomDialogWrapper";
import { CalendarIcon } from "@heroicons/react/24/outline";

export const metadata = {
  title: "Dashboard",
};

export default function Page() {
  return (
    <>
      <div className="mb-8">
        <PageTitle>Dashboard</PageTitle>
      </div>

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
          <Suspense fallback={<LatestOrdersSkeleton />}>
            <LatestOrdersWrapper />
          </Suspense>

          <CustomDialogWrapper />
        </DialogContextProvider>

        <div className="col-span-full flex flex-col gap-10">
          <div className="rounded-md bg-gray-50/65 py-4 dark:bg-zinc-800/40">
            <div className="flex flex-col gap-3">
              <div className="inline-flex items-center justify-between px-4 py-1.5">
                <h2 className="dark:text-light text-dark rounded text-lg font-semibold">
                  Grafico guadagni
                </h2>
                <div className="bg-brand-950/10 inline-flex items-center gap-1 rounded-md p-1.5 text-xs sm:text-sm">
                  <CalendarIcon className="text-brand-950 h-5 w-5" />
                  <p className="text-brand-950">Ultimi 12 mesi</p>
                </div>
              </div>

              <Suspense fallback={<AreaChartSkeleton />}>
                <RevenueChartWrapper />
              </Suspense>
            </div>
          </div>

          <div className="rounded-md bg-gray-50/65 py-4 dark:bg-zinc-800/40">
            <div className="flex flex-col gap-3">
              <div className="inline-flex items-center justify-between px-4 py-1.5">
                <h2 className="dark:text-light text-dark rounded text-lg font-semibold">
                  Grafico ordini
                </h2>
                <div className="bg-brand-950/10 inline-flex items-center gap-1 rounded-md p-1.5 text-xs sm:text-sm">
                  <CalendarIcon className="text-brand-950 h-5 w-5" />
                  <p className="text-brand-950">Ultimi 12 mesi</p>
                </div>
              </div>

              <Suspense fallback={<AreaChartSkeleton />}>
                <OrdersChartWrapper />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
