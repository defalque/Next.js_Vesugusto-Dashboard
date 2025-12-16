import Logo from "../Logo";
import NavLinks from "./NavLinks";
import { NavLink } from "@/app/_lib/definitions";
import UserAvatar from "./UserAvatar";
import { Suspense } from "react";
import { NavbarBlockSkeleton, NavbarSkeleton } from "../Skeletons";
import UserAvatarButton from "./UserAvatarButton";
import Aside from "./Aside";

function Sidebar({ links }: { links: NavLink[] }) {
  return (
    <Aside>
      <div className="self-stretch py-4 text-center">
        <Logo />
      </div>

      <nav
        aria-label="Navigazione principale"
        className="h-full min-h-0 self-stretch overflow-y-auto py-5"
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
    </Aside>
  );
}

export default Sidebar;
