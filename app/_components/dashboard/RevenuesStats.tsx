// "use client";

// import { useEffect } from "react";
// import * as m from "motion/react-m";
// import { LazyMotion, useSpring, useTransform } from "motion/react";
// const loadFeatures = () =>
//   import("../../_lib/features").then((res) => res.default);

import { formatCurrency } from "@/app/_lib/utils";

type RevenuesStatsProps = {
  title: string;
  value: number | string;
  filteredValue: number | string;
};

function RevenuesStats({ title, value, filteredValue }: RevenuesStatsProps) {
  //   const countValue = useSpring(0, {
  //     stiffness: 185,
  //     damping: 25,
  //   });

  //   const countDisplay = useTransform(countValue, (value) =>
  //     formatCurrency(value),
  //   );

  //   useEffect(() => {
  //     countValue.set(value);
  //   }, [value, countValue]);

  const isValueNumber = typeof value === "number" && !isNaN(value);
  const isFilteredValueNumber =
    typeof filteredValue === "number" && !isNaN(filteredValue);

  if (!isValueNumber || !isFilteredValueNumber) {
    return (
      <div className="dark:text-light flex flex-col gap-2 border-t border-gray-200 py-4 text-neutral-700 dark:border-zinc-700/40">
        <h5 className="mb-2 self-baseline text-base font-semibold tracking-wide uppercase sm:text-sm md:text-xs">
          {title}
        </h5>
        <div className="flex items-center py-4">
          <span className="text-2xl leading-none font-medium sm:text-xl md:text-lg">
            Dati non disponibili
          </span>
        </div>
      </div>
    );
  }

  const percentage = (Number(filteredValue) / Number(value)) * 100;

  return (
    <div className="dark:text-light flex flex-col gap-2 border-t border-gray-200 py-4 text-neutral-700 dark:border-zinc-700/40">
      <h5 className="mb-2 self-baseline text-base font-semibold tracking-wide uppercase sm:text-sm md:text-xs">
        {title}
      </h5>
      {/* <LazyMotion features={loadFeatures}> */}
      <span className="text-4xl leading-none font-medium md:text-3xl">
        {/* {countDisplay} */}
        {formatCurrency(value)}
      </span>
      {/* </LazyMotion> */}
      {percentage > 0 && <RevenuesStatsPercentage percentage={percentage} />}
      {percentage === 0 && (
        <RevenuesStatsPercentage percentage={percentage} muted />
      )}
    </div>
  );
}

function RevenuesStatsPercentage({
  percentage,
  muted,
}: {
  percentage: number;
  muted?: boolean;
}) {
  return (
    <div className="flex items-center gap-1">
      <span
        className={`rounded-lg ${muted ? "bg-slate-500/10 text-slate-500 dark:bg-slate-500/10 dark:text-slate-400" : "bg-lime-500/15 text-lime-700 dark:bg-lime-500/10 dark:text-lime-400"} px-2 py-1 text-xs font-semibold`}
      >
        {percentage.toFixed(1)}%
      </span>
      <span className="text-xs text-neutral-500 dark:text-neutral-400">
        nell&apos;ultima settimana
      </span>
    </div>
  );
}

export default RevenuesStats;
