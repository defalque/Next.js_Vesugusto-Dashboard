function StatusTag({
  status,
  className,
}: {
  status: string;
  className?: string;
}) {
  return (
    <span
      className={`${className} text-center uppercase ${
        status === "unconfirmed"
          ? "_animate-pulse rounded-full bg-gradient-to-r from-yellow-400/30 to-amber-300/30 px-3 py-1 text-xs font-semibold tracking-wide text-yellow-700 shadow-sm dark:from-yellow-400/20 dark:to-amber-300/10 dark:text-yellow-400"
          : status === "delivered"
            ? "rounded-full bg-green-400/20 px-3 py-1 text-xs font-semibold tracking-wide text-green-700 shadow-sm dark:bg-green-400/10 dark:text-green-500"
            : status === "ready"
              ? "rounded-full bg-blue-400/20 px-3 py-1 text-xs font-semibold tracking-wide text-blue-700 shadow-sm dark:bg-blue-400/10 dark:text-blue-400"
              : ""
      }`}
    >
      {status === "unconfirmed" && "In attesa"}
      {status === "delivered" && "Consegnato"}
      {status === "ready" && "Pronto"}
    </span>
  );
}

export default StatusTag;
