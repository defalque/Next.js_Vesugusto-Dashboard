import { getOrders } from "@/app/_lib/apiOrders";
import { LIMIT } from "@/constants/const";
import ItemsListFallback from "../ui/items-table/ItemsListFallback";
import OrdersListClient from "./OrdersListClient";

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
  const orders = await getOrders(LIMIT, filters);

  if (!Array.isArray(orders) || orders.length === 0) {
    return <ItemsListFallback items={orders} variation="ordine" />;
  }

  return <OrdersListClient orders={orders} />;
}

export default OrdersListWrapper;
