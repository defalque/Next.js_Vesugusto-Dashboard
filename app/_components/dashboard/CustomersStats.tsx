import { DateRange } from "@/app/_lib/definitions";

type CustomersStatsProps = {
  title: string;
  value:
    | {
        customer_name: string;
        customer_email: string;
        num_orders: number;
      }
    | null
    | string;
  dateRange: DateRange;
};

function CustomersStats({ title, value, dateRange }: CustomersStatsProps) {
  if (!value || value === "Errore") {
    return (
      <div className="dark:text-light flex flex-col gap-2 border-t border-gray-200 py-4 text-neutral-700 dark:border-zinc-700/40">
        <h5 className="mb-2 self-baseline text-base font-semibold tracking-wide uppercase sm:text-sm md:text-xs md:font-semibold">
          {title}
        </h5>
        <p className="py-4 text-2xl leading-none font-medium sm:text-xl md:text-lg">
          {value === "Errore"
            ? "Dati non disponibili"
            : "Nessun miglior cliente"}
        </p>
      </div>
    );
  }

  if (typeof value === "string") {
    return null;
  }

  return (
    <div className="dark:text-light flex flex-col gap-2 border-t border-gray-200 py-4 text-neutral-700 dark:border-zinc-700/40">
      <h5 className="mb-2 self-baseline text-base font-semibold tracking-wide uppercase sm:text-sm md:text-xs md:font-semibold">
        {title}
      </h5>
      <p className="text-2xl leading-none font-medium sm:text-xl md:text-lg">
        {value.customer_name}
      </p>
      <p className="text-sm text-neutral-500 md:text-xs dark:text-neutral-300/90">
        {value.customer_email}
      </p>
      <div className="flex items-center gap-1 text-sm md:text-xs">
        <span className="rounded-lg bg-cyan-500/15 px-2 py-1 font-bold text-cyan-700 dark:bg-cyan-500/10 dark:text-cyan-400">
          {value.num_orders} ordini
        </span>
        <span className="text-neutral-500 dark:text-neutral-400">
          {dateRange === "last-7-days"
            ? "nell'ultima settimana"
            : dateRange === "last-month"
              ? "nell'ultimo mese"
              : "nell'ultimo anno"}
        </span>
      </div>
    </div>
  );
}

export default CustomersStats;
