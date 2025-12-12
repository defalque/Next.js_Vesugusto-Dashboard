"use client";

import { Product } from "@/app/_lib/definitions";

import dynamic from "next/dynamic";
import { ProductsListSkeleton } from "../ui/Skeletons";
const ProductsList = dynamic(() => import("./ProductsList"), {
  ssr: false,
  loading: () => <ProductsListSkeleton />,
});

function ProductsListClient({ products }: { products: Product[] }) {
  return <ProductsList products={products} />;
}

export default ProductsListClient;
