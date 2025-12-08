function StatusTag({
  status,
  className,
}: {
  status: string;
  className?: string;
}) {
  return (
    <span
      className={`${className} _text-white _text-shadow-2xs rounded-lg px-3 py-1 text-center text-xs font-medium tracking-wide uppercase ${
        status === "unconfirmed"
          ? "bg-yellow-500/20 text-yellow-600 dark:bg-amber-500/10 dark:text-amber-400"
          : status === "delivered"
            ? "bg-green-600/20 text-green-600 dark:bg-green-400/10 dark:text-green-400"
            : status === "ready"
              ? "bg-blue-500/20 text-blue-600 dark:bg-blue-400/10 dark:text-blue-300"
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
