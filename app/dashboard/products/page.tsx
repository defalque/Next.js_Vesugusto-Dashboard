import ItemsTableHeadingCell from "@/app/_components/ui/items-table/ItemsTableHeadingCell";
import { ProductsListSkeleton } from "@/app/_components/ui/Skeletons";
import { Suspense } from "react";
import DialogContextProvider from "@/app/_contexts/DialogContext";
import CustomDialogWrapper from "@/app/_components/ui/dialog/CustomDialogWrapper";
import {
  PRODUCT_SORTBY_OPTIONS,
  ProductParams,
  TYPE_OPTIONS,
} from "@/app/_lib/definitions";
import LazyControls from "@/app/_components/ui/controls/LazyControls";
import ProductsFiltersResolver from "@/app/_components/products/ProductsFiltersResolver";
import Link from "next/link";

export const metadata = {
  title: "Prodotti",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<ProductParams>;
}) {
  const filterParams = searchParams.then((sp) => ({
    type: sp.type,
    sort: sp.sort,
    query: sp.query,
    page: sp.page,
  }));

  return (
    <section>
      <div className="pb-4 text-2xl font-bold">Prodotti</div>

      <div className="mb-6 flex flex-wrap gap-3 lg:mb-8 lg:gap-5">
        <LazyControls
          placeholder="Cerca prodotto..."
          filterField="type"
          filterOptions={TYPE_OPTIONS}
          sortByField="sort"
          sortByOptions={PRODUCT_SORTBY_OPTIONS}
        />

        <Link
          className="bg-brand-950 hover:bg-brand-900 touch-hitbox border-brand-950 flex cursor-pointer items-center rounded-lg border px-3 py-2.5 font-semibold text-white shadow-sm inset-shadow-2xs transition-colors duration-300 dark:border-zinc-700/40 dark:bg-zinc-700/80 dark:inset-shadow-white/20 dark:hover:bg-zinc-600/90"
          href="products/create"
        >
          <span className="">Aggiungi prodotto</span>
          {/* <span className="block sm:hidden">Aggiungi</span> */}
        </Link>
      </div>

      <div className="-mx-(--page-padding-x) flex overflow-x-auto rounded-md md:mx-0">
        <div className="grow px-(--page-padding-x) md:px-0">
          <DialogContextProvider>
            <table className="_relative _overflow-hidden min-w-full">
              <thead className="border-b border-gray-200/80 text-xs sm:text-sm dark:border-zinc-700/40">
                <tr>
                  <ItemsTableHeadingCell>Nome</ItemsTableHeadingCell>
                  <ItemsTableHeadingCell>Prezzo</ItemsTableHeadingCell>
                  <ItemsTableHeadingCell>Sconto</ItemsTableHeadingCell>
                  <ItemsTableHeadingCell>Tipo</ItemsTableHeadingCell>
                  <ItemsTableHeadingCell className="text-center">
                    Stock
                  </ItemsTableHeadingCell>
                  <ItemsTableHeadingCell className="text-center">
                    Opzioni
                  </ItemsTableHeadingCell>
                  <th />
                </tr>
              </thead>

              <Suspense fallback={<ProductsListSkeleton />}>
                <ProductsFiltersResolver filterParams={filterParams} />
              </Suspense>
            </table>

            <CustomDialogWrapper />
          </DialogContextProvider>
        </div>
      </div>
    </section>
  );
}
