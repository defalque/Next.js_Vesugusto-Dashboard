import { notFound } from "next/navigation";

import {
  AtSymbolIcon,
  CalendarDaysIcon,
  CurrencyEuroIcon,
} from "@heroicons/react/24/outline";

import { getOrder, getOrderId } from "@/app/_lib/apiOrders";
import { formatCurrency, formatDate } from "@/app/_lib/utils";

import Breadcrumbs from "@/app/_components/ui/Breadcumbs";
import StatusTag from "@/app/_components/orders/StatusTag";
import OrderHeading from "@/app/_components/orders/OrderHeading";
import DialogContextProvider from "@/app/_contexts/DialogContext";
import CustomDialogWrapper from "@/app/_components/ui/dialog/CustomDialogWrapper";
import OrdersActionButton from "@/app/_components/orders/OrdersActionButton";
import Image from "next/image";

type Slug = {
  params: Promise<{ orderId: string }>;
};

export async function generateMetadata({ params }: Slug) {
  const { orderId } = await params;
  const order = await getOrderId(orderId);
  if (order) {
    return { title: `Ordine #${order.id}` };
  }
}

export default async function Page({ params }: Slug) {
  const { orderId } = await params;
  const order = await getOrder(orderId);

  if (!order) {
    notFound();
  }

  const { order_items: items } = order;

  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          {
            label: "Ordini",
            href: `/dashboard/orders`,
          },
          {
            label: `Ordine #${order.id}`,
            href: `/dashboard/orders/${order.id}`,
            active: true,
          },
        ]}
      />

      <div className="flex w-full flex-col gap-8">
        <div className="flex w-fit flex-col gap-1 rounded-xl border border-gray-200 p-3 dark:border-zinc-800">
          <OrderHeading>Dati ordine</OrderHeading>

          <div className="flex flex-wrap items-center gap-3 sm:flex-row sm:gap-6">
            <div className="inline-flex w-fit items-center gap-2 rounded bg-gray-50 px-2 py-1 dark:bg-zinc-800/40">
              <CurrencyEuroIcon className="size-5" />
              <p>Totale ordine:</p>
              <span className="text-xl font-semibold">
                {formatCurrency(order.totalCost)}
              </span>
            </div>
            <div className="inline-flex w-fit items-center gap-2 rounded bg-gray-50 px-2 py-1 dark:bg-zinc-800/40">
              <CalendarDaysIcon className="size-5" />
              <p>Data ordine:</p>
              <span>{formatDate(order.orderDate)}</span>
            </div>
            <StatusTag status={order.status} />
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

        <div className="flex w-fit flex-col gap-1 rounded-xl border border-gray-200 p-3 dark:border-zinc-800">
          <OrderHeading>Dati cliente</OrderHeading>

          <div className="flex flex-col gap-2 text-sm text-gray-700 dark:text-gray-300">
            <div className="inline-flex w-fit items-center gap-2 rounded bg-gray-50 px-2 py-1 dark:bg-zinc-800/40">
              <Image
                src={order.userId.image}
                className="rounded-full"
                width={28}
                height={28}
                alt={`Immagine del profilo di ${order.name}`}
              />
              <span>{order.name}</span>
            </div>

            <div className="inline-flex w-fit items-center gap-2 rounded bg-gray-50 px-2 py-1 dark:bg-zinc-800/40">
              <span>
                <AtSymbolIcon className="size-5" />
              </span>
              <span>{order.email}</span>
            </div>
          </div>
        </div>

        <div>
          <OrderHeading>Prodotti ordinati</OrderHeading>

          <div className="overflow-x-auto rounded-lg border border-gray-100 dark:border-zinc-800">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-50 dark:bg-zinc-800">
                  <th className="px-4 py-2 text-left font-semibold text-gray-700 dark:text-gray-200">
                    Nome
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700 dark:text-gray-200">
                    Prezzo unitario
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700 dark:text-gray-200">
                    Quantità
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700 dark:text-gray-200">
                    Totale riga
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
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
                      <td className="px-4 py-2">{item.productId.name}</td>
                      <td className="px-4 py-2">
                        {formatCurrency(item.productId.regularPrice)}
                      </td>
                      <td className="px-4 py-2">{item.quantity}</td>
                      <td className="px-4 py-2">
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
