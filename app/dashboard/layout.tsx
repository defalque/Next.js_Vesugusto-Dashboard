import { Toaster } from "react-hot-toast";

import {
  ClipboardDocumentCheckIcon,
  HomeIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";

import SidebarDrawerContextProvider from "../_contexts/SidebarDrawerContext";
import Sidebar from "../_components/ui/sidebar/Sidebar";
import SidebarDrawer from "../_components/ui/sidebar/SidebarDrawer";
import UserAvatar from "../_components/ui/sidebar/UserAvatar";

const links = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: <HomeIcon className="size-5.5" aria-hidden={true} />,
  },
  {
    name: "Prodotti",
    href: "/dashboard/products",
    icon: <Squares2X2Icon className="size-5.5" aria-hidden={true} />,
  },
  {
    name: "Ordini",
    href: "/dashboard/orders",
    icon: (
      <ClipboardDocumentCheckIcon className="size-5.5" aria-hidden={true} />
    ),
  },
];

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="text-dark grid grid-cols-1 grid-rows-[auto_1fr] text-sm md:grid-cols-[auto_1fr] md:grid-rows-[1fr] md:gap-y-4 xl:grid-cols-[var(--spacing-sidebar)_1fr] dark:bg-gradient-to-br dark:text-gray-100">
      <div className="bg-white dark:bg-zinc-900/80 dark:backdrop-blur-md">
        <Sidebar links={links} />

        <SidebarDrawerContextProvider>
          <SidebarDrawer links={links}>
            <UserAvatar />
          </SidebarDrawer>
        </SidebarDrawerContextProvider>
      </div>

      <main className="h-full overflow-visible overflow-y-auto border-gray-200 bg-white px-(--page-padding-x) pt-5 pb-5 [--page-padding-x:--spacing(3)] sm:px-4 xl:px-10 xl:py-16.5 dark:bg-zinc-900/80 dark:backdrop-blur-md">
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
