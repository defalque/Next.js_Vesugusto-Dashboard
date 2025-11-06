import Logo from "../Logo";
import NavLinks from "./NavLinks";
import SidebarFooter from "./SidebarFooter";
import { NavLink } from "@/app/_lib/definitions";
import UserAvatar from "./UserAvatar";
import { Suspense } from "react";
import { NavbarBlockSkeleton, NavbarSkeleton } from "../Skeletons";

function Sidebar({ links }: { links: NavLink[] }) {
  return (
    <aside className="text-sidebar padding-sidebar bg-box sticky top-0 row-span-full row-start-1 hidden h-screen items-center space-y-1 overflow-y-auto border-r border-gray-200 xl:flex xl:flex-col dark:border-zinc-700/40">
      <Logo py="py-10" />

      <nav aria-label="Navigazione principale" className="self-stretch">
        <Suspense fallback={<NavbarSkeleton />}>
          <NavLinks links={links} />
        </Suspense>
      </nav>

      <Suspense fallback={<NavbarBlockSkeleton className="mt-auto" />}>
        <SidebarFooter>
          <UserAvatar />
        </SidebarFooter>
      </Suspense>
    </aside>
  );
}

export default Sidebar;
