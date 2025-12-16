"use client";

import { Product } from "@/app/_lib/definitions";
import dynamic from "next/dynamic";
import { UpdateProductFormSkeleton } from "../ui/Skeletons";
const ProductForm = dynamic(() => import("./ProductForm"), {
  ssr: false,
  loading: () => <UpdateProductFormSkeleton />,
});

function ProductFormClient({ product }: { product?: Product }) {
  if (product) {
    return <ProductForm product={product} />;
  }

  return <ProductForm />;
}

export default ProductFormClient;
