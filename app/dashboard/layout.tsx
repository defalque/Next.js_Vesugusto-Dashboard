import SidebarDrawerContextProvider from "../_contexts/SidebarDrawerContext";
import Sidebar from "../_components/ui/sidebar/Sidebar";
import SidebarDrawer from "../_components/ui/sidebar/SidebarDrawer";

import {
  HomeModernIcon,
  Squares2X2Icon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/solid";
import UserAvatar from "../_components/ui/sidebar/UserAvatar";
import { Toaster } from "../_components/ui/Toaster";

const links = [
  {
    name: "Dashboard",
    href: "/dashboard/overview",
    icon: (
      <HomeModernIcon className="size-7 fill-current md:size-5" aria-hidden />
    ),
  },
  {
    name: "Prodotti",
    href: "/dashboard/products",
    icon: (
      <Squares2X2Icon className="size-7 fill-current md:size-5" aria-hidden />
    ),
  },
  {
    name: "Ordini",
    href: "/dashboard/orders",
    icon: (
      <ClipboardDocumentCheckIcon
        className="size-7 fill-current md:size-5"
        aria-hidden
      />
    ),
  },
];

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="text-dark bg-style relative flex w-full flex-col text-sm md:flex-row dark:text-gray-100">
      <SidebarDrawerContextProvider>
        <Sidebar links={links} />
        <SidebarDrawer links={links}>
          <UserAvatar />
        </SidebarDrawer>
      </SidebarDrawerContextProvider>

      <main className="relative min-h-svh w-full overflow-visible overflow-y-auto border-gray-200 bg-white pt-3 pb-12 [--page-padding-x:--spacing(3)] md:pl-18 xl:pl-60 dark:bg-zinc-900/80">
        <div className="px-(--page-padding-x) sm:px-4 sm:pt-5 xl:px-10 xl:py-10">
          <Toaster />

          {children}
        </div>
      </main>
    </div>
  );
}
