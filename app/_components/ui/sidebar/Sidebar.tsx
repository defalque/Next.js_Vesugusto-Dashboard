import Logo from "../Logo";
import NavLinks from "./NavLinks";
import SidebarFooter from "./SidebarFooter";
import { NavLink } from "@/app/_lib/definitions";
import UserAvatar from "./UserAvatar";

function Sidebar({ links }: { links: NavLink[] }) {
  return (
    <aside className="text-sidebar padding-sidebar sticky top-0 row-span-full row-start-1 hidden h-screen items-center space-y-1 overflow-y-auto xl:flex xl:flex-col">
      <Logo />

      <nav aria-label="Navigazione principale" className="self-stretch">
        <NavLinks links={links} />
      </nav>

      <SidebarFooter>
        <UserAvatar />
      </SidebarFooter>
    </aside>
  );
}

export default Sidebar;
