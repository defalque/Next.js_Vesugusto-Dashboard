import type { ReactNode } from "react";
import Logo from "../_components/ui/Logo";

type layoutProps = {
  children: ReactNode;
};

function layout({ children }: layoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="text-dark my-auto flex flex-col items-center justify-center gap-8 p-4 dark:text-gray-100">
        <Logo size="4xl" />
        {children}
      </main>
      <footer className="dark:text-light/80 flex flex-col items-center justify-center gap-8 p-4 text-center text-[13px] text-neutral-600 sm:text-sm">
        <p>© 2025 Vesugusto Dashboard. Tutti i diritti riservati.</p>
      </footer>
    </div>
  );
}

export default layout;
