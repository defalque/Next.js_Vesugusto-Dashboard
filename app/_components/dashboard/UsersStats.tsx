import { DateRange } from "@/app/_lib/definitions";

type UsersStatsProps = {
  title: string;
  value: number | string;
  filteredValue: number | string;
  dateRange: DateRange;
};

function UsersStats({
  title,
  value,
  filteredValue,
  dateRange,
}: UsersStatsProps) {
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

  return (
    <div className="dark:text-light flex flex-col gap-2 border-t border-gray-200 py-4 text-neutral-700 dark:border-zinc-700/40">
      <h5 className="mb-2 self-baseline text-base font-semibold tracking-wide uppercase sm:text-sm md:text-xs">
        {title}
      </h5>
      <p className="text-4xl leading-none font-medium md:text-3xl">{value}</p>
      {filteredValue > 0 && (
        <UsersStatsNumber value={filteredValue} dateRange={dateRange} />
      )}
      {filteredValue === 0 && (
        <UsersStatsNumber
          value={filteredValue}
          muted={true}
          dateRange={dateRange}
        />
      )}
    </div>
  );
}

function UsersStatsNumber({
  value,
  muted,
  dateRange,
}: {
  value: number;
  muted?: boolean;
  dateRange: "last-7-days" | "last-month" | "last-year";
}) {
  return (
    <div className="flex items-center gap-1">
      <span
        className={`rounded-lg ${muted ? "bg-slate-500/10 text-slate-500 dark:bg-slate-500/10 dark:text-slate-400" : "bg-lime-500/15 text-lime-700 dark:bg-lime-500/10 dark:text-lime-400"} px-2 py-1 text-xs font-semibold`}
      >
        {!muted ? `+${value}` : value}
      </span>
      <span className="text-xs text-neutral-500 dark:text-neutral-400">
        {dateRange === "last-7-days"
          ? "nell'ultima settimana"
          : dateRange === "last-month"
            ? "nell'ultimo mese"
            : "nell'ultimo anno"}
      </span>
    </div>
  );
}

export default UsersStats;
