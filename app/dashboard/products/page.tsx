import ItemsTableHeadingCell from "@/app/_components/ui/items-table/ItemsTableHeadingCell";
import { ProductsListSkeleton } from "@/app/_components/ui/Skeletons";
import { Suspense } from "react";
import Button from "@/app/_components/ui/Button";
import DialogContextProvider from "@/app/_contexts/DialogContext";
import CustomDialogWrapper from "@/app/_components/ui/dialog/CustomDialogWrapper";
import ProductsListWrapper from "@/app/_components/products/ProductsListWrapper";
import { PRODUCT_SORTBY_OPTIONS, TYPE_OPTIONS } from "@/app/_lib/definitions";
import LazyControls from "@/app/_components/ui/controls/LazyControls";

export const metadata = {
  title: "Prodotti",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    type: string;
    sort: string;
    query: string;
    page: string;
  }>;
}) {
  const params = await searchParams;
  const filters = {
    type: params?.type || "all",
    sort: params?.sort || "most-recent",
    query: params?.query || "",
    page: params?.page || "1",
  };
  const filtersKey = `${filters.type}-${filters.sort}-${filters.query}-${filters.page}`;

  return (
    <section>
      <div className="mb-6 flex flex-wrap gap-3 lg:mb-8 lg:gap-5">
        <LazyControls
          placeholder="Cerca prodotto..."
          filterField="type"
          filterOptions={TYPE_OPTIONS}
          sortByField="sort"
          sortByOptions={PRODUCT_SORTBY_OPTIONS}
        >
          <div className="flex py-5">
            <Button href="products/create" className="flex-1 py-2 text-center">
              Aggiungi prodotto
            </Button>
          </div>
        </LazyControls>

        <Button className="hidden px-4 py-3 lg:block" href="products/create">
          Aggiungi
        </Button>
      </div>

      <div className="-mx-(--page-padding-x) flex overflow-x-auto rounded-md border-gray-200 md:-mx-0 md:border dark:border-zinc-700/40">
        <div className="grow px-(--page-padding-x) md:px-0">
          <DialogContextProvider>
            <table className="_relative _overflow-hidden min-w-full">
              <thead className="border-b border-gray-200 bg-gray-50/30 text-xs sm:text-sm dark:border-zinc-700/40 dark:bg-zinc-800/40">
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

              <Suspense fallback={<ProductsListSkeleton />} key={filtersKey}>
                <ProductsListWrapper filters={filters} />
              </Suspense>
            </table>

            <CustomDialogWrapper />
          </DialogContextProvider>
        </div>
      </div>
    </section>
  );
}
