import { getLastYearOrders } from "@/app/_lib/apiOrders";
import { prepareOrdersChartData } from "@/app/_lib/utils";
import { FaceFrownIcon } from "@heroicons/react/24/outline";
import LazyOrdersAreaChart from "./LazyOrdersAreaChart";

async function OrdersChartWrapper() {
  const orders = await getLastYearOrders();

  if (!orders) {
    return (
      <div className="relative h-75 w-full overflow-hidden rounded-md">
        <div className="flex h-75 w-full items-center justify-between gap-1.5 p-5">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((_, i) => (
            <div key={i} className="flex w-1/12 gap-1">
              <div className="mt-auto h-30 w-1/2 rounded bg-gray-200 dark:bg-zinc-700" />
              <div className="mt-auto h-50 w-1/2 rounded bg-gray-300/80 dark:bg-zinc-700/70" />
            </div>
          ))}
        </div>
        <div className="absolute top-1/2 right-1/2 z-10 flex translate-x-1/2 -translate-y-1/2 flex-col rounded-md border border-gray-100 bg-gray-50/80 p-3 dark:border-zinc-800 dark:bg-zinc-900/90">
          <FaceFrownIcon className="mx-auto size-8 text-neutral-500 sm:size-10 dark:text-neutral-400" />
          <span className="mx-auto mt-4 text-center text-xs text-neutral-500 sm:text-sm dark:text-neutral-400">
            Non è stato possibile caricare i dati.
          </span>
          <span className="mx-auto text-center text-xs text-neutral-500 sm:text-sm dark:text-neutral-400">
            Riprova più tardi.
          </span>
        </div>
      </div>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const ordersWithoutTotalCost = orders.map(({ totalCost, ...rest }) => rest);

  const data = prepareOrdersChartData(ordersWithoutTotalCost);

  return <LazyOrdersAreaChart data={data} />;
}

export default OrdersChartWrapper;
