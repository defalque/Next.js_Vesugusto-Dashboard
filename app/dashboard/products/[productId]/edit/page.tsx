// import UpdateProductForm from "@/app/_components/products/ProductForm";
import ProductFormClient from "@/app/_components/products/LazyProductForm";
import Breadcrumbs from "@/app/_components/ui/Breadcumbs";
import { getProduct, getProductName } from "@/app/_lib/apiProducts";
import { notFound } from "next/navigation";

type Slug = {
  params: Promise<{ productId: string }>;
};

export async function generateMetadata({ params }: Slug) {
  const { productId } = await params;
  const product = await getProductName(productId);
  if (product) {
    return { title: `Modifica "${product.name}"` };
  }
}

export default async function Page({ params }: Slug) {
  const { productId } = await params;
  const product = await getProduct(productId);

  if (!product) {
    notFound();
  }

  return (
    <div>
      <Breadcrumbs
        breadcrumbs={[
          {
            label: `${product.name}`,
            href: `/dashboard/products/${productId}`,
          },
          {
            label: `Modifica prodotto`,
            href: `/dashboard/products/${productId}/edit`,
            active: true,
          },
        ]}
      />

      <div>
        {/* <UpdateProductForm product={product} /> */}
        <ProductFormClient product={product} />
      </div>
    </div>
  );
}
