import { getOrder } from "@/app/_lib/apiOrders";
import OrderPage from "@/app/_components/orders/OrderPage";
import { Suspense } from "react";
import { OrderPageSkeleton } from "@/app/_components/ui/Skeletons";

type Slug = {
  params: Promise<{ orderId: string }>;
};

export async function generateMetadata({ params }: Slug) {
  const { orderId } = await params;
  const order = await getOrder(orderId);
  if (order) {
    return { title: `Ordine #${order.id}` };
  }
}

export default function Page({ params }: Slug) {
  const orderParams = params.then((p) => ({
    orderId: p.orderId,
  }));

  return (
    <Suspense fallback={<OrderPageSkeleton />}>
      <OrderPage params={orderParams} />
    </Suspense>
  );
}
