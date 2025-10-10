"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavLink } from "@/app/_lib/definitions";

function NavLinks({
  onClose,
  links,
}: {
  onClose?: () => void;
  links: NavLink[];
}) {
  const pathname = usePathname();

  return (
    <ul className="flex flex-col gap-1">
      {links.map((link) => (
        <li key={link.name}>
          <Link
            href={link.href}
            className={`focus-visible:outline-brand-950 outline-brand-dark-100 relative z-10 flex items-center justify-start space-x-5 overflow-hidden rounded px-3.5 py-2 font-semibold transition-colors duration-300 focus-visible:outline-2 ${
              pathname === link.href
                ? "text-brand-950 dark:text-light bg-white dark:bg-zinc-800"
                : "hover:text-brand-950 dark:hover:text-light"
            }`}
            aria-current={pathname === link.href ? "page" : undefined}
            onNavigate={() => {
              if (onClose) {
                onClose();
              }
            }}
          >
            <span className="relative z-10 flex items-center gap-4">
              {link.icon}
              {link.name}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default NavLinks;
