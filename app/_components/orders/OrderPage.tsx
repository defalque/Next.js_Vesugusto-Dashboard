import {
  AtSymbolIcon,
  CalendarDaysIcon,
  CurrencyEuroIcon,
} from "@heroicons/react/24/outline";
import Breadcrumbs from "../ui/Breadcumbs";
import StatusTag from "./StatusTag";
import { formatCurrency, formatDate } from "@/app/_lib/utils";
import DialogContextProvider from "@/app/_contexts/DialogContext";
import OrdersActionButton from "./OrdersActionButton";
import CustomDialogWrapper from "../ui/dialog/CustomDialogWrapper";
import Image from "next/image";
import { getOrder } from "@/app/_lib/apiOrders";
import { notFound } from "next/navigation";

async function OrderPage({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = await params;
  const order = await getOrder(orderId);

  if (!order) {
    notFound();
  }

  const { order_items: items } = order;

  return (
    <>
      <Breadcrumbs href="/dashboard/orders" label="Ordini" />

      <div className="dark:text-light flex w-full flex-col gap-8 text-neutral-700">
        <div className="box-style bg-box flex w-full flex-col gap-1 rounded-xl border lg:max-w-2xl">
          <div className="box-style flex items-center justify-between border-b p-3">
            <h2 className="text-lg font-semibold">Dati ordine</h2>
            <StatusTag status={order.status} />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-y-5 p-3 sm:flex-row sm:gap-6">
            <div className="bg-style box-style inline-flex w-fit items-center gap-2 rounded border px-2 py-1">
              <CurrencyEuroIcon className="size-5" />
              <p>Totale ordine:</p>
              <span className="text-xl font-semibold">
                {formatCurrency(order.totalCost)}
              </span>
            </div>
            <div className="bg-style box-style inline-flex w-fit items-center gap-2 rounded border px-2 py-1">
              <CalendarDaysIcon className="size-5" />
              <p>Data ordine:</p>
              <span className="text-xl font-semibold">
                {formatDate(order.orderDate)}
              </span>
            </div>
            <DialogContextProvider>
              {order.status !== "delivered" && (
                <OrdersActionButton
                  id={String(order.id)}
                  status={order.status}
                />
              )}
              <CustomDialogWrapper />
            </DialogContextProvider>
          </div>
        </div>

        <div className="box-style bg-box flex w-full flex-col gap-1 rounded-xl border lg:max-w-lg">
          <h2 className="box-style border-b p-3 text-lg font-semibold">
            Dati cliente
          </h2>

          <div className="flex flex-wrap gap-2 p-3 text-sm">
            <div className="bg-style box-style inline-flex w-fit items-center gap-2 rounded border px-2 py-1">
              <Image
                src={order.userId?.image}
                className="rounded-full"
                width={28}
                height={28}
                alt={`Immagine del profilo di ${order.name}`}
              />
              <span>{order.name}</span>
            </div>

            <div className="bg-style box-style inline-flex w-fit items-center gap-2 rounded border px-2 py-1">
              <span>
                <AtSymbolIcon className="size-5" />
              </span>
              <span>{order.email}</span>
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col">
          <h2 className="box-style bg-box rounded-t-xl border p-3 text-lg font-semibold">
            Prodotti venduti
          </h2>

          <div className="box-style overflow-x-auto rounded-b-xl border-r border-b border-l">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="box-style border-b bg-gray-50 text-xs dark:bg-zinc-800">
                  <th className="px-4 py-2 text-left font-semibold tracking-wide text-gray-700 uppercase dark:text-gray-200">
                    Nome
                  </th>
                  <th className="px-4 py-2 text-left font-semibold tracking-wide text-gray-700 uppercase dark:text-gray-200">
                    Prezzo unitario
                  </th>
                  <th className="px-4 py-2 text-left font-semibold tracking-wide text-gray-700 uppercase dark:text-gray-200">
                    Quantità
                  </th>
                  <th className="px-4 py-3 text-left font-semibold tracking-wide text-gray-700 uppercase dark:text-gray-200">
                    Totale riga
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-zinc-700/40">
                {items.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-4 py-4 text-center text-gray-400 dark:text-gray-500"
                    >
                      Nessun prodotto in questo ordine.
                    </td>
                  </tr>
                ) : (
                  items.map((item, idx) => (
                    <tr key={idx} className={"bg-white dark:bg-zinc-900"}>
                      <td className="px-4 py-3">{item.productId.name}</td>
                      <td className="px-4 py-3">
                        {formatCurrency(item.productId.regularPrice)}
                      </td>
                      <td className="px-4 py-3">{item.quantity}</td>
                      <td className="px-4 py-3">
                        {formatCurrency(
                          item.productId.regularPrice * item.quantity,
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderPage;
