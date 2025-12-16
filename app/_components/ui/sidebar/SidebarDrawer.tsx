"use client";

import { Drawer } from "vaul";

import Logo from "../Logo";

import { Bars3Icon } from "@heroicons/react/24/outline";
import NavLinks from "./NavLinks";
import { NavLink } from "@/app/_lib/definitions";
import { useSidebarDrawer } from "@/app/_contexts/SidebarDrawerContext";
import UserAvatarButton from "./UserAvatarButton";
import { ReactNode, Suspense } from "react";
import { NavbarBlockSkeleton } from "../Skeletons";

export default function SidebarDrawer({
  links,
  children,
}: {
  links: NavLink[];
  children: ReactNode;
}) {
  const { isOpen, setIsOpen } = useSidebarDrawer();

  return (
    <div className="md:bg-light sticky top-0 z-50 flex items-center justify-between border-gray-200 bg-white px-1 py-1 md:h-screen md:flex-col md:border-r md:border-b md:py-4 xl:hidden dark:border-zinc-700/40 dark:bg-zinc-900 md:dark:bg-zinc-800/40">
      <div className="py-1">
        <button
          aria-label="Apri sidebar menu"
          onClick={() => {
            setIsOpen(true);
          }}
          className="focus touch-hitbox flex cursor-pointer items-center rounded-md p-1 text-sm"
        >
          <Bars3Icon
            aria-hidden
            className="dark:text-light size-9 text-neutral-700"
          />
        </button>
      </div>

      <Suspense fallback={<NavbarBlockSkeleton />}>
        <UserAvatarButton>{children}</UserAvatarButton>
      </Suspense>

      <Drawer.Root open={isOpen} onOpenChange={setIsOpen} direction="left">
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 z-250 bg-black/20 xl:hidden" />
          <Drawer.Description className="sr-only">
            Sidebar menu
          </Drawer.Description>
          <Drawer.Content
            className="fixed top-2 bottom-2 left-2 z-250 flex w-(--spacing-sidebar) outline-none xl:hidden"
            // The gap between the edge of the screen and the drawer is 8px in this case.
            style={
              {
                "--initial-transform": "calc(100% + 8px)",
              } as React.CSSProperties
            }
          >
            <div className="_padding-sidebar bg-style box-style flex h-full w-full max-w-md grow flex-col divide-y divide-gray-200 overflow-y-auto rounded-[16px] border text-neutral-500/90 dark:divide-zinc-700/40 dark:text-gray-300/80">
              <Drawer.Title className="py-4 text-center">
                <Logo />
              </Drawer.Title>

              <nav
                aria-label="Navigazione principale"
                className="text-basemd:text-sm h-full py-5"
              >
                <NavLinks links={links} isMobile />
              </nav>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  );
}
