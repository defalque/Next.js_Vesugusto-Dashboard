import ItemsTableHeadingCell from "@/app/_components/ui/items-table/ItemsTableHeadingCell";
import PageTitle from "@/app/_components/ui/PageTitle";
import { ProductsListSkeleton } from "@/app/_components/ui/Skeletons";
import Filter from "@/app/_components/ui/Filter";
import { Suspense } from "react";
import Button from "@/app/_components/ui/Button";
import SortBy from "@/app/_components/ui/SortBy";
import Search from "@/app/_components/ui/Search";
import Pagination from "@/app/_components/ui/Pagination";
import { getTotalProducts } from "@/app/_lib/apiProducts";
import DialogContextProvider from "@/app/_contexts/DialogContext";
import CustomDialogWrapper from "@/app/_components/ui/dialog/CustomDialogWrapper";
import ProductsListWrapper from "@/app/_components/products/ProductsListWrapper";

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
    sort: params?.sort || "default",
    query: params?.query || "",
    page: params?.page || "1",
  };
  const filtersKey = `${filters.type}-${filters.sort}-${filters.query}-${filters.page}`;

  const count = await getTotalProducts(filters);

  return (
    <section>
      <div className="mb-6 flex items-center justify-between gap-5 sm:justify-start">
        <PageTitle>Prodotti</PageTitle>
        <Button className="px-4" href="products/create">
          <span>Aggiungi prodotto</span>
          <span className="ml-2">+</span>
        </Button>
      </div>

      <div className="_items-end mb-6 flex flex-col gap-2 sm:mb-8 sm:flex-row sm:gap-5">
        <Search placeholder="Cerca prodotto..." />
        <div className="flex flex-wrap items-center justify-end gap-4 self-end">
          <Filter
            filterField="type"
            options={[
              { value: "all", label: "Tutto" },
              { value: "drink", label: "Drink" },
              { value: "food", label: "Food" },
            ]}
          />

          <SortBy />
        </div>
      </div>

      <div className="_overflow-y-auto -mx-(--page-padding-x) flex overflow-x-auto rounded-md md:-mx-0">
        <div className="grow px-(--page-padding-x) md:px-0">
          <DialogContextProvider>
            <table className="_relative _overflow-hidden min-w-full">
              <thead className="bg-gray-50 text-xs sm:text-sm dark:bg-zinc-800">
                <tr>
                  <ItemsTableHeadingCell>Nome</ItemsTableHeadingCell>
                  <ItemsTableHeadingCell>Prezzo</ItemsTableHeadingCell>
                  <ItemsTableHeadingCell>Sconto</ItemsTableHeadingCell>
                  <ItemsTableHeadingCell>Tipo</ItemsTableHeadingCell>
                  <ItemsTableHeadingCell className="text-center">
                    Stock
                  </ItemsTableHeadingCell>
                  <th />
                </tr>
              </thead>

              <Suspense fallback={<ProductsListSkeleton />} key={filtersKey}>
                <ProductsListWrapper filters={filters} />
              </Suspense>

              <tfoot className="bg-gray-50 text-sm dark:bg-zinc-800">
                <tr>
                  <td colSpan={6}>
                    <Pagination count={count ?? 0} />
                  </td>
                </tr>
              </tfoot>
            </table>

            <CustomDialogWrapper />
          </DialogContextProvider>
        </div>
      </div>
    </section>
  );
}
