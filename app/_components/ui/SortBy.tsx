"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

function SortBy() {
  const urlSearchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const activeSortFilter = urlSearchParams.get("sort") ?? "default";

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(urlSearchParams);
      params.set(name, value);

      return params.toString();
    },
    [urlSearchParams],
  );

  return (
    <div className="w-max">
      <label htmlFor="ordina" className="sr-only">
        Ordina
      </label>
      <select
        id="ordina"
        name="ordina"
        aria-label="Ordina prodotti"
        title="Ordina prodotti per prezzo o data creazione"
        value={activeSortFilter}
        onChange={(e) => {
          const value = e.target.value;
          router.push(pathname + "?" + createQueryString("sort", value));
        }}
        className="focus-visible:outline-brand-950 outline-brand-dark-100 block rounded border border-gray-200 px-1 py-3 text-sm shadow focus-visible:outline-2 dark:border-zinc-700"
      >
        <option value="default">Ordina</option>
        <option value="price-asc">Prezzo: dal più basso</option>
        <option value="price-desc">Prezzo: dal più alto</option>
      </select>
    </div>
  );
}

export default SortBy;
