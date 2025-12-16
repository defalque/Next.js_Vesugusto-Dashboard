import Breadcrumbs from "../ui/Breadcumbs";
import StatusTag from "./StatusTag";
import { formatCurrency, formatDate } from "@/app/_lib/utils";
import DialogContextProvider from "@/app/_contexts/DialogContext";
import OrdersActionButton from "./OrdersActionButton";
import CustomDialogWrapper from "../ui/dialog/CustomDialogWrapper";
import Image from "next/image";
import { getOrder } from "@/app/_lib/apiOrders";
import { notFound } from "next/navigation";
import {
  BanknotesIcon,
  CalendarDaysIcon,
  CreditCardIcon,
} from "@heroicons/react/24/solid";

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

      <div className="dark:text-light flex w-full flex-col gap-12 text-neutral-700">
        <div className="flex w-full flex-col gap-5 rounded-xl">
          <div className="flex items-center gap-5">
            <h2 className="text-2xl font-semibold md:text-xl">
              Ordine #{order.id}
            </h2>
            <StatusTag status={order.status} />
          </div>

          <div className="flex flex-wrap justify-between gap-x-10 gap-y-5">
            <div className="flex flex-wrap items-center gap-x-10 gap-y-5 text-base md:text-sm">
              <div className="flex items-center gap-2">
                <BanknotesIcon aria-hidden="true" className="size-5" />
                <span>{formatCurrency(order.totalCost)}</span>
              </div>
              <div className="flex items-center gap-2">
                <CreditCardIcon aria-hidden="true" className="size-5" />
                <span className="flex items-center gap-2">
                  Mastercard
                  <span
                    aria-hidden="true"
                    className="font-medium text-black dark:text-white"
                  >
                    •••• •••• •••• 1234
                  </span>
                </span>
              </div>
              <div className="inline-flex w-fit items-center gap-2">
                <CalendarDaysIcon aria-hidden="true" className="size-5" />
                <span>{formatDate(order.orderDate)}</span>
              </div>
            </div>
            <div className="flex h-10.5 w-full items-center justify-end gap-2 sm:w-fit sm:justify-start">
              <DialogContextProvider>
                {order.status !== "delivered" && (
                  <OrdersActionButton
                    id={String(order.id)}
                    status={order.status}
                  />
                )}
                <CustomDialogWrapper />
              </DialogContextProvider>
              <button
                className="touch-hitbox flex cursor-pointer items-center rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-base font-semibold text-black inset-shadow-2xs transition-colors duration-300 hover:bg-gray-100/80 sm:text-[15px] md:text-sm dark:border-zinc-700/40 dark:bg-zinc-700/80 dark:text-white dark:shadow-sm dark:inset-shadow-white/20 dark:hover:bg-zinc-600/90"
                type="button"
              >
                Rimborsa
              </button>
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col gap-1 text-base md:text-sm">
          <h3 className="box-style border-b pb-2 text-lg font-semibold md:text-base">
            Dati cliente
          </h3>

          <dl className="box-style flex flex-col gap-1">
            <div className="grid grid-cols-1 gap-y-1.5 border-b border-b-gray-200 py-3 sm:grid-cols-[10rem_1fr] md:grid-cols-[20rem_1fr] dark:border-b-zinc-700/40">
              <dt className="dark:text-light/60 text-neutral-500">Cliente</dt>
              <dd className="">
                <div className="flex items-center gap-2">
                  <Image
                    src={order.userId?.image}
                    className="rounded-full"
                    width={28}
                    height={28}
                    alt={`Immagine del profilo di ${order.name}`}
                  />
                  {order.name}
                </div>
              </dd>
            </div>
            <div className="grid grid-cols-1 gap-y-1 py-4 sm:grid-cols-[10rem_1fr] md:grid-cols-[20rem_1fr]">
              <dt className="dark:text-light/60 text-neutral-500">Email</dt>
              <dd className="">{order.email}</dd>
            </div>
          </dl>
        </div>

        <div className="flex w-full flex-col">
          <h3 className="pb-2 text-lg font-semibold md:text-base">
            Prodotti venduti
          </h3>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-b-gray-200 text-sm dark:border-b-zinc-700/40">
                  <th className="py-2 text-left font-normal tracking-wide text-neutral-500 dark:text-neutral-400">
                    Nome
                  </th>
                  <th className="py-2 text-left font-normal tracking-wide text-neutral-500 dark:text-neutral-400">
                    Prezzo unitario
                  </th>
                  <th className="py-2 text-left font-normal tracking-wide text-neutral-500 dark:text-neutral-400">
                    Quantità
                  </th>
                  <th className="py-3 text-left font-normal tracking-wide text-neutral-500 dark:text-neutral-400">
                    Totale riga
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-zinc-700/40">
                {items.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="py-4 text-center text-gray-400 dark:text-gray-500"
                    >
                      Nessun prodotto in questo ordine.
                    </td>
                  </tr>
                ) : (
                  items.map((item, idx) => (
                    <tr key={idx} className={"bg-white dark:bg-zinc-900"}>
                      <td className="py-3">{item.productId.name}</td>
                      <td className="py-3 font-medium">
                        {formatCurrency(item.productId.regularPrice)}
                      </td>
                      <td className="py-3 font-medium">{item.quantity}</td>
                      <td className="py-3 font-medium">
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
