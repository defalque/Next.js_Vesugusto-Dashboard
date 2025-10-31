function StatusTag({
  status,
  className,
}: {
  status: string;
  className?: string;
}) {
  return (
    <span
      className={`${className} rounded px-3 py-1 text-center text-xs font-bold tracking-wide text-white uppercase text-shadow-2xs ${
        status === "unconfirmed"
          ? "bg-amber-500 dark:bg-amber-500/15 dark:text-amber-500"
          : status === "delivered"
            ? "bg-green-600 dark:bg-green-400/10 dark:text-green-500"
            : status === "ready"
              ? "bg-blue-500 dark:bg-blue-400/10 dark:text-blue-400"
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
