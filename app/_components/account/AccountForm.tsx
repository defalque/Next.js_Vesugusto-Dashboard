import { ReactNode } from "react";

function AccountForm({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  return (
    <div className="flex flex-col gap-8 rounded bg-gray-50 px-3 py-4 sm:p-8 dark:bg-zinc-800/60">
      <h1 className="text-xl md:text-2xl">{title}</h1>
      {children}
    </div>
  );
}

export default AccountForm;
