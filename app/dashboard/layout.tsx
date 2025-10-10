import Sidebar from "../_components/ui/sidebar/Sidebar";
import Logo from "../_components/ui/Logo";
import UserAvatar from "../_components/ui/sidebar/UserAvatar";
import DrawerContextProvider from "../_contexts/DrawerContext";
import DrawerSidebar from "../_components/ui/sidebar/DrawerSidebar";
import Drawer from "../_components/ui/drawer/Drawer";
import { Toaster } from "react-hot-toast";

import {
  ClipboardDocumentCheckIcon,
  HomeIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";

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
    <div className="bg-light text-dark grid min-h-screen grid-cols-1 grid-rows-[auto_1fr] text-sm md:grid-cols-[auto_1fr] md:grid-rows-[1fr] md:gap-y-4 xl:grid-cols-[var(--spacing-sidebar)_1fr] dark:bg-gradient-to-br dark:from-zinc-900 dark:to-zinc-800 dark:text-gray-100">
      <DrawerContextProvider>
        <Drawer className="inline-flex items-start px-1 py-1.5 md:py-7 xl:hidden">
          <Logo />

          <DrawerSidebar links={links}>
            <UserAvatar />
          </DrawerSidebar>
        </Drawer>
      </DrawerContextProvider>

      <Sidebar links={links} />

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

      <main className="_h-full overflow-y-auto border-l border-gray-200 bg-white px-(--page-padding-x) pt-5 pb-14 [--page-padding-x:--spacing(3)] sm:px-4 xl:px-10 xl:pt-16.5 xl:pb-30 dark:border-none dark:bg-zinc-900/80 dark:backdrop-blur-md">
        {children}
      </main>
    </div>
  );
}
