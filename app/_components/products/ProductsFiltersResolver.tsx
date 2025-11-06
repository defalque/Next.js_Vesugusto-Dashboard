import { Suspense } from "react";
import { ProductsListSkeleton } from "../ui/Skeletons";
import ProductsListWrapper from "./ProductsListWrapper";
import { ProductParams } from "@/app/_lib/definitions";

async function ProductsFiltersResolver({
  filterParams,
}: {
  filterParams: Promise<ProductParams>;
}) {
  const params = await filterParams;

  const filters = {
    type: params?.type || "all",
    sort: params?.sort || "most-recent",
    query: params?.query || "",
    page: params?.page || "1",
  };
  const filtersKey = `${filters.type}-${filters.sort}-${filters.query}-${filters.page}`;

  return (
    <Suspense fallback={<ProductsListSkeleton />} key={filtersKey}>
      <ProductsListWrapper filters={filters} />
    </Suspense>
  );
}

export default ProductsFiltersResolver;
