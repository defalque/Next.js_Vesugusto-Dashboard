"use client";

import { ReactNode, Suspense } from "react";
import { UserAvatarSkeleton } from "../Skeletons";
import Link from "next/link";
import { usePathname } from "next/navigation";

function SidebarFooter({
  children,
  onClose,
}: {
  children: ReactNode;
  onClose?: () => void;
}) {
  const pathname = usePathname();

  return (
    <div
      className={`mt-auto inline-flex items-center justify-between gap-5 self-stretch rounded px-2.5 py-1 ${
        pathname === "/dashboard/account"
          ? "text-brand-950 dark:text-light bg-white dark:bg-zinc-800"
          : "hover:text-brand-950 dark:hover:text-light"
      }`}
    >
      <Suspense fallback={<UserAvatarSkeleton />}>
        <Link
          href="/dashboard/account"
          className="dark:hover:text-brand-50 hover:text-brand-950 focus-visible:outline-brand-950 outline-brand-dark-100 w-full rounded p-0.5 transition-colors duration-300 focus-visible:outline-2"
          onNavigate={onClose}
        >
          {children}
        </Link>
      </Suspense>
    </div>
  );
}

export default SidebarFooter;
