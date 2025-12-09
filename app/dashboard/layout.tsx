import { Toaster } from "react-hot-toast";

import SidebarDrawerContextProvider from "../_contexts/SidebarDrawerContext";
import Sidebar from "../_components/ui/sidebar/Sidebar";
import SidebarDrawer from "../_components/ui/sidebar/SidebarDrawer";

import {
  HomeModernIcon,
  Squares2X2Icon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/solid";
import UserAvatar from "../_components/ui/sidebar/UserAvatar";

const links = [
  {
    name: "Dashboard",
    href: "/dashboard",
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
    <div className="text-dark bg-style grid grid-cols-1 grid-rows-[auto_1fr] text-sm md:grid-cols-[auto_1fr] md:grid-rows-[1fr] md:gap-y-4 xl:grid-cols-[var(--spacing-sidebar)_1fr] dark:text-gray-100">
      <SidebarDrawerContextProvider>
        <Sidebar links={links} />
        <SidebarDrawer links={links}>
          <UserAvatar />
        </SidebarDrawer>
      </SidebarDrawerContextProvider>

      <main className="min-h-screen overflow-visible overflow-y-auto border-gray-200 bg-white px-(--page-padding-x) pt-3 pb-12 [--page-padding-x:--spacing(3)] sm:px-4 sm:pt-5 xl:px-10 xl:py-10 dark:bg-zinc-900/80 dark:backdrop-blur-md">
        <Toaster
          position="top-center"
          gutter={12}
          toastOptions={{
            success: {
              duration: 5000,
            },
            error: {
              duration: 5000,
            },
          }}
        />
        {children}
      </main>
    </div>
  );
}
