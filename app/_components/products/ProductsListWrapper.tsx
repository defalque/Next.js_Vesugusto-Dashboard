import { getProducts } from "@/app/_lib/apiProducts";
import { LIMIT } from "@/constants/const";
import ItemsListFallback from "../ui/items-table/ItemsListFallback";
import ProductsListClient from "./ProductsListClient";

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
  const products = await getProducts(LIMIT, filters);

  if (!Array.isArray(products) || products.length === 0) {
    return <ItemsListFallback items={products} variation="prodotto" />;
  }

  return <ProductsListClient products={products} />;
}

export default ProductsListWrapper;
