function StatsPercentage({
  percentage,
  muted,
  label,
}: {
  percentage: number;
  muted?: boolean;
  label: string;
}) {
  return (
    <div className="flex items-center gap-1">
      <span
        className={`rounded-lg ${muted ? "bg-slate-500/10 text-slate-500 dark:bg-slate-500/10 dark:text-slate-400" : "bg-lime-500/15 text-lime-700 dark:bg-lime-500/10 dark:text-lime-400"} px-2 py-1 text-xs font-semibold`}
      >
        {percentage.toFixed(1)}%
      </span>
      <span className="text-xs text-neutral-500 dark:text-neutral-400">
        {label}
      </span>
    </div>
  );
}

export default StatsPercentage;
