import type { ReactNode } from "react";

type layoutProps = {
  children: ReactNode;
};

function layout({ children }: layoutProps) {
  return (
    <div className="text-dark bg-light flex min-h-screen items-center justify-center py-4 dark:bg-linear-330 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-700 dark:text-gray-100">
      {children}
    </div>
  );
}

export default layout;
