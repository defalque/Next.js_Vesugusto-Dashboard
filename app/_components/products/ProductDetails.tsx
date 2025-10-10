import { Product } from "@/app/_lib/definitions";
import { formatCurrency } from "@/app/_lib/utils";
import ProductDetail from "./ProductDetail";
import Button from "../ui/Button";
import DeleteProductButton from "./DeleteProductButton";
import DialogContextProvider from "@/app/_contexts/DialogContext";
import CustomDialogWrapper from "../ui/dialog/CustomDialogWrapper";

async function ProductDetails({ product }: { product: Product }) {
  return (
    <div className="flex flex-col gap-8 md:ml-3">
      <div className="flex flex-wrap items-center justify-between gap-5">
        {product.quantity === 0 && (
          <p className="mr-auto rounded-full bg-gradient-to-r from-red-400/30 to-red-300/30 px-3 py-1 text-xs font-semibold tracking-wide text-red-700 uppercase shadow-sm dark:from-red-400/20 dark:to-red-300/10 dark:text-red-500">
            Esaurito
          </p>
        )}
        {product.quantity < 10 && product.quantity > 0 && (
          <p className="_animate-pulse mr-auto rounded-full bg-gradient-to-r from-yellow-400/30 to-amber-300/30 px-3 py-1 text-xs font-semibold tracking-wide text-yellow-700 uppercase shadow-sm dark:from-yellow-400/20 dark:to-amber-300/10 dark:text-yellow-500">
            In esaurimento
          </p>
        )}

        <div className="inline-flex gap-3">
          <Button
            className="px-4"
            href={`/dashboard/products/${product.id}/edit`}
          >
            <span>Modifica</span>
          </Button>

          <DialogContextProvider>
            <DeleteProductButton id={product.id} name={product.name} />

            <CustomDialogWrapper />
          </DialogContextProvider>
        </div>
      </div>

      <div className="flex gap-5">
        <div className="rounded bg-gray-50/65 px-3 py-3 font-medium dark:bg-zinc-800/40">
          <p className="text-xs uppercase">Prezzo</p>
          <span className="text-2xl font-semibold">
            {formatCurrency(product.regularPrice)}
          </span>
        </div>

        <div className="rounded bg-gray-50/65 px-3 py-3 font-medium dark:bg-zinc-800/40">
          <p className="text-xs uppercase">Sconto</p>
          <span className="text-2xl text-red-600 dark:text-red-400">
            {formatCurrency(product.discount ?? 0)}
          </span>
        </div>

        <div className="ml-auto rounded bg-gray-50/65 px-3 py-3 font-medium dark:bg-zinc-800/40">
          <p className="text-xs uppercase">Stock</p>
          <span
            className={`${product.quantity < 10 && product.quantity > 0 && "text-yellow-600 dark:text-yellow-500"} ${product.quantity === 0 && "text-red-600 dark:text-red-500"} text-2xl`}
          >
            {product.quantity}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-8 sm:gap-5">
        <ProductDetail
          productAttribute={product.description}
          label="Descrizione"
        />
        <ProductDetail productAttribute={product.details} label="Dettagli" />
        <ProductDetail
          productAttribute={product.ingredients}
          label="Ingredienti"
        />
        <ProductDetail
          productAttribute={product.info}
          label="Informazioni nutrizionali"
        />
      </div>
    </div>
  );
}

export default ProductDetails;
