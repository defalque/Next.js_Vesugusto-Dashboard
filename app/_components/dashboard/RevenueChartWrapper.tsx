import { getLastYearOrders } from "@/app/_lib/apiOrders";
import { prepareOrdersChartData } from "@/app/_lib/utils";
import RevenueChartClient from "./RevenueChartClient";

async function RevenueChartWrapper() {
  const orders = await getLastYearOrders();

  const data = prepareOrdersChartData(orders);

  return <RevenueChartClient data={data} />;
}

export default RevenueChartWrapper;
