"use client";

import { ReactNode, Suspense } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { logout } from "@/app/_lib/server-actions";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

import {
  ArrowRightCircleIcon,
  ChevronUpIcon,
  Cog6ToothIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";

import { UserAvatarSkeleton } from "../Skeletons";
import { useMediaQuery } from "@/app/_hooks/useMediaQuery";

function UserAvatarButton({ children }: { children?: ReactNode }) {
  const pathname = usePathname();
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div className="py-1 md:p-2 xl:p-4">
      <Menu>
        <MenuButton
          className={`xl:data-hover:bg-brand-950/10 data-focus:outline-brand-950 xl:data-active:bg-brand-950/10 rounded-lg focus:not-data-focus:outline-none data-focus:outline-2 xl:dark:data-active:bg-zinc-950 xl:dark:data-hover:bg-zinc-950 ${pathname === "/dashboard/account" ? "bg-brand-950/10 dark:text-light text-neutral-700 dark:bg-zinc-950" : "dark:text-light text-neutral-700"}`}
        >
          <div
            className={`group flex cursor-pointer items-center gap-5 rounded-xl px-1 py-1`}
          >
            <Suspense fallback={<UserAvatarSkeleton />}>
              <div className="dark:group-hover:text-light focus-visible:outline-brand-950 outline-brand-dark-100 w-full rounded p-0.5 focus-visible:outline-2">
                {children}
              </div>
            </Suspense>
            <ChevronUpIcon
              className="dark:group-hover:text-light hidden size-3.5 fill-current xl:block"
              aria-hidden={true}
            />
          </div>
        </MenuButton>
        <MenuItems
          transition
          anchor={isMobile ? "top end" : "top start"}
          className={`dark:text-light z-50 w-[12.9rem] origin-top-right space-y-1 rounded-lg border border-gray-200 bg-white p-1 text-sm/6 text-neutral-700 shadow-sm transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0 lg:text-[0.813rem] dark:border-white/15 dark:bg-zinc-950 dark:shadow-zinc-800`}
        >
          <MenuItem>
            {({ close }) => (
              <Link
                href="/dashboard/account"
                onClick={() => {
                  close();
                }}
                className="group data-focus:bg-brand-950/10 flex w-full items-center gap-2 rounded-lg px-2 py-1.5 dark:data-focus:bg-zinc-800/85"
              >
                <UserCircleIcon
                  className="size-7 fill-current md:size-5"
                  aria-hidden={true}
                />
                <span className="text-base font-semibold md:text-sm">
                  Profilo
                </span>
              </Link>
            )}
          </MenuItem>
          <MenuItem>
            {({ close }) => (
              <Link
                href="/dashboard/settings"
                onClick={() => {
                  close();
                }}
                className="group data-focus:bg-brand-950/10 flex w-full items-center gap-2 rounded-lg px-2 py-1.5 dark:data-focus:bg-zinc-800/85"
              >
                <Cog6ToothIcon
                  className="size-7 fill-current md:size-5"
                  aria-hidden={true}
                />
                <span className="text-base font-semibold md:text-sm">
                  Impostazioni
                </span>
              </Link>
            )}
          </MenuItem>
          <MenuItem>
            {({ close }) => (
              <form
                action={logout}
                className="group data-focus:bg-brand-950/10 flex w-full cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 dark:data-focus:bg-zinc-800/85"
              >
                <button
                  type="submit"
                  className="flex w-full cursor-pointer items-center gap-2"
                  onClick={() => {
                    close();
                  }}
                >
                  <ArrowRightCircleIcon
                    className="size-7 fill-current md:size-5"
                    aria-hidden={true}
                  />
                  <span className="text-base font-semibold md:text-sm">
                    Esci
                  </span>
                </button>
              </form>
            )}
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
  );
}

export default UserAvatarButton;
