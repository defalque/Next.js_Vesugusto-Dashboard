import { getProduct, getProductName } from "@/app/_lib/apiProducts";
import { notFound } from "next/navigation";
import ProductImage from "@/app/_components/products/ProductImage";
import ProductDetails from "@/app/_components/products/ProductDetails";
import Breadcrumbs from "@/app/_components/ui/Breadcumbs";

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
      <Breadcrumbs
        breadcrumbs={[
          {
            label: "Prodotti",
            href: `/dashboard/products`,
          },
          {
            label: `${product.name}`,
            href: `/dashboard/products/${productId}`,
            active: true,
          },
        ]}
      />

      <div className="grid grid-cols-1 gap-x-5 gap-y-8 lg:grid-cols-2 lg:gap-y-0">
        <ProductImage product={product}></ProductImage>
        <ProductDetails product={product}></ProductDetails>
      </div>
    </>
  );
}
