"use client";

import { ReactNode, Suspense } from "react";
import NavLinks from "./NavLinks";
import Link from "next/link";
import { UserAvatarSkeleton } from "../Skeletons";
// import Logout from "../../credentials/Logout";
import { useDrawer } from "@/app/_contexts/DrawerContext";
import { NavLink } from "@/app/_lib/definitions";

function DrawerSidebar({
  links,
  children,
}: {
  links: NavLink[];
  children: ReactNode;
}) {
  const { setOpen } = useDrawer();

  return (
    <>
      <nav aria-label="Navigazione principale" className="self-stretch">
        <NavLinks links={links} onClose={() => setOpen(false)} />
      </nav>

      <div className="mt-auto inline-flex items-center justify-between gap-3 self-stretch px-2.5">
        <Suspense fallback={<UserAvatarSkeleton />}>
          <Link
            href="/dashboard/account"
            className="dark:hover:text-brand-50 focus hover:text-brand-950 rounded-md transition-colors duration-300"
            onNavigate={() => setOpen(false)}
          >
            {children}
          </Link>
        </Suspense>

        {/* <Logout /> */}
      </div>
    </>
  );
}

export default DrawerSidebar;
