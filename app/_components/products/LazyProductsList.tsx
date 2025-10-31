"use client";

import { Product } from "@/app/_lib/definitions";

import dynamic from "next/dynamic";
import { ProductsListBodySkeleton } from "../ui/Skeletons";
const ProductsList = dynamic(() => import("./ProductsList"), {
  ssr: false,
  loading: () => <ProductsListBodySkeleton />,
});

function LazyProductsList({ products }: { products: Product[] }) {
  return <ProductsList products={products} />;
}

export default LazyProductsList;
