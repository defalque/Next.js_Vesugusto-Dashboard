import { getBestSeller } from "@/app/_lib/apiProducts";
import { BestSeller } from "@/app/_lib/definitions";
import BestSellerChartClient from "./BestSellerChartClient";

async function BestSellerChartWrapper() {
  const bestSellers = await getBestSeller();

  const data = bestSellers.map((item: BestSeller) => ({
    id: item.product_id,
    name: item.product_name,
    value: item.total_count,
  }));

  return (
    <div
      className={`col-span-full row-span-1 row-start-2 flex flex-col rounded-md bg-gray-50/65 px-(--box-padding) py-3 [--box-padding:--spacing(2)] lg:col-start-2 dark:bg-zinc-800/40`}
    >
      <h2 className="dark:text-light text-dark mb-3 rounded px-2 text-xl font-semibold">
        Top 5 Best Sellers
      </h2>

      <BestSellerChartClient data={data} />
    </div>
  );
}

export default BestSellerChartWrapper;
