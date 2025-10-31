"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavLink } from "@/app/_lib/definitions";

import * as m from "motion/react-m";
import { LazyMotion } from "motion/react";
const loadFeatures = () =>
  import("../../../_lib/features").then((res) => res.default);

function NavLinks({
  onClose,
  links,
}: {
  onClose?: () => void;
  links: NavLink[];
}) {
  const pathname = usePathname();

  return (
    <LazyMotion features={loadFeatures}>
      <ul className="flex flex-col gap-1">
        {links.map((link) => (
          <li key={link.name}>
            <Link
              href={link.href}
              className={`focus-visible:outline-brand-950 outline-brand-dark-100 relative z-100 flex items-center justify-start space-x-5 rounded font-semibold transition-colors duration-300 focus-visible:outline-2 ${
                pathname === link.href
                  ? "text-brand-950 dark:text-light _text-neutral-700"
                  : "hover:text-brand-950 dark:hover:text-light _hover:text-neutral-700"
              }`}
              aria-current={pathname === link.href ? "page" : undefined}
              onNavigate={() => {
                if (onClose) {
                  onClose();
                }
              }}
            >
              <span className="flex items-center gap-4 px-3 py-2">
                {link.icon}
                {link.name}
              </span>
              {pathname === link.href && (
                <m.div
                  layoutId="link"
                  className="absolute -z-100 h-full w-full rounded border border-gray-100 bg-white/80 dark:border-none dark:bg-black/15"
                />
              )}
            </Link>
          </li>
        ))}
      </ul>
    </LazyMotion>
  );
}

export default NavLinks;
