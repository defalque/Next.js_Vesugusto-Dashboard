// "use client";

// import { useEffect } from "react";
// import * as m from "motion/react-m";
// import { LazyMotion, useSpring, useTransform } from "motion/react";
// const loadFeatures = () =>
//   import("../../_lib/features").then((res) => res.default);

import { DateRange } from "@/app/_lib/definitions";
import { formatCurrency } from "@/app/_lib/utils";
import StatsPercentage from "../../ui/StatsPercentage";

type RevenuesStatsProps = {
  title: string;
  value: number | string;
  filteredValue: number | string;
  dateRange: DateRange;
};

function RevenuesStats({
  title,
  value,
  filteredValue,
  dateRange,
}: RevenuesStatsProps) {
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
      {percentage > 0 && (
        <StatsPercentage
          percentage={percentage}
          label={
            dateRange === "last-7-days"
              ? "nell'ultima settimana"
              : dateRange === "last-month"
                ? "nell'ultimo mese"
                : "nell'ultimo anno"
          }
        />
      )}
      {percentage === 0 && (
        <StatsPercentage
          percentage={percentage}
          muted={true}
          label={
            dateRange === "last-7-days"
              ? "nell'ultima settimana"
              : dateRange === "last-month"
                ? "nell'ultimo mese"
                : "nell'ultimo anno"
          }
        />
      )}
    </div>
  );
}

export default RevenuesStats;
