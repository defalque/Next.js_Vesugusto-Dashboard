import type { ReactNode } from "react";
import Logo from "../_components/ui/Logo";

type layoutProps = {
  children: ReactNode;
};

function layout({ children }: layoutProps) {
  return (
    <main className="text-dark flex min-h-screen flex-col items-center justify-center gap-8 p-4 dark:text-gray-100">
      <Logo size="4xl" />
      {children}
    </main>
  );
}

export default layout;
