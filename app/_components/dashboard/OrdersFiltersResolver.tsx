import { Suspense } from "react";
import { OrdersListSkeleton } from "../ui/Skeletons";
import OrdersListWrapper from "../orders/OrdersListWrapper";
import { OrderParams } from "@/app/_lib/definitions";

async function OrdersFiltersResolver({
  filterParams,
}: {
  filterParams: Promise<OrderParams>;
}) {
  const params = await filterParams;

  const filters = {
    status: params?.status || "all",
    sort: params?.sort || "most-recent",
    query: params?.query || "",
    page: params?.page || "1",
  };
  const filtersKey = `${filters.status}-${filters.sort}-${filters.query}-${filters.page}`;

  return (
    <Suspense fallback={<OrdersListSkeleton />} key={filtersKey}>
      <OrdersListWrapper filters={filters} />
    </Suspense>
  );
}

export default OrdersFiltersResolver;
