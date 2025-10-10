import { getTotalProducts } from "@/app/_lib/apiProducts";
import Pagination from "./Pagination";
import { getTotalOrders } from "@/app/_lib/apiOrders";

async function TableFooter({
  filters,
}: {
  filters: {
    page: string;
    sort: string;
    query: string;
    type?: string;
    status?: string;
  };
}) {
  let count;

  if (filters.type) {
    count = await getTotalProducts({ ...filters, type: filters.type });
  }
  if (filters.status) {
    count = await getTotalOrders({ ...filters, status: filters.status });
  }

  return (
    <tfoot className="bg-gray-50 text-sm dark:bg-zinc-800">
      <tr>
        <td colSpan={6}>
          <Pagination count={count ?? 0} />
        </td>
      </tr>
    </tfoot>
  );
}

export default TableFooter;
