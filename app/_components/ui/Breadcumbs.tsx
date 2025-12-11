"use client";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

type Breadcrumb = {
  label: string;
  href: string;
};

export default function Breadcrumbs({ href, label }: Breadcrumb) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4 block w-fit list-none">
      <li>
        <Link
          href={href}
          className="touch-hitbox mb-4 flex w-fit cursor-pointer items-center text-xl sm:text-lg md:text-base"
        >
          <ChevronLeftIcon className="mr-2 inline size-5 text-xl sm:text-lg md:size-4 md:text-base" />
          {label}
        </Link>
      </li>
    </nav>
  );
}
