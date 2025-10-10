import OrdersListWrapper from "@/app/_components/orders/OrdersListWrapper";
import CustomDialogWrapper from "@/app/_components/ui/dialog/CustomDialogWrapper";
import Filter from "@/app/_components/ui/Filter";
import ItemsTableHeadingCell from "@/app/_components/ui/items-table/ItemsTableHeadingCell";
import PageTitle from "@/app/_components/ui/PageTitle";
import Pagination from "@/app/_components/ui/Pagination";
import Search from "@/app/_components/ui/Search";
import { OrdersListSkeleton } from "@/app/_components/ui/Skeletons";
import SortBy from "@/app/_components/ui/SortBy";
import DialogContextProvider from "@/app/_contexts/DialogContext";
import { getTotalOrders } from "@/app/_lib/apiOrders";
import { Suspense } from "react";

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
    sort: params?.sort || "default",
    query: params?.query || "",
    page: params?.page || "1",
  };
  const filtersKey = `${filters.status}-${filters.sort}-${filters.query}-${filters.page}`;

  const count = await getTotalOrders(filters);

  return (
    <section>
      <div className="mb-8">
        <PageTitle>Ordini</PageTitle>
      </div>

      <div className="mb-6 flex flex-col gap-2 lg:mb-8 lg:flex-row lg:gap-5">
        <Search placeholder="Cerca ordine..." />
        <div className="inline-flex flex-col items-end gap-2 self-end sm:flex-row sm:items-center sm:gap-4">
          <Filter
            filterField="status"
            options={[
              { value: "all", label: "Tutto" },
              { value: "delivered", label: "Consegnato" },
              { value: "unconfirmed", label: "In attesa" },
              { value: "ready", label: "Pronto" },
            ]}
          />
          <SortBy />
        </div>
      </div>

      <div className="-mx-(--page-padding-x) flex overflow-x-auto rounded-md md:-mx-0">
        <div className="grow px-(--page-padding-x) md:px-0">
          <DialogContextProvider>
            <table className="min-w-full">
              <thead className="bg-gray-50 text-xs sm:text-sm dark:bg-zinc-800">
                <tr>
                  <ItemsTableHeadingCell>ID</ItemsTableHeadingCell>
                  <ItemsTableHeadingCell>Cliente</ItemsTableHeadingCell>
                  {/* <ItemsTableHeadingCell>Nome</ItemsTableHeadingCell> */}
                  {/* <ItemsTableHeadingCell>Email</ItemsTableHeadingCell> */}
                  <ItemsTableHeadingCell>Data</ItemsTableHeadingCell>
                  <ItemsTableHeadingCell>Status</ItemsTableHeadingCell>
                  <ItemsTableHeadingCell>Totale</ItemsTableHeadingCell>
                  <th />
                </tr>
              </thead>

              <Suspense fallback={<OrdersListSkeleton />} key={filtersKey}>
                <OrdersListWrapper filters={filters} />
              </Suspense>

              <tfoot className="bg-gray-50 text-sm dark:bg-zinc-800">
                <tr>
                  <td colSpan={7}>
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
