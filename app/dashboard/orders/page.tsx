import OrdersListWrapper from "@/app/_components/orders/OrdersListWrapper";
import CustomDialogWrapper from "@/app/_components/ui/dialog/CustomDialogWrapper";
import ItemsTableHeadingCell from "@/app/_components/ui/items-table/ItemsTableHeadingCell";
import { OrdersListSkeleton } from "@/app/_components/ui/Skeletons";
import DialogContextProvider from "@/app/_contexts/DialogContext";
import { ORDER_SORTBY_OPTIONS, STATUS_OPTIONS } from "@/app/_lib/definitions";
import { Suspense } from "react";
import LazyControls from "@/app/_components/ui/controls/LazyControls";

export const metadata = {
  title: "Ordini",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    status: string;
    sort: string;
    query: string;
    page: string;
  }>;
}) {
  const params = await searchParams;

  const filters = {
    status: params?.status || "all",
    sort: params?.sort || "most-recent",
    query: params?.query || "",
    page: params?.page || "1",
  };
  const filtersKey = `${filters.status}-${filters.sort}-${filters.query}-${filters.page}`;

  return (
    <section>
      <div className="mb-6 flex flex-wrap gap-3 lg:mb-8 lg:gap-5">
        <LazyControls
          placeholder="Cerca ordine..."
          filterField="status"
          filterOptions={STATUS_OPTIONS}
          sortByField="sort"
          sortByOptions={ORDER_SORTBY_OPTIONS}
        />
      </div>

      <div className="-mx-(--page-padding-x) flex overflow-x-auto rounded-md border-gray-200 md:-mx-0 md:border dark:border-zinc-700/40">
        <div className="grow px-(--page-padding-x) md:px-0">
          <DialogContextProvider>
            <table className="min-w-full">
              <thead className="border-b border-gray-200 bg-gray-50/30 text-xs sm:text-sm dark:border-zinc-700/40 dark:bg-zinc-800/40">
                <tr>
                  <ItemsTableHeadingCell>ID</ItemsTableHeadingCell>
                  <ItemsTableHeadingCell>Cliente</ItemsTableHeadingCell>
                  <ItemsTableHeadingCell>Data</ItemsTableHeadingCell>
                  <ItemsTableHeadingCell className="text-center">
                    Status
                  </ItemsTableHeadingCell>
                  <ItemsTableHeadingCell>Totale</ItemsTableHeadingCell>
                  <ItemsTableHeadingCell className="text-center">
                    Opzioni
                  </ItemsTableHeadingCell>
                  <th />
                </tr>
              </thead>

              <Suspense fallback={<OrdersListSkeleton />} key={filtersKey}>
                <OrdersListWrapper filters={filters} />
              </Suspense>
            </table>
            <CustomDialogWrapper />
          </DialogContextProvider>
        </div>
      </div>
    </section>
  );
}
