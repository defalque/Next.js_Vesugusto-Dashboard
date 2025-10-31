import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

type Breadcrumb = {
  label: string;
  href: string;
  active?: boolean;
};

export default function Breadcrumbs({
  breadcrumbs,
}: {
  breadcrumbs: Breadcrumb[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 block py-2">
      <ol
        className={
          "flex flex-wrap items-baseline text-lg font-medium break-all"
        }
      >
        {breadcrumbs.map((breadcrumb, index) => (
          <li
            key={breadcrumb.href}
            aria-current={breadcrumb.active}
            className={`${breadcrumb.active ? "dark:text-light text-neutral-700" : "text-gray-500/80"} `}
          >
            <Link
              href={breadcrumb.href}
              className="focus-visible:outline-brand-950 outline-brand-dark-100 rounded focus-visible:outline-2"
            >
              {breadcrumb.label}
            </Link>
            {index < breadcrumbs.length - 1 ? (
              <ChevronRightIcon className="mx-2 inline size-4" />
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
