function StatusTag({
  status,
  className,
}: {
  status: string;
  className?: string;
}) {
  return (
    <span
      className={`${className} _text-white _text-shadow-2xs _uppercase rounded-lg px-3 py-1 text-center text-sm font-medium tracking-wide md:text-xs ${
        status === "unconfirmed"
          ? "bg-yellow-500/20 text-yellow-600 dark:bg-amber-500/15 dark:text-yellow-300"
          : status === "delivered"
            ? "bg-emerald-600/10 text-emerald-500 dark:bg-emerald-400/10 dark:text-emerald-400"
            : status === "ready"
              ? "bg-blue-500/20 text-blue-600 dark:bg-blue-400/10 dark:text-sky-400"
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
