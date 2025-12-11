import LazyProductForm from "@/app/_components/products/LazyProductForm";
import Breadcrumbs from "@/app/_components/ui/Breadcumbs";

export const metadata = {
  title: "Crea prodotto",
};

export default function Page() {
  return (
    <div>
      <Breadcrumbs href="/dashboard/products" label="Prodotti" />

      <div>
        <LazyProductForm />
      </div>
    </div>
  );
}
