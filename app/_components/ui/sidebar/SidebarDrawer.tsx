"use client";

import { ReactNode } from "react";

import { Drawer } from "vaul";

import Logo from "../Logo";

import { Bars3Icon } from "@heroicons/react/24/outline";
import NavLinks from "./NavLinks";
import { NavLink } from "@/app/_lib/definitions";
import { useSidebarDrawer } from "@/app/_contexts/DrawerContext";
import SidebarFooter from "./SidebarFooter";

export default function SidebarDrawer({
  links,
  children,
}: {
  links: NavLink[];
  children?: ReactNode;
}) {
  const { isOpen, setIsOpen } = useSidebarDrawer();

  return (
    <div className="bg-light sticky top-0 z-50 flex items-start border-b border-gray-200 px-1 py-1 md:h-screen md:border-r md:py-5 xl:hidden dark:border-zinc-700/40 dark:bg-zinc-800/40">
      <button
        aria-label="Apri sidebar menu"
        onClick={() => {
          setIsOpen(true);
        }}
        className="focus sticky top-5 cursor-pointer rounded-md p-1 text-sm hover:bg-gray-200/60 dark:hover:bg-white/5"
      >
        <Bars3Icon
          aria-hidden
          className="dark:text-light size-8 text-neutral-700"
        />
      </button>

      <Drawer.Root open={isOpen} onOpenChange={setIsOpen} direction="left">
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 z-250 bg-black/20 xl:hidden" />
          <Drawer.Content
            className="fixed top-2 bottom-2 left-2 z-250 flex w-[var(--spacing-sidebar)] outline-none xl:hidden"
            // The gap between the edge of the screen and the drawer is 8px in this case.
            style={
              {
                "--initial-transform": "calc(100% + 8px)",
              } as React.CSSProperties
            }
          >
            <div className="padding-sidebar flex h-full w-full max-w-md grow flex-col overflow-y-auto rounded-[16px] border border-gray-300 bg-gray-100 text-neutral-500/90 dark:border-zinc-700/40 dark:bg-zinc-800 dark:text-gray-300/80">
              <Drawer.Title className="mb-2 text-center">
                <Logo />
              </Drawer.Title>

              <nav aria-label="Navigazione principale">
                <NavLinks links={links} onClose={() => setIsOpen(false)} />
              </nav>

              <SidebarFooter onClose={() => setIsOpen(false)}>
                {children}
              </SidebarFooter>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  );
}
