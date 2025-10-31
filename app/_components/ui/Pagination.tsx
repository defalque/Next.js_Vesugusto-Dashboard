"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import Button from "./Button";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

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
        <p className="text-sm">
          {(currentPage - 1) * LIMIT + 1 ===
          (currentPage === pageCount ? count : currentPage * LIMIT) ? (
            <span>Ultimo risultato</span>
          ) : (
            <>
              <span className="font-semibold">
                {(currentPage - 1) * LIMIT + 1}
              </span>{" "}
              a{" "}
              <span className="font-semibold">
                {currentPage === pageCount ? count : currentPage * LIMIT}
              </span>
            </>
          )}{" "}
          di <span className="font-semibold">{count}</span> risultati trovati.
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
            <Button isPaginationButton onClick={prevPage} className="space-x-1">
              <ChevronLeftIcon className="size-5" />
              <span className="pr-1.5">Indietro</span>
            </Button>
          )}

          {currentPage !== pageCount && (
            <Button isPaginationButton onClick={nextPage} className="space-x-1">
              <span className="pl-1.5">Continua</span>
              <ChevronRightIcon className="size-5" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export default Pagination;
