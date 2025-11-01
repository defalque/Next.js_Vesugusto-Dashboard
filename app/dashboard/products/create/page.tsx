import ProductFormClient from "@/app/_components/products/ProductFormClient";
import Breadcrumbs from "@/app/_components/ui/Breadcumbs";

export const metadata = {
  title: "Crea prodotto",
};

export default function Page() {
  return (
    <div>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Prodotti", href: "/dashboard/products" },
          {
            label: `Aggiungi prodotto`,
            href: `/dashboard/products/create`,
            active: true,
          },
        ]}
      />

      <div>
        <ProductFormClient />
      </div>
    </div>
  );
}
