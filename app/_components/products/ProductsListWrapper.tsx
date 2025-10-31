import { getProducts, getTotalProducts } from "@/app/_lib/apiProducts";
import { LIMIT } from "@/constants/const";
import Pagination from "../ui/Pagination";
import {
  ChatBubbleBottomCenterTextIcon,
  FaceFrownIcon,
} from "@heroicons/react/24/outline";
import LazyProductsList from "./LazyProductsList";

async function ProductsListWrapper({
  filters,
}: {
  filters: {
    page: string;
    sort: string;
    type: string;
    query: string;
  };
}) {
  const productsData = getProducts(LIMIT, filters);
  const productsCountData = getTotalProducts(filters);

  const [{ products }, { count, error }] = await Promise.all([
    productsData,
    productsCountData,
  ]);

  if (!products) {
    return (
      <tbody>
        <tr>
          <td colSpan={6} className="py-10 text-center">
            <div className="flex flex-col">
              <FaceFrownIcon className="mx-auto size-8 text-neutral-500 sm:size-10 dark:text-neutral-400" />
              <span className="mt-2 text-neutral-500 dark:text-neutral-400">
                Non è stato possibile recuperare i dati dei prodotti.
              </span>
              <span className="mx-auto text-center text-sm text-neutral-500 dark:text-neutral-400">
                Riprova più tardi.
              </span>
            </div>
          </td>
        </tr>
      </tbody>
    );
  }

  if (products.length === 0) {
    return (
      <tbody>
        <tr>
          <td colSpan={6} className="py-10 text-center">
            <div className="flex flex-col">
              <ChatBubbleBottomCenterTextIcon className="mx-auto size-8 text-neutral-500 sm:size-10 dark:text-neutral-400" />
              <span className="mt-2 text-neutral-500 dark:text-neutral-400">
                Nessun prodotto trovato.
              </span>
            </div>
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <>
      <LazyProductsList products={products} />

      <tfoot className="border-t border-gray-200 bg-gray-50/30 text-sm dark:border-zinc-700/40 dark:bg-zinc-800/40">
        <tr>
          {error ? (
            <td colSpan={6}>
              <div className="dark:text-light p-3 font-medium text-neutral-700">
                Errore imprevisto durante il recupero dei dati. Riprova più
                tardi.
              </div>
            </td>
          ) : (
            <td colSpan={6}>
              <Pagination count={count ?? 0} LIMIT={LIMIT} />
            </td>
          )}
        </tr>
      </tfoot>
    </>
  );
}

export default ProductsListWrapper;
