import { getOrders, getTotalOrders } from "@/app/_lib/apiOrders";

import { ORDERS_LIMIT } from "@/constants/const";

import {
  ChatBubbleBottomCenterTextIcon,
  FaceFrownIcon,
} from "@heroicons/react/24/outline";

import LazyOrdersList from "./LazyOrdersList";
import Pagination from "../ui/Pagination";

async function OrdersListWrapper({
  filters,
}: {
  filters: {
    page: string;
    sort: string;
    status: string;
    query: string;
  };
}) {
  const ordersData = getOrders(ORDERS_LIMIT, filters);
  const ordersCountData = getTotalOrders(filters);

  const [{ orders }, { count, error }] = await Promise.all([
    ordersData,
    ordersCountData,
  ]);

  if (!orders) {
    return (
      <tbody>
        <tr>
          <td colSpan={7} className="py-10 text-center">
            <div className="flex flex-col">
              <FaceFrownIcon className="mx-auto size-8 text-neutral-500 sm:size-10 dark:text-neutral-400" />
              <span className="mt-2 text-neutral-500 dark:text-neutral-400">
                Non è stato possibile recuperare i dati degli ordini.
              </span>
              <span className="mx-auto text-center text-sm text-neutral-500 dark:text-neutral-400">
                Riprova più tardi.
              </span>
            </div>
          </td>
        </tr>
      </tbody>
    );
  }

  if (orders.length === 0) {
    return (
      <tbody>
        <tr>
          <td colSpan={7} className="py-10 text-center">
            <div className="flex flex-col">
              <ChatBubbleBottomCenterTextIcon className="mx-auto size-8 text-neutral-500 sm:size-10 dark:text-neutral-400" />
              <span className="mt-2 text-neutral-500 dark:text-neutral-400">
                Nessun ordine trovato.
              </span>
            </div>
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <>
      <LazyOrdersList orders={orders} />

      <tfoot className="border-t border-gray-200 bg-gray-50/30 text-sm dark:border-zinc-700/40 dark:bg-zinc-800/40">
        <tr>
          {error ? (
            <td colSpan={7}>
              <div className="dark:text-light p-3 font-medium text-neutral-700">
                Errore imprevisto durante il recupero dei dati. Riprova più
                tardi.
              </div>
            </td>
          ) : (
            <td colSpan={7}>
              <Pagination count={count ?? 0} LIMIT={ORDERS_LIMIT} />
            </td>
          )}
        </tr>
      </tfoot>
    </>
  );
}

export default OrdersListWrapper;
