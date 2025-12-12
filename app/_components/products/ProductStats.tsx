import { formatCurrency, prepareProductStats } from "@/app/_lib/utils";
import StatsPercentage from "../ui/StatsPercentage";

import { getProductStats } from "@/app/_lib/apiProducts";
import { getGenericStats } from "@/app/_lib/apiOrders";

type ProductStatsProps = {
  productId: number;
  regularPrice: number;
  quantity: number;
};

async function ProductStats({
  productId,
  regularPrice,
  quantity,
}: ProductStatsProps) {
  const statsData = getProductStats(productId);
  const ordersStatsData = getGenericStats();

  const [statsResult, ordersStatsResult] = await Promise.allSettled([
    statsData,
    ordersStatsData,
  ]);

  const {
    soldQuantities,
    revenuesGenerated,
    revenuePercentage,
    frequencyOrders,
    percentageFrequencyOrders,
    wishlistFavorites,
    percentageWishlistFavorites,
  } = prepareProductStats(
    statsResult.status === "fulfilled" &&
      statsResult.value &&
      statsResult.value.error,
    ordersStatsResult.status === "fulfilled" &&
      ordersStatsResult.value &&
      ordersStatsResult.value.error,
    statsResult.status === "fulfilled" && statsResult.value
      ? (statsResult.value.data ?? [])
      : [],
    ordersStatsResult.status === "fulfilled" && ordersStatsResult.value
      ? (ordersStatsResult.value.data ?? [])
      : [],
    regularPrice,
  );

  return (
    <div className="dark:text-light grid grid-cols-2 justify-between gap-10 text-neutral-700 md:grid-cols-3 2xl:grid-cols-6">
      <div className="dark:text-light flex flex-col gap-2 border-t border-gray-200 py-4 text-neutral-700 dark:border-zinc-700/40">
        <h5 className="mb-2 self-baseline text-base font-semibold tracking-wide uppercase sm:text-sm md:text-xs">
          Prezzo
        </h5>
        <p className="text-4xl leading-none font-medium md:text-3xl">
          {formatCurrency(regularPrice)}
        </p>
      </div>

      <div className="dark:text-light flex flex-col gap-2 border-t border-gray-200 py-4 text-neutral-700 dark:border-zinc-700/40">
        <h5 className="mb-2 self-baseline text-base font-semibold tracking-wide uppercase sm:text-sm md:text-xs">
          Stock
        </h5>
        <p className="text-4xl leading-none font-medium md:text-3xl">
          {quantity}
        </p>
      </div>

      <div className="dark:text-light flex flex-col gap-2 border-t border-gray-200 py-4 text-neutral-700 dark:border-zinc-700/40">
        <h5 className="mb-2 self-baseline text-base font-semibold tracking-wide uppercase sm:text-sm md:text-xs">
          Quantità vendute
        </h5>
        <p className="text-4xl leading-none font-medium md:text-3xl">
          {typeof soldQuantities === "number" && soldQuantities}
          {typeof soldQuantities === "string" && soldQuantities}
        </p>
      </div>

      <div className="dark:text-light flex flex-col gap-2 border-t border-gray-200 py-4 text-neutral-700 dark:border-zinc-700/40">
        <h5 className="mb-2 self-baseline text-base font-semibold tracking-wide uppercase sm:text-sm md:text-xs">
          Ricavi generati
        </h5>
        <p className="text-4xl leading-none font-medium md:text-3xl">
          {typeof revenuesGenerated === "number"
            ? formatCurrency(revenuesGenerated)
            : revenuesGenerated}
        </p>
        {typeof revenuePercentage === "number" && revenuePercentage > 0 && (
          <StatsPercentage
            percentage={revenuePercentage}
            muted={false}
            label="dei ricavi totali"
          />
        )}
        {typeof revenuePercentage === "number" && revenuePercentage === 0 && (
          <StatsPercentage
            percentage={revenuePercentage}
            muted={true}
            label="dei ricavi totali"
          />
        )}
        {typeof revenuePercentage === "string" && (
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            {revenuePercentage}
          </p>
        )}
      </div>

      <div className="dark:text-light flex flex-col gap-2 border-t border-gray-200 py-4 text-neutral-700 dark:border-zinc-700/40">
        <h5 className="mb-2 self-baseline text-base font-semibold tracking-wide uppercase sm:text-sm md:text-xs">
          Frequenza ordini
        </h5>
        <p className="text-4xl leading-none font-medium md:text-3xl">
          {frequencyOrders}
        </p>
        {typeof percentageFrequencyOrders === "number" &&
          percentageFrequencyOrders > 0 && (
            <StatsPercentage
              percentage={percentageFrequencyOrders}
              muted={false}
              label="dei ordini totali"
            />
          )}
        {typeof percentageFrequencyOrders === "number" &&
          percentageFrequencyOrders === 0 && (
            <StatsPercentage
              percentage={percentageFrequencyOrders}
              muted={true}
              label="dei ordini totali"
            />
          )}
        {typeof percentageFrequencyOrders === "string" && (
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            {percentageFrequencyOrders}
          </p>
        )}
      </div>

      <div className="dark:text-light flex flex-col gap-2 border-t border-gray-200 py-4 text-neutral-700 dark:border-zinc-700/40">
        <h5 className="mb-2 self-baseline text-base font-semibold tracking-wide uppercase sm:text-sm md:text-xs">
          Wishlist utenti
        </h5>
        <p className="text-4xl leading-none font-medium md:text-3xl">
          {wishlistFavorites}
        </p>
        {typeof percentageWishlistFavorites === "number" &&
          percentageWishlistFavorites > 0 && (
            <StatsPercentage
              percentage={percentageWishlistFavorites}
              muted={false}
              label="dei utenti totali"
            />
          )}
        {typeof percentageWishlistFavorites === "number" &&
          percentageWishlistFavorites === 0 && (
            <StatsPercentage
              percentage={percentageWishlistFavorites}
              muted={true}
              label="dei utenti totali"
            />
          )}
        {typeof percentageWishlistFavorites === "string" && (
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            {percentageWishlistFavorites}
          </p>
        )}
      </div>
    </div>
  );
}

export default ProductStats;
