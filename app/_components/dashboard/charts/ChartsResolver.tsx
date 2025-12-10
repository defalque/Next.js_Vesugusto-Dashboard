import { DateRange } from "@/app/_lib/definitions";
import ChartsWrapper from "./ChartsWrapper";
import OrdersChartWrapper from "./OrdersChartWrapper";
import RevenueChartWrapper from "./RevenueChartWrapper";
import { getFilteredOrders } from "@/app/_lib/apiOrders";

async function ChartsResolver({ dateRange }: { dateRange: DateRange }) {
  const orders = await getFilteredOrders(dateRange);

  return (
    <ChartsWrapper
      revenueChart={
        <RevenueChartWrapper dateRange={dateRange} orders={orders} />
      }
      ordersChart={<OrdersChartWrapper dateRange={dateRange} orders={orders} />}
    />
  );
}

export default ChartsResolver;
