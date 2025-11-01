import Link from "next/link";

import { notoSerif } from "./_lib/fonts";

import Logo from "./_components/ui/Logo";

export default function Page() {
  return (
    <main className="grid min-h-screen place-content-center">
      <div className="flex flex-col gap-12">
        <div className="flex items-center gap-4 self-center">
          <Logo size="5xl" />
          <span className="before:bg-brand-950 relative inline-block before:absolute before:-inset-2 before:block before:-skew-y-3 before:dark:bg-white">
            <span
              className={`${notoSerif.className} xs:text-4xl relative text-3xl text-white text-shadow-2xs md:text-5xl dark:text-gray-950`}
            >
              Dashboard
            </span>
          </span>
        </div>

        <Link
          href="/dashboard"
          className="bg-brand-950 hover:bg-brand-900 active:bg-brand-900 self-center rounded-md px-4 py-2 text-base font-semibold text-white shadow-sm transition-all duration-300 text-shadow-2xs active:scale-97 sm:py-1.5 dark:bg-white dark:text-black dark:text-shadow-none dark:hover:bg-white/80 dark:active:bg-gray-100"
        >
          Accedi
        </Link>
      </div>
    </main>
  );
}
