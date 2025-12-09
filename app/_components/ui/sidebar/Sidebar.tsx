import Logo from "../Logo";
import NavLinks from "./NavLinks";
import { NavLink } from "@/app/_lib/definitions";
import UserAvatar from "./UserAvatar";
import { Suspense } from "react";
import { NavbarBlockSkeleton, NavbarSkeleton } from "../Skeletons";
import UserAvatarButton from "./UserAvatarButton";

function Sidebar({ links }: { links: NavLink[] }) {
  return (
    <aside className="text-sidebar bg-box sticky top-0 row-span-full row-start-1 hidden h-screen items-center space-y-1 divide-y divide-gray-200 overflow-y-auto border-r border-gray-200 xl:flex xl:flex-col dark:divide-zinc-700/40 dark:border-zinc-700/40">
      <div className="self-stretch py-4 text-center">
        <Logo />
      </div>

      <nav
        aria-label="Navigazione principale"
        className="mb-auto h-full self-stretch py-5"
      >
        <Suspense fallback={<NavbarSkeleton />}>
          <NavLinks links={links} />
        </Suspense>
      </nav>

      <Suspense fallback={<NavbarBlockSkeleton />}>
        <UserAvatarButton>
          <UserAvatar />
        </UserAvatarButton>
      </Suspense>
    </aside>
  );
}

export default Sidebar;
