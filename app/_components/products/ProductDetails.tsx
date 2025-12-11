import { Product } from "@/app/_lib/definitions";
import { formatCurrency } from "@/app/_lib/utils";
import ProductDetail from "./ProductDetail";
import DeleteProductButton from "./DeleteProductButton";
import DialogContextProvider from "@/app/_contexts/DialogContext";
import CustomDialogWrapper from "../ui/dialog/CustomDialogWrapper";
import Link from "next/link";

async function ProductDetails({ product }: { product: Product }) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-5">
        <div className="flex flex-1 items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <p className="text-3xl font-bold text-neutral-700 dark:text-white">
              {product.name}
            </p>
            {product.quantity < 10 && product.quantity > 0 && (
              <span className="rounded-lg bg-yellow-500/10 px-2 py-1 text-xs font-medium text-yellow-600 dark:text-yellow-400">
                In easurimento
              </span>
            )}
            {product.quantity === 0 && (
              <span className="rounded-lg bg-red-500/10 px-2 py-1 text-xs font-medium text-red-600 dark:text-red-500">
                Fuori scorta
              </span>
            )}
          </div>
          <div className="flex gap-3">
            <Link
              className="touch-hitbox flex cursor-pointer items-center rounded-lg border border-gray-300 bg-white px-3 py-2.5 font-semibold text-black inset-shadow-2xs transition-colors duration-300 hover:bg-gray-100/80 dark:border-zinc-700/40 dark:bg-zinc-700/80 dark:text-white dark:shadow-sm dark:inset-shadow-white/20 dark:hover:bg-zinc-600/90"
              href={`/dashboard/products/${product.id}/edit`}
            >
              <span>Modifica</span>
            </Link>

            <DialogContextProvider>
              <DeleteProductButton id={product.id} name={product.name} />

              <CustomDialogWrapper />
            </DialogContextProvider>
          </div>
        </div>
      </div>

      <div className="dark:text-light flex flex-row justify-between gap-10 text-neutral-700">
        <div className="dark:text-light flex flex-col gap-2 border-t border-gray-200 py-4 text-neutral-700 dark:border-zinc-700/40">
          <h5 className="mb-2 self-baseline text-base font-semibold tracking-wide uppercase sm:text-sm md:text-xs">
            Prezzo
          </h5>
          <p className="text-4xl leading-none font-medium md:text-3xl">
            {formatCurrency(product.regularPrice)}
          </p>
        </div>

        <div className="dark:text-light flex flex-col gap-2 border-t border-gray-200 py-4 text-neutral-700 dark:border-zinc-700/40">
          <h5 className="mb-2 self-baseline text-base font-semibold tracking-wide uppercase sm:text-sm md:text-xs">
            Stock
          </h5>
          <p className="text-4xl leading-none font-medium md:text-3xl">
            {product.quantity}
          </p>
        </div>

        <div className="dark:text-light flex flex-col gap-2 border-t border-gray-200 py-4 text-neutral-700 dark:border-zinc-700/40">
          <h5 className="mb-2 self-baseline text-base font-semibold tracking-wide uppercase sm:text-sm md:text-xs">
            Quantità vendute
          </h5>
          <p className="text-4xl leading-none font-medium md:text-3xl">45</p>
        </div>

        <div className="dark:text-light flex flex-col gap-2 border-t border-gray-200 py-4 text-neutral-700 dark:border-zinc-700/40">
          <h5 className="mb-2 self-baseline text-base font-semibold tracking-wide uppercase sm:text-sm md:text-xs">
            Ricavi generati
          </h5>
          <p className="text-4xl leading-none font-medium md:text-3xl">
            {formatCurrency(55000)}
          </p>
          <div className="flex items-center gap-1">
            <span
              className={`rounded-lg ${false ? "bg-slate-500/10 text-slate-500 dark:bg-slate-500/10 dark:text-slate-400" : "bg-lime-500/15 text-lime-700 dark:bg-lime-500/10 dark:text-lime-400"} px-2 py-1 text-xs font-semibold`}
            >
              15%
            </span>
            <span className="text-xs text-neutral-500 dark:text-neutral-400">
              dei ricavi totali
            </span>
          </div>
        </div>

        <div className="dark:text-light flex flex-col gap-2 border-t border-gray-200 py-4 text-neutral-700 dark:border-zinc-700/40">
          <h5 className="mb-2 self-baseline text-base font-semibold tracking-wide uppercase sm:text-sm md:text-xs">
            Frequenza ordini
          </h5>
          <p className="text-4xl leading-none font-medium md:text-3xl">34</p>
          <div className="flex items-center gap-1">
            <span
              className={`rounded-lg ${false ? "bg-slate-500/10 text-slate-500 dark:bg-slate-500/10 dark:text-slate-400" : "bg-lime-500/15 text-lime-700 dark:bg-lime-500/10 dark:text-lime-400"} px-2 py-1 text-xs font-semibold`}
            >
              32%
            </span>
            <span className="text-xs text-neutral-500 dark:text-neutral-400">
              degli ordini totali
            </span>
          </div>
        </div>

        <div className="dark:text-light flex flex-col gap-2 border-t border-gray-200 py-4 text-neutral-700 dark:border-zinc-700/40">
          <h5 className="mb-2 self-baseline text-base font-semibold tracking-wide uppercase sm:text-sm md:text-xs">
            Wishlist utenti
          </h5>
          <p className="text-4xl leading-none font-medium md:text-3xl">23</p>
          <div className="flex items-center gap-1">
            <span
              className={`rounded-lg ${false ? "bg-slate-500/10 text-slate-500 dark:bg-slate-500/10 dark:text-slate-400" : "bg-lime-500/15 text-lime-700 dark:bg-lime-500/10 dark:text-lime-400"} px-2 py-1 text-xs font-semibold`}
            >
              32%
            </span>
            <span className="text-xs text-neutral-500 dark:text-neutral-400">
              degli utenti totali
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
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
