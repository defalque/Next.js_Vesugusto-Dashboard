import type { ReactNode } from "react";

type layoutProps = {
  children: ReactNode;
};

function layout({ children }: layoutProps) {
  return (
    <main className="text-dark flex min-h-screen items-center justify-center p-4 dark:text-gray-100">
      {children}
    </main>
  );
}

export default layout;
