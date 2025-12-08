"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

function Pagination({ count, LIMIT }: { count: number; LIMIT: number }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const pageCount = Math.ceil(count / LIMIT);

  const createQueryString = useCallback(
    (filterField: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(filterField, value);

      return params.toString();
    },
    [searchParams],
  );

  if (count === 0) return null;

  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;
    router.push(pathname + "?" + createQueryString("page", String(next)));
  }

  function prevPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;
    router.push(pathname + "?" + createQueryString("page", String(prev)));
  }

  return (
    <div className="flex w-full items-center justify-between px-4 py-3">
      {pageCount > 1 && (
        <p className="dark:text-light/80 py-2 text-sm text-neutral-700">
          <span className="dark:text-light font-semibold text-black">
            {(currentPage - 1) * LIMIT + 1}
          </span>{" "}
          di{" "}
          <span className="dark:text-light font-semibold text-black">
            {count}
          </span>{" "}
          risultati trovati.
        </p>
      )}

      {pageCount <= 1 && count > 1 && (
        <p className="py-2 text-sm">
          {" "}
          <span className="font-semibold">{count}</span> risultati trovati.
        </p>
      )}
      {pageCount <= 1 && count === 1 && (
        <p className="py-2 text-sm">Un risultato trovato.</p>
      )}

      {pageCount > 1 && (
        <div className="flex gap-2">
          {currentPage !== 1 && (
            <button
              type="button"
              className="bg-brand-950 hover:bg-brand-900 flex cursor-pointer items-center rounded-lg px-4 py-2 font-semibold text-white shadow-sm transition-colors duration-300 dark:bg-zinc-700/40 dark:hover:bg-zinc-700/80"
              onClick={prevPage}
            >
              Indietro
            </button>
          )}

          {currentPage !== pageCount && (
            <button
              type="button"
              className="bg-brand-950 hover:bg-brand-900 flex cursor-pointer items-center rounded-lg px-4 py-2 font-semibold text-white shadow-sm transition-colors duration-300 dark:bg-zinc-700/40 dark:hover:bg-zinc-700/80"
              onClick={nextPage}
            >
              Continua
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Pagination;
