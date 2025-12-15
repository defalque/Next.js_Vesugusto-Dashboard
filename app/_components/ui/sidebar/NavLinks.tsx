"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavLink } from "@/app/_lib/definitions";

import * as m from "motion/react-m";
import { LazyMotion } from "motion/react";
import { useSidebarDrawer } from "@/app/_contexts/SidebarDrawerContext";
import {
  BellAlertIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/solid";
const loadFeatures = () =>
  import("../../../_lib/features").then((res) => res.default);

function NavLinks({ isMobile, links }: { isMobile?: true; links: NavLink[] }) {
  const pathname = usePathname();
  const { closeDialog } = useSidebarDrawer();

  return (
    <LazyMotion features={loadFeatures}>
      <ul className="flex h-full flex-col gap-1">
        {links.map((link) => (
          <li key={link.name} className="relative">
            <Link
              href={link.href}
              className={`focus-visible:outline-brand-950 outline-brand-dark-100 mx-4 flex items-center justify-start rounded-lg font-semibold transition-colors duration-300 focus-visible:outline-2 ${
                pathname.startsWith(link.href)
                  ? "text-brand-950 dark:text-light"
                  : "dark:text-light text-neutral-700"
              }`}
              aria-current={pathname.startsWith(link.href) ? "page" : undefined}
              onNavigate={() => {
                if (isMobile) {
                  closeDialog();
                }
              }}
            >
              <span className="dark:hover:text-light hover:bg-brand-950/10 flex flex-1 items-center gap-2.5 rounded-lg px-2 py-1.5 dark:hover:bg-black/50">
                {link.icon}
                {link.name}
              </span>
            </Link>
            {pathname.startsWith(link.href) && (
              <m.div
                layoutId="link"
                className="bg-brand-950 absolute top-0 left-0 h-full w-[2px] dark:bg-white"
              ></m.div>
            )}
          </li>
        ))}

        <div className="mt-auto">
          <li className="relative">
            <Link
              href="#"
              className={`focus-visible:outline-brand-950 outline-brand-dark-100 mx-4 flex items-center justify-start rounded-lg font-semibold transition-colors duration-300 focus-visible:outline-2 ${
                pathname === "notifications"
                  ? "text-brand-950 dark:text-light"
                  : "dark:text-light text-neutral-700"
              }`}
              aria-current={pathname === "notifications" ? "page" : undefined}
              onNavigate={() => {
                if (isMobile) {
                  closeDialog();
                }
              }}
            >
              <span className="dark:hover:text-light hover:bg-brand-950/10 flex flex-1 items-center gap-2.5 rounded-lg px-2 py-1.5 dark:hover:bg-black/50">
                <BellAlertIcon
                  className="size-7 fill-current md:size-5"
                  aria-hidden={true}
                />
                <span className="text-base font-semibold md:text-sm">
                  Notifiche
                </span>
              </span>
            </Link>
            {pathname === "notifications" && (
              <m.div
                layoutId="link"
                className="bg-brand-950 absolute top-0 left-0 h-full w-[2px] dark:bg-black/50"
              ></m.div>
            )}
          </li>
          <li className="relative">
            <Link
              href="#"
              className={`focus-visible:outline-brand-950 outline-brand-dark-100 mx-4 flex items-center justify-start rounded-lg font-semibold transition-colors duration-300 focus-visible:outline-2 ${
                pathname === "support"
                  ? "text-brand-950 dark:text-light"
                  : "dark:text-light text-neutral-700"
              }`}
              aria-current={pathname === "support" ? "page" : undefined}
              onNavigate={() => {
                if (isMobile) {
                  closeDialog();
                }
              }}
            >
              <span className="dark:hover:text-light hover:bg-brand-950/10 flex flex-1 items-center gap-2.5 rounded-lg px-2 py-1.5 dark:hover:bg-black/50">
                <QuestionMarkCircleIcon
                  className="size-7 fill-current md:size-5"
                  aria-hidden={true}
                />
                <span className="text-base font-semibold md:text-sm">
                  Supporto
                </span>
              </span>
            </Link>
            {pathname === "support" && (
              <m.div
                layoutId="link"
                className="bg-brand-950 absolute top-0 left-0 h-full w-[2px] dark:bg-black/50"
              ></m.div>
            )}
          </li>
        </div>
      </ul>
    </LazyMotion>
  );
}

export default NavLinks;
