import { DateRange } from "@/app/_lib/definitions";
import StatsPercentage from "../../ui/StatsPercentage";

type OrdersStatsProps = {
  title: string;
  value: number | string;
  filteredValue: number | string;
  dateRange: DateRange;
};

function OrdersStats({
  title,
  value,
  filteredValue,
  dateRange,
}: OrdersStatsProps) {
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

  const percentage = filteredValue
    ? (Number(filteredValue) / Number(value)) * 100
    : 0;

  return (
    <div className="dark:text-light flex flex-col gap-2 border-t border-gray-200 py-4 text-neutral-700 dark:border-zinc-700/40">
      <h5 className="mb-2 self-baseline text-base font-semibold tracking-wide uppercase sm:text-sm md:text-xs">
        {title}
      </h5>
      <p className="text-4xl leading-none font-medium md:text-3xl">{value}</p>
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

export default OrdersStats;
