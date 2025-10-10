import { formatCurrency } from "@/app/_lib/utils";
import Link from "next/link";
import { LatestOrdersInfo } from "@/app/_lib/definitions";
import StatusTag from "../orders/StatusTag";
import OrdersActionButton from "../orders/OrdersActionButton";
import Image from "next/image";

function LatestOrders({ latestOrders }: { latestOrders: LatestOrdersInfo[] }) {
  return (
    <div className="-mx-(--box-padding) flex overflow-x-auto md:-mx-0">
      <div className="grow px-(--box-padding) md:px-0">
        <ul className="flex flex-col overflow-y-auto rounded">
          {latestOrders.map((order) => (
            <li
              key={order.id}
              className="_grid-cols-[5.5rem_11rem_7.5rem_6rem_5.5rem] grid grid-cols-[3.5rem_15rem_7.5rem_6rem_5.5rem] items-center justify-between gap-4 p-3 transition-colors duration-200"
            >
              <Link
                href={`/dashboard/orders/${order.id}`}
                className="focus hover:text-brand-800 dark:text-brand-950/90 text-brand-950 rounded text-center transition-colors duration-300"
              >
                <span>Vedi &rarr;</span>
              </Link>

              {/* <div className="flex flex-col gap-1">
                <Image
                  src={order.userId.image}
                  className="rounded-full"
                  width={28}
                  height={28}
                  alt={`Immagine del profilo di ${order.name}`}
                />
                <p>{order.name}</p>
                <p className="text-xs text-zinc-500">{order.email}</p>
              </div> */}

              <div className="flex items-center gap-2">
                <Image
                  src={order.userId.image}
                  className="flex-shrink-0 rounded-full"
                  width={28}
                  height={28}
                  alt={`Immagine del profilo di ${order.name}`}
                />
                <div className="truncate">
                  <p className="truncate">{order.name}</p>
                  <p className="truncate text-xs text-zinc-500">
                    {order.email}
                  </p>
                </div>
              </div>

              <p className="text-center">{formatCurrency(order.totalCost)}</p>

              <StatusTag status={order.status} className="text-[0.6rem]" />

              {order.status !== "delivered" && (
                <OrdersActionButton
                  id={String(order.id)}
                  status={order.status}
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default LatestOrders;
