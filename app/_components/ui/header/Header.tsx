import Link from "next/link";
import Logout from "../../credentials/Logout";
import UserAvatar from "../sidebar/UserAvatar";
import { Suspense } from "react";
import { UserAvatarSkeleton } from "../Skeletons";

function Header() {
  return (
    <header className="mt-3 flex items-center justify-between rounded-xl border border-gray-200 bg-white p-2 pl-10 dark:border-none dark:bg-zinc-900/80 dark:backdrop-blur-md">
      <Suspense fallback={<UserAvatarSkeleton />}>
        <Link href="dashboard/account">
          <UserAvatar />
        </Link>
      </Suspense>

      <Logout />
    </header>
  );
}

export default Header;
