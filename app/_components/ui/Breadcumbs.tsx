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
          "flex flex-wrap items-baseline text-xl break-all md:text-2xl"
        }
      >
        {breadcrumbs.map((breadcrumb, index) => (
          <li
            key={breadcrumb.href}
            aria-current={breadcrumb.active}
            className={`${breadcrumb.active ? "dark:text-light text-dark text-2xl" : "text-gray-500"} `}
          >
            <Link
              href={breadcrumb.href}
              className="focus-visible:outline-brand-950 outline-brand-dark-100 rounded focus-visible:outline-2"
            >
              {breadcrumb.label}
            </Link>
            {index < breadcrumbs.length - 1 ? (
              <span className="mx-3 inline-block">/</span>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
