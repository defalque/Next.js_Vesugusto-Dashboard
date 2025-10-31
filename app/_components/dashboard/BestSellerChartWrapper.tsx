import { getBestSeller } from "@/app/_lib/apiProducts";

import { BestSeller } from "@/app/_lib/definitions";

import EmptyWrapper from "./EmptyWrapper";
import ErrorWrapper from "./ErrorWrapper";
import LazyBestSellerChart from "./LazyBestSellerChart";

async function BestSellerChartWrapper() {
  const bestSellers = await getBestSeller();

  if (!bestSellers) {
    return (
      <ErrorWrapper
        title="Prodotti più venduti"
        subTitle="Visualizza i prodotti che hanno riscosso più successo tra i nostri clienti."
        message="Non è stato possibile recuperare i prodotti più venduti."
      />
    );
  }

  if (bestSellers.length === 0) {
    return (
      <EmptyWrapper
        title="Prodotti più venduti"
        subTitle="Visualizza i prodotti che hanno riscosso più successo tra i nostri clienti."
        message="Nessun prodotto più venduto al momento."
      />
    );
  }

  const data = bestSellers.map((item: BestSeller) => ({
    id: item.product_id,
    name: item.product_name,
    value: item.total_count,
  }));

  return (
    <div
      className={`col-span-full row-span-1 row-start-2 flex flex-col rounded-md border border-gray-200 bg-gray-50/30 [--box-padding:--spacing(4)] lg:col-start-2 dark:border-zinc-700/40 dark:bg-zinc-800/40`}
    >
      <div className="space-y-1 border-b border-gray-200 p-(--box-padding) dark:border-zinc-700/40">
        <h2 className="dark:text-light rounded text-xl font-semibold text-neutral-700">
          Prodotti più venduti
        </h2>
        <p className="text-neutral-500 dark:text-neutral-400">
          Visualizza i prodotti che hanno riscosso più successo tra i nostri
          clienti.
        </p>
      </div>

      <LazyBestSellerChart data={data} />
    </div>
  );
}

export default BestSellerChartWrapper;
