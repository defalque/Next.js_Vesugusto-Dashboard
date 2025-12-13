import { getProduct, getProductName } from "@/app/_lib/apiProducts";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/app/_components/ui/Breadcumbs";
import ProductDetail from "@/app/_components/products/ProductDetail";
import Link from "next/link";
import DialogContextProvider from "@/app/_contexts/DialogContext";
import DeleteProductButton from "@/app/_components/products/DeleteProductButton";
import CustomDialogWrapper from "@/app/_components/ui/dialog/CustomDialogWrapper";
import ProductStats from "@/app/_components/products/ProductStats";
import ProductImagesHandler from "@/app/_components/products/ProductImagesHandler";
import { Suspense } from "react";
import { ProductStatsSkeleton } from "@/app/_components/ui/Skeletons";
import MotionWrapper from "@/app/_components/ui/MotionWrapper";

type Slug = {
  params: Promise<{ productId: string }>;
};

export async function generateMetadata({ params }: Slug) {
  const { productId } = await params;
  const product = await getProductName(productId);
  if (product) {
    return { title: `${product.name}` };
  }
}

export default async function Page({ params }: Slug) {
  const { productId } = await params;
  const product = await getProduct(productId);

  if (!product) {
    notFound();
  }

  return (
    <>
      <Breadcrumbs href="/dashboard/products" label="Prodotti" />
      <DialogContextProvider>
        <div className="flex flex-col gap-8 sm:gap-5">
          {/* Product header */}
          <div className="flex flex-1 flex-wrap items-center justify-between gap-x-4 gap-y-4">
            <div className="flex items-center gap-2">
              <p className="text-3xl font-bold text-neutral-700 dark:text-white">
                {product.name}
              </p>
              {product.quantity < 10 && product.quantity > 0 && (
                <span className="rounded-lg bg-yellow-500/10 px-2 py-1 text-sm font-medium text-yellow-600 sm:text-xs dark:text-yellow-400">
                  In easurimento
                </span>
              )}
              {product.quantity === 0 && (
                <span className="rounded-lg bg-red-500/10 px-2 py-1 text-sm font-medium text-red-600 sm:text-xs dark:text-red-500">
                  Fuori scorta
                </span>
              )}
            </div>
            <div className="flex gap-3">
              <Link
                className="touch-hitbox flex cursor-pointer items-center rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-base font-semibold text-black inset-shadow-2xs transition-colors duration-300 hover:bg-gray-100/80 sm:text-[15px] md:text-sm dark:border-zinc-700/40 dark:bg-zinc-700/80 dark:text-white dark:shadow-sm dark:inset-shadow-white/20 dark:hover:bg-zinc-600/90"
                href={`/dashboard/products/${product.id}/edit`}
              >
                <span>Modifica</span>
              </Link>

              <DeleteProductButton id={product.id} name={product.name} />

              <CustomDialogWrapper />
            </div>
          </div>

          {/* Stats */}
          <Suspense fallback={<ProductStatsSkeleton />}>
            <ProductStats
              productId={product.id}
              regularPrice={product.regularPrice}
              quantity={product.quantity}
            />
          </Suspense>

          <MotionWrapper>
            {/* Product details */}
            <div className="mt-8 flex basis-1/2 flex-col gap-5 lg:mt-5 lg:gap-3.5">
              <ProductDetail
                productAttribute={product.description}
                label="Descrizione"
              />
              <ProductDetail
                productAttribute={product.details}
                label="Dettagli"
              />
              <ProductDetail
                productAttribute={product.ingredients}
                label="Ingredienti"
              />
              <ProductDetail
                productAttribute={product.info}
                label="Informazioni nutrizionali"
              />
            </div>

            {/* Product images */}
            <ProductImagesHandler product={product}></ProductImagesHandler>
          </MotionWrapper>
        </div>
      </DialogContextProvider>
    </>
  );
}
