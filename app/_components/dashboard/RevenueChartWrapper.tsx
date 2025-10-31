import { getLastYearOrders } from "@/app/_lib/apiOrders";
import { prepareOrdersChartData } from "@/app/_lib/utils";
import { FaceFrownIcon } from "@heroicons/react/24/outline";
import LazyRevenueChart from "./LazyRevenueChart";

async function RevenueChartWrapper() {
  const orders = await getLastYearOrders();

  if (!orders) {
    return (
      <div className="relative h-75 w-full overflow-hidden rounded-md">
        <div
          className="absolute inset-6 bg-gray-200 bg-gradient-to-t to-transparent p-5 dark:bg-zinc-700"
          style={{
            clipPath: `path("M0,100 C100,250 350,100  600,200 C850,300 1100,100 1400,250 L1400,400 L0,500 Z")`,
          }}
        />
        <div className="absolute inset-x-6 top-10 flex flex-col p-(--box-padding)">
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

  const data = prepareOrdersChartData(orders);

  return <LazyRevenueChart data={data} />;
}

export default RevenueChartWrapper;
