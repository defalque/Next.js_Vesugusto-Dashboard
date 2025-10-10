import { getLatestOrders } from "@/app/_lib/apiOrders";
import LatestOrders from "./LatestOrders";

async function LatestOrdersWrapper() {
  const latestOrders = await getLatestOrders();

  if (latestOrders.length === 0) {
    return (
      <p className="flex flex-1 items-center justify-center text-center">
        Non ci sono ordini recenti da visualizzare.
      </p>
    );
  }

  return (
    <div
      className={`col-span-full flex flex-col rounded-md bg-gray-50/65 px-(--box-padding) py-3 [--box-padding:--spacing(2)] lg:col-span-1 dark:bg-zinc-800/40`}
    >
      <h2 className="dark:text-light text-dark mb-3 rounded px-2 text-xl font-semibold">
        Ultimi ordini
      </h2>

      <LatestOrders latestOrders={latestOrders} />
    </div>
  );
}

export default LatestOrdersWrapper;
