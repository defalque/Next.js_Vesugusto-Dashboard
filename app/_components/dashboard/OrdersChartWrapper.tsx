import { getLastYearOrders } from "@/app/_lib/apiOrders";
import { prepareOrdersChartData } from "@/app/_lib/utils";
import OrdersAreaChartClient from "./OrdersAreaChartClient";

async function OrdersChartWrapper() {
  const orders = await getLastYearOrders();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const ordersWithoutTotalCost = orders.map(({ totalCost, ...rest }) => rest);

  const data = prepareOrdersChartData(ordersWithoutTotalCost);

  return <OrdersAreaChartClient data={data} />;
}

//   return (
//     <div className="rounded-md bg-gray-50/65 py-4 dark:bg-zinc-800/40">
//       <div className="flex flex-col gap-3">
//         <div className="inline-flex items-center justify-between px-4 py-1.5">
//           <h2 className="dark:text-light text-dark rounded text-lg font-semibold">
//             Grafico ordini
//           </h2>
//           <div className="inline-flex items-center gap-1">
//             <CalendarIcon className="h-5 w-5" />
//             <p>Ultimi 12 mesi</p>
//           </div>
//         </div>

//         <OrdersAreaChartClient data={data} />
//       </div>
//     </div>
//   );
// }

export default OrdersChartWrapper;
