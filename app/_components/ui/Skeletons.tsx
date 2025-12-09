import { LIMIT, ORDERS_LIMIT } from "@/constants/const";

// Loading animation
const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full rounded before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-zinc-500/15 dark:before:via-black/30 before:to-transparent";

export function UserAvatarSkeleton() {
  return (
    <div className="flex animate-none items-center gap-2 dark:animate-pulse">
      <div
        className={`${shimmer} relative flex w-fit cursor-not-allowed items-center gap-3 overflow-hidden rounded-md dark:animate-pulse`}
      >
        <div className="h-8 w-8 rounded-full bg-gray-200 dark:animate-pulse dark:bg-zinc-700" />
        <div className="hidden flex-col gap-1 xl:flex">
          <div className="h-4 w-15 rounded bg-gray-200 dark:animate-pulse dark:bg-zinc-700" />
          <div className="h-3 w-30 rounded bg-gray-200 dark:animate-pulse dark:bg-zinc-700" />
        </div>
      </div>
    </div>
  );
}

export function LoginFormSkeleton({ isAuthForm }: { isAuthForm?: true }) {
  return (
    <div
      className={`bg-box box-style ${isAuthForm && "border"} _animate-pulse w-full gap-3 rounded-md sm:w-110`}
    >
      {/* {isAuthForm && (
        <div className="box-style border-b p-3 text-center text-2xl/9 font-bold tracking-tight">
          Accedi alla dashboard
        </div>
      )} */}
      <div className="dark:text-light _mt-5 flex w-full flex-col gap-3.5 px-5 pt-5 text-sm text-neutral-700 sm:px-10">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <div
              className={`relative h-4 w-14 overflow-hidden rounded bg-gray-200 dark:bg-zinc-700 ${shimmer}`}
            />
            <div
              className={`relative h-4 w-34 overflow-hidden rounded bg-gray-200 dark:bg-zinc-700 ${shimmer}`}
            />
          </div>
          <div
            className={`relative h-6.5 w-6.5 overflow-hidden rounded bg-gray-200 dark:bg-zinc-700 ${shimmer}`}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <div
              className={`relative h-4 w-20 overflow-hidden rounded bg-gray-200 dark:bg-zinc-700 ${shimmer}`}
            />
            <div
              className={`relative h-4 w-34 overflow-hidden rounded bg-gray-200 dark:bg-zinc-700 ${shimmer}`}
            />
          </div>
          <div
            className={`relative h-6.5 w-6.5 overflow-hidden rounded bg-gray-200 dark:bg-zinc-700 ${shimmer}`}
          />
        </div>
      </div>

      <div className="space-y-3 px-5 py-5 sm:px-10">
        {/* Email field */}
        <div className="mb-4 space-y-2">
          <div
            className={`relative h-4 w-1/5 overflow-hidden rounded bg-gray-200 dark:bg-zinc-700 ${shimmer}`}
          />
          <div
            className={`relative h-9 w-full overflow-hidden rounded-md bg-gray-200 dark:bg-zinc-700 ${shimmer}`}
          />
        </div>

        {/* Password field */}
        <div className="mb-4 space-y-2">
          <div className="flex justify-between">
            <div
              className={`relative h-4 w-1/4 overflow-hidden rounded bg-gray-200 dark:bg-zinc-700 ${shimmer}`}
            />
            <div
              className={`relative h-4 w-1/2 self-end overflow-hidden rounded bg-gray-200 dark:bg-zinc-700 ${shimmer}`}
            />
          </div>
          <div
            className={`relative h-9 w-full overflow-hidden rounded-md bg-gray-200 dark:bg-zinc-700 ${shimmer}`}
          />
        </div>

        {/* Button */}
        <div
          className={`relative mt-10 h-9 w-full overflow-hidden rounded-md bg-gray-200 dark:bg-zinc-700 ${shimmer}`}
        />

        {/* Link */}
        <div
          className={`relative mx-auto mt-4 h-4 w-34 overflow-hidden rounded bg-gray-200 dark:bg-zinc-700 ${shimmer}`}
        />
      </div>
    </div>
  );
}

export function SignUpFormSkeleton() {
  return (
    <div className="bg-box box-style w-full animate-pulse gap-3 rounded-md border sm:w-110">
      {/* Email field */}
      <div className="space-y-3 px-5 py-5 sm:px-10">
        <div className="mb-4 space-y-2">
          <div
            className={`relative h-5 w-1/5 overflow-hidden rounded bg-gray-200 dark:bg-zinc-700 ${shimmer}`}
          />
          <div
            className={`relative h-9 w-full overflow-hidden rounded-md bg-gray-200 dark:bg-zinc-700 ${shimmer}`}
          />
        </div>

        {/* Password field */}
        <div className="mb-4 space-y-2">
          <div className="flex justify-between">
            <div
              className={`relative h-5 w-1/4 overflow-hidden rounded bg-gray-200 dark:bg-zinc-700 ${shimmer}`}
            />
            <div
              className={`relative h-4 w-1/2 self-end overflow-hidden rounded bg-gray-200 dark:bg-zinc-700 ${shimmer}`}
            />
          </div>
          <div
            className={`relative h-9 w-full overflow-hidden rounded-md bg-gray-200 dark:bg-zinc-700 ${shimmer}`}
          />
        </div>

        {/* Button */}
        <div
          className={`relative mt-10 h-10 w-full overflow-hidden rounded-md bg-gray-200 dark:bg-zinc-700 ${shimmer}`}
        />

        {/* Link */}
        <div
          className={`relative mx-auto mt-4 h-4 w-34 overflow-hidden rounded bg-gray-200 dark:bg-zinc-700 ${shimmer}`}
        />
      </div>
    </div>
  );
}

export function NavbarBlockSkeleton({ className }: { className?: string }) {
  return (
    <div className="px-2 py-1 md:p-2 xl:p-4">
      <div
        className={`${className} ${shimmer} relative flex w-full cursor-not-allowed items-center gap-3 overflow-hidden rounded-md dark:animate-pulse`}
      >
        <div className="h-8 w-8 rounded-full bg-gray-200 dark:animate-pulse dark:bg-zinc-700" />
        <div className="hidden flex-col gap-1 xl:flex">
          <div className="h-4 w-15 rounded bg-gray-200 dark:animate-pulse dark:bg-zinc-700" />
          <div className="h-3 w-30 rounded bg-gray-200 dark:animate-pulse dark:bg-zinc-700" />
        </div>
      </div>
    </div>
  );
}

export function NavbarSkeleton() {
  return (
    <div className="flex flex-col gap-1">
      {[0, 1, 2].map((link, i) => (
        <NavbarBlockSkeleton key={i} />
      ))}
    </div>
  );
}

// -------------------------------------------------------------
// PRODUCT

export function ControlsSkeleton() {
  return (
    <>
      <div
        className={`${shimmer} relative flex h-11.5 w-1/3 flex-1 cursor-not-allowed overflow-hidden rounded-md border border-gray-200 bg-gray-200 dark:animate-pulse dark:border-zinc-700/40 dark:bg-zinc-700`}
      />
      <div
        className={`${shimmer} relative hidden h-11.5 w-52 cursor-not-allowed overflow-hidden rounded-md border border-gray-200 bg-gray-200 lg:flex dark:animate-pulse dark:border-zinc-700/40 dark:bg-zinc-700`}
      />
      <div
        className={`${shimmer} relative hidden h-11.5 w-52 cursor-not-allowed overflow-hidden rounded-md border border-gray-200 bg-gray-200 lg:flex dark:animate-pulse dark:border-zinc-700/40 dark:bg-zinc-700`}
      />
      <div
        className={`${shimmer} relative flex h-11.5 w-14.5 cursor-not-allowed overflow-hidden rounded-md border border-gray-200 bg-gray-200 lg:hidden dark:animate-pulse dark:border-zinc-700/40 dark:bg-zinc-700`}
      />
    </>
  );
}

function ProductSkeleton({ value }: { value: number }) {
  return (
    <tr
      key={value}
      className="animate-none hover:bg-gray-50/60 dark:animate-pulse dark:hover:bg-zinc-800/25"
    >
      {/* Product Name */}
      <td className="px-4 py-3 whitespace-nowrap">
        <div className="h-4 w-22 rounded bg-gray-200 dark:bg-zinc-700"></div>
      </td>

      {/* Regular Price */}
      <td className="px-4 py-3 whitespace-nowrap">
        <div className="h-4 w-12 rounded bg-gray-200 dark:bg-zinc-700"></div>
      </td>

      {/* Discount */}
      <td className="px-4 py-3 whitespace-nowrap">
        <div className="h-4 w-10 rounded bg-gray-200 dark:bg-zinc-700"></div>
      </td>

      {/* Type */}
      <td className="px-4 py-3 whitespace-nowrap capitalize">
        <div className="h-4 w-12 rounded bg-gray-200 dark:bg-zinc-700"></div>
      </td>

      {/* Quantity */}
      <td className="px-4 py-3 text-center whitespace-nowrap">
        <div className="mx-auto h-4 w-6 rounded bg-gray-200 dark:bg-zinc-700"></div>
      </td>

      {/* Dropdown */}
      <td className="px-4 py-3 text-center whitespace-nowrap">
        <div className="mx-auto h-7 w-8 rounded bg-gray-200 dark:bg-zinc-700"></div>
      </td>
    </tr>
  );
}

export function ProductsListBodySkeleton() {
  return (
    <tbody
      className={`${shimmer} relative h-full divide-y divide-gray-200/80 overflow-hidden text-gray-800/70 dark:divide-zinc-700/20 dark:text-gray-50/80`}
    >
      {Array.from({ length: LIMIT }, (_, i) => (
        <ProductSkeleton key={i} value={i + 1} />
      ))}
    </tbody>
  );
}

export function ProductsListSkeleton() {
  return (
    <>
      <ProductsListBodySkeleton />
      <FooterSkeleton colSpan={6} />
    </>
  );
}

export function SkeletonPageBlock({ className }: { className: string }) {
  return (
    <div
      className={`${shimmer} relative animate-none overflow-hidden rounded bg-gray-200 dark:animate-pulse dark:bg-zinc-700 ${className}`}
    />
  );
}

export function ProductDataSkeleton() {
  return (
    <div className="flex w-full items-center justify-center">
      <div className="grid w-full max-w-full grid-cols-1 gap-x-5 gap-y-10 lg:grid-cols-2 lg:gap-y-0">
        {/* Left: Image Skeleton */}
        <div className="flex w-full items-start gap-x-5">
          {/* Thumbnails */}
          <div className="hidden flex-col items-center gap-4 lg:flex">
            {[...Array(2)].map((_, i) => (
              <SkeletonPageBlock key={i} className="relative h-28 w-18" />
            ))}
            <SkeletonPageBlock className="relative h-7 w-18" />
          </div>

          {/* Main Image */}
          <div className="relative aspect-2/3 w-full overflow-hidden rounded">
            <SkeletonPageBlock className="absolute top-0 left-0 h-full w-full" />
          </div>
        </div>

        {/* Right: Details Skeleton */}
        <div className="flex w-full flex-col gap-8 lg:ml-3">
          {/* Badges & Actions */}
          <div className="flex items-center gap-5">
            <SkeletonPageBlock className="h-10 basis-1/2" />
            <SkeletonPageBlock className="h-10 basis-1/2" />
          </div>

          {/* Price, Discount, Stock */}
          <div className="flex flex-row gap-5 md:flex-col lg:flex-row">
            <SkeletonPageBlock className="h-18 basis-1/3 rounded md:w-full lg:basis-1/3" />
            <SkeletonPageBlock className="h-18 basis-2/3 rounded md:w-full lg:basis-2/3" />
            <SkeletonPageBlock className="h-18 basis-1/3 rounded md:w-full lg:basis-1/3" />
          </div>

          {/* Product Description Blocks */}
          <div className="flex flex-col gap-5">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="box-style flex flex-col gap-2 rounded border bg-gray-100 px-3 py-3 dark:bg-zinc-800/40"
              >
                <SkeletonPageBlock className="mb-2 h-5 w-30" />
                <SkeletonPageBlock className="h-4 w-full" />
                <SkeletonPageBlock className="h-4 w-[85%]" />
                <SkeletonPageBlock className="h-4 w-[70%]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProductPageSkeleton() {
  return (
    <>
      <PageTitleSkeleton breadcumbs />
      <ProductDataSkeleton />
    </>
  );
}

function FooterSkeleton({ colSpan }: { colSpan: number }) {
  return (
    <tfoot
      className={`${shimmer} relative cursor-not-allowed overflow-hidden dark:animate-pulse`}
    >
      <tr>
        <td colSpan={colSpan} className="p-4">
          <div className="flex w-full items-center justify-between">
            <div className="h-5 w-38 rounded bg-gray-200 dark:bg-zinc-700" />
            <div className="flex items-center gap-3">
              <div className="h-10 w-28 rounded bg-gray-200 dark:bg-zinc-700" />
              <div className="h-10 w-28 rounded bg-gray-200 dark:bg-zinc-700" />
            </div>
          </div>
        </td>
      </tr>
    </tfoot>
  );
}

// -------------------------------------------------------------
// ORDER
function OrderSkeleton({ value }: { value: number }) {
  return (
    <tr
      key={value}
      className="animate-none hover:bg-gray-50/60 dark:animate-pulse dark:hover:bg-zinc-800/25"
    >
      {/* Order ID */}
      <td className="px-4 py-3 whitespace-nowrap">
        <div className="h-6 w-6 rounded bg-gray-200 dark:bg-zinc-700"></div>
      </td>

      {/* Customer Name */}
      <td className="px-4 py-3 whitespace-nowrap">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-zinc-700"></div>
          <div className="space-y-1 truncate">
            <div className="h-4 w-28 rounded bg-gray-200 dark:bg-zinc-700"></div>
            <div className="h-4 w-52 rounded bg-gray-200 dark:bg-zinc-700"></div>
          </div>
        </div>
      </td>

      {/* Order Date */}
      <td className="px-4 py-3 whitespace-nowrap">
        <div className="h-5 w-22 rounded bg-gray-200 dark:bg-zinc-700"></div>
      </td>

      {/* Status */}
      <td className="px-4 py-3 text-center whitespace-nowrap">
        <div
          className={`${value % 2 === 0 ? "w-18" : "w-26"} mx-auto h-4 rounded bg-gray-200 dark:bg-zinc-700`}
        ></div>
      </td>

      {/* Total */}
      <td className="px-4 py-3 whitespace-nowrap">
        <div className="h-5 w-14 rounded bg-gray-200 dark:bg-zinc-700"></div>
      </td>

      {/* Dropdown menu */}
      <td className="px-4 py-3 text-center whitespace-nowrap">
        <div className="mx-auto h-7 w-8 rounded bg-gray-200 dark:bg-zinc-700"></div>
      </td>
    </tr>
  );
}

export function OrdersListBodySkeleton() {
  return (
    <tbody
      className={`${shimmer} relative cursor-not-allowed divide-y divide-gray-200/80 overflow-hidden text-sm text-gray-800/70 dark:divide-zinc-700/20 dark:text-gray-50/80`}
    >
      {Array.from({ length: ORDERS_LIMIT }, (_, i) => (
        <OrderSkeleton key={i} value={i + 1} />
      ))}
    </tbody>
  );
}

export function OrdersListSkeleton() {
  return (
    <>
      <OrdersListBodySkeleton />
      <FooterSkeleton colSpan={7} />
    </>
  );
}

export function OrderPageSkeleton() {
  return (
    <>
      <PageTitleSkeleton breadcumbs />
      <OrderDetailsSkeleton />
    </>
  );
}

function SkeletonBlock({ className = "" }: { className?: string }) {
  return (
    <span
      className={`${shimmer} relative h-4 overflow-hidden rounded bg-gray-200 dark:bg-zinc-700 ${className} animate-none dark:animate-pulse`}
    />
  );
}

export function OrderDetailsSkeleton() {
  return (
    <div className="flex w-full cursor-not-allowed flex-col gap-8">
      {/* Order Info */}
      <div
        className={`${shimmer} bg-box box-style relative flex w-full flex-col gap-1 overflow-hidden rounded-xl border border-gray-200 lg:max-w-2xl dark:border-zinc-800`}
      >
        <div className="box-style flex justify-between border-b p-3">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Dati ordine
          </h2>
          {/* Status Tag */}
          <div
            className={`${shimmer} relative h-6 w-24 animate-none overflow-hidden rounded-md bg-gray-200 dark:animate-pulse dark:bg-zinc-700`}
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 p-3 sm:flex-row sm:gap-8">
          {[...Array(2)].map((_, idx) => (
            <div
              key={idx}
              className={`${shimmer} box-style relative inline-flex w-fit items-center gap-2 overflow-hidden rounded border bg-gray-50 px-2 py-1 dark:bg-zinc-800/40`}
            >
              <div className="h-5 w-5 animate-none rounded-full bg-gray-200 dark:animate-pulse dark:bg-zinc-600" />
              <SkeletonBlock className="h-4 w-24" />
              <SkeletonBlock className="h-8 w-25" />
            </div>
          ))}

          {/* Action Button */}
          <div
            className={`${shimmer} rounded- relative h-8 w-24 animate-none overflow-hidden bg-gray-200 sm:w-18 dark:animate-pulse dark:bg-zinc-700`}
          />
        </div>
      </div>

      {/* Customer Info */}
      <div
        className={`${shimmer} bg-box box-style relative flex w-full flex-col gap-1 overflow-hidden rounded-xl border lg:max-w-2xl`}
      >
        <h2 className="box-style mb-3 border-b p-3 text-lg font-semibold text-gray-900 dark:text-gray-100">
          Dati cliente
        </h2>
        <div className="flex flex-wrap gap-2 p-3 text-sm">
          <div className="box-style bg-style inline-flex items-center gap-2 border p-1">
            <div
              className={`h-8 w-8 animate-none rounded-full bg-gray-200 dark:animate-pulse dark:bg-zinc-700`}
            />
            <SkeletonBlock className="h-4 w-40" />
          </div>
          <div className="box-style bg-style inline-flex items-center gap-2 border p-1">
            <div
              className={`h-5 w-5 animate-none rounded-full bg-gray-200 dark:animate-pulse dark:bg-zinc-700`}
            />
            <SkeletonBlock className="h-4 w-40" />
          </div>
        </div>
      </div>

      {/* Product Table */}
      <div className="flex w-full flex-col">
        <h2 className="box-style bg-box rounded-t-xl border p-3 text-lg font-semibold">
          Prodotti venduti
        </h2>
        <div className="overflow-x-auto rounded-b-md border border-gray-100 dark:border-zinc-800">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-xs uppercase sm:text-sm dark:bg-zinc-800">
                {["Nome", "Prezzo unitario", "Quantità", "Totale riga"].map(
                  (heading) => (
                    <th
                      key={heading}
                      className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-200"
                    >
                      {heading}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
              {[...Array(3)].map((_, idx) => (
                <tr key={idx} className={`bg-white dark:bg-zinc-900`}>
                  <td className="px-4 py-3">
                    <SkeletonBlock className="h-4 w-20" />
                  </td>
                  <td className="px-4 py-3">
                    <SkeletonBlock className="h-4 w-1/2" />
                  </td>
                  <td className="px-4 py-3">
                    <SkeletonBlock className="h-4 w-1/3" />
                  </td>
                  <td className="px-4 py-3">
                    <SkeletonBlock className="h-4 w-2/3" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// FORMS
function FormRow({
  width = "100%",
  height = "1rem",
  className = "",
}: {
  width?: string;
  height?: string;
  className?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="h-4 w-20 animate-pulse rounded-md bg-gray-200 dark:bg-zinc-700"></div>
      <div
        className={`animate-pulse rounded-md bg-gray-200 dark:bg-zinc-700 ${className}`}
        style={{ width, height }}
      />
    </div>
  );
}

function FormButtons() {
  return (
    <div className="mt-8 flex justify-end gap-2">
      <div className="h-9 w-32 rounded-md bg-gray-300 dark:bg-zinc-700" />
      <div className="h-9 w-40 rounded-md bg-gray-300 dark:bg-zinc-700" />
    </div>
  );
}

function PageTitleSkeleton({ breadcumbs }: { breadcumbs?: boolean }) {
  return (
    <div
      className={`${shimmer} relative h-6.5 overflow-hidden md:h-7 ${breadcumbs ? "mb-6 w-80 md:w-60" : "w-48"} animate-none rounded-md bg-gray-200 dark:animate-pulse dark:bg-zinc-700`}
    />
  );
}

export function UpdateProductFormSkeleton({ title = true }) {
  return (
    <>
      {title && <PageTitleSkeleton breadcumbs />}
      <form
        aria-labelledby="title"
        className={`${shimmer} dark:text-light relative h-full space-y-5 overflow-hidden rounded bg-gray-50 px-3 py-5 sm:px-6 dark:bg-zinc-800/60`}
      >
        {/* Heading (hidden for accessibility) */}
        <h2 id="title" className="sr-only">
          Caricamento Modulo Prodotto...
        </h2>

        {/* Form Rows (Inputs) */}
        <div className="space-y-5">
          <FormRow height="2rem" /> {/* Nome */}
          <FormRow height="2rem" /> {/* Prezzo */}
          <FormRow height="2rem" /> {/* Sconto */}
          <FormRow height="2rem" /> {/* Quantità */}
          <FormRow height="2rem" /> {/* Select - Tipo */}
          <FormRow height="6rem" /> {/* Descrizione */}
          <FormRow height="6rem" /> {/* Ingredienti */}
          <FormRow height="6rem" /> {/* Info nutrizionali */}
          <FormRow height="6rem" /> {/* Dettagli */}
        </div>

        {/* Buttons */}
        <FormButtons />
      </form>
    </>
  );
}

export function AccountInfoFormSkeleton() {
  return (
    <div
      className={`${shimmer} bg-box box-style dark:text-light relative flex flex-col gap-3 overflow-hidden rounded border text-neutral-700`}
    >
      <h5 className="box-style border-b p-3 text-xl font-semibold">
        Modifica le tue informazioni
      </h5>
      <form className="flex animate-pulse flex-col gap-5 p-3 md:gap-3">
        <div className="space-y-5">
          <FormRow height="2rem" />
          <FormRow height="2rem" />
        </div>

        {/* File input skeleton */}
        <div className="mt-3 flex flex-col justify-baseline gap-3 md:flex-row">
          <div className="h-4 w-56 rounded bg-gray-200 dark:bg-zinc-700" />
          <div className="flex items-center gap-2">
            <div className="h-10 w-28 rounded bg-gray-200 dark:bg-zinc-700" />
            <div className="h-4 w-24 rounded-md bg-gray-200 dark:bg-zinc-700" />
          </div>
        </div>

        {/* Buttons */}
        <FormButtons />
      </form>
    </div>
  );
}

export function AccountPasswordFormSkeleton() {
  return (
    <div
      className={`${shimmer} relative -mt-3 flex h-full flex-col gap-8 overflow-hidden bg-gray-50 p-3 dark:bg-zinc-800/60`}
    >
      <form className="flex animate-pulse flex-col gap-5 md:gap-3">
        <div className="space-y-5">
          <FormRow height="2rem" />
          <FormRow height="2rem" />
        </div>

        {/* Buttons */}
        <FormButtons />
      </form>
    </div>
  );
}

// -------------------------------------------------------------
// DASHBOARD
export function StatsSkeleton() {
  return (
    <div className="col-span-full">
      <div className="dark:text-light grid grid-cols-1 gap-x-10 gap-y-4 text-neutral-700 sm:grid-cols-2 lg:grid-cols-4">
        <StatSkeleton label="Ordini totali" />
        <StatSkeleton label="Ricavi totali" />
        <StatSkeleton label="Clienti totali" />
        <StatSkeleton label="Miglior cliente" />
      </div>
    </div>
  );
}

export function StatSkeleton({
  position,
  label,
}: {
  position?: string;
  label: string;
}) {
  return (
    <div
      className={`dark:text-light relative flex animate-pulse cursor-not-allowed flex-col gap-2 border-t border-gray-200 py-4 text-neutral-700 dark:border-zinc-700/40 ${position}`}
    >
      <h5 className="mb-2 self-baseline text-base font-semibold tracking-wide uppercase sm:text-sm md:text-xs">
        {label}
      </h5>
      <SkeletonBlock className="h-12 w-20 sm:h-11 md:h-10" />
      <div className="flex items-center gap-1">
        <SkeletonBlock className="h-6 w-10 sm:h-5 md:h-4" />
        <SkeletonBlock className="h-6 w-20 sm:h-5 md:h-4" />
      </div>
    </div>
  );
}

export function OrdersActivitySkeleton() {
  return (
    <div
      className={`relative col-span-full flex cursor-not-allowed flex-col overflow-hidden rounded-md border border-gray-200 bg-gray-50/65 [--box-padding:--spacing(4)] lg:col-span-1 lg:overflow-clip dark:border-zinc-700/40 dark:bg-zinc-800/40 ${shimmer}`}
    >
      <div className="space-y-1 border-b border-gray-200 p-(--box-padding) dark:border-zinc-700/40">
        <h2 className="dark:text-light rounded text-xl font-semibold text-neutral-700">
          Attività ordini
        </h2>
        <p className="text-neutral-500 dark:text-neutral-400">
          Gestisci gli ordini in attesa di conferma e preparali per la consegna.
        </p>
      </div>

      <OrdersActivityBodySkeleton />
    </div>
  );
}

export function OrdersActivityBodySkeleton() {
  return (
    <div
      className={`h-105 grow animate-none cursor-not-allowed bg-gray-50/65 p-(--box-padding) lg:h-100 dark:animate-pulse dark:bg-zinc-800/40`}
    >
      <div className="flex items-center justify-between pb-(--box-padding)">
        <div className="h-10 w-2/3 rounded-md bg-gray-200 lg:h-8 dark:bg-zinc-700" />
        <div className="h-10 w-18 rounded-md bg-gray-200 lg:h-8 lg:w-18 dark:bg-zinc-700"></div>
      </div>

      <ul className={`flex h-76 flex-col rounded`}>
        {[...Array(5)].map((_, i) => (
          <li
            key={i}
            className="grid grid-cols-[14rem_7.5rem_6rem_auto] items-center justify-between gap-4 px-0.5 py-3"
          >
            {/* Name + Email */}
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-zinc-700" />
              <div className="space-y-1">
                <div className="h-4.5 w-28 rounded bg-gray-200 dark:bg-zinc-700" />
                <div className="h-3 w-40 rounded bg-gray-200 dark:bg-zinc-700" />
              </div>
            </div>
            {/* Total Cost */}
            <div className="mx-auto h-5 w-14 rounded bg-gray-200 dark:bg-zinc-700" />
            {/* Status Tag */}
            <div className="mx-auto h-5 w-20 rounded bg-gray-200 dark:bg-zinc-700" />
            {/* Action Button */}
            <div className="h-6 w-8 rounded bg-gray-200 dark:bg-zinc-700" />
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between">
        <div className="h-5 w-30 rounded bg-gray-200 lg:h-4 dark:bg-zinc-700" />
        <div className="flex space-x-3 lg:space-x-2">
          <div className="h-8 w-14 rounded bg-gray-200 lg:h-6 lg:w-12 dark:bg-zinc-700" />
          <div className="h-8 w-14 rounded bg-gray-200 lg:h-6 lg:w-12 dark:bg-zinc-700" />
        </div>
      </div>
    </div>
  );
}

export function BestSellersSkeleton() {
  return (
    <div
      className={`${shimmer} relative col-span-full row-span-1 row-start-2 flex cursor-not-allowed flex-col overflow-hidden rounded-md border border-gray-200 bg-gray-50/65 [--box-padding:--spacing(4)] lg:col-start-2 dark:border-zinc-700/40 dark:bg-zinc-800/40`}
    >
      <div className="space-y-1 border-b border-gray-200 p-(--box-padding) dark:border-zinc-700/40">
        <h2 className="dark:text-light rounded text-xl font-semibold text-neutral-700">
          Prodotti più venduti
        </h2>
        <p className="text-neutral-500 dark:text-neutral-400">
          Visualizza i prodotti che hanno riscosso più successo tra i nostri
          clienti.
        </p>
      </div>

      <BestSellersChartSkeleton />
    </div>
  );
}

export function BestSellersChartSkeleton() {
  return (
    <div
      className={`flex h-full w-full animate-none cursor-not-allowed flex-col items-center justify-center gap-6 p-(--box-padding) dark:animate-pulse`}
    >
      <div className="pieChart:h-55 pieChart:w-55 _dark:border-zinc-600 relative mb-2 h-30 w-30 rounded-full border border-gray-300 bg-gray-200 sm:h-40 sm:w-40 md:h-60 md:w-60 lg:h-40 lg:w-40 dark:border-none dark:bg-zinc-700">
        <div className="absolute inset-8 rounded-full border border-gray-300 bg-gray-100 sm:inset-10 dark:border-none dark:bg-zinc-900/90" />
      </div>

      <ul className="flex flex-wrap justify-center gap-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <li
            key={index}
            className="flex items-center gap-1 rounded-md border border-gray-200 bg-white p-1 dark:border-zinc-700 dark:bg-zinc-900/60"
          >
            <span className="inline-block h-4 w-4 rounded bg-gray-200 dark:bg-zinc-700" />
            <span className="inline-block h-4 w-17 rounded bg-gray-200 dark:bg-zinc-700"></span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function AreaChartSkeleton() {
  return (
    <div className="px-4">
      <div
        className={`${shimmer} relative h-[15.625rem] w-full animate-none overflow-hidden rounded-md bg-gray-50/65 dark:animate-pulse dark:bg-zinc-800/40`}
      />
    </div>
  );
}

export function ChartsSkeleton() {
  return (
    <div
      className={`${shimmer} relative col-span-full cursor-not-allowed overflow-hidden rounded-md border border-gray-200 bg-gray-50/30 dark:border-zinc-700/40 dark:bg-zinc-800/40`}
    >
      <div className="flex flex-col border-b border-gray-200 sm:flex-row dark:border-zinc-700/40">
        <div className="basis-2/3 border-gray-200 p-5 sm:border-r dark:border-zinc-700/40">
          <div className="relative h-full overflow-hidden">
            <div className="space-y-1">
              <p className="text-sm font-semibold text-neutral-700 md:text-base dark:text-white">
                Area Chart - Andamento dei ricavi
              </p>
              <p className="text-xs text-neutral-500 md:text-sm dark:text-neutral-400">
                Mostra i ricavi complessivi dalla vendita dei prodotti
                dell&apos;e-commerce negli ultimi 12 mesi, evidenziando i
                periodi di crescita e calo.
              </p>
            </div>
          </div>
        </div>

        <div className="flex basis-1/3 divide-x divide-gray-200 border-t border-t-gray-200 text-xl sm:border-none dark:divide-zinc-700/40 dark:border-t-zinc-700/40">
          <div className="relative z-10 grid h-full w-1/2 place-content-center bg-gray-300/10 text-base font-semibold text-neutral-700 sm:py-0 md:text-lg lg:text-xl dark:bg-zinc-900/50 dark:text-white">
            Ricavi
          </div>
          <div className="relative z-10 grid h-full w-1/2 place-content-center text-base font-semibold text-neutral-700 sm:py-0 md:text-lg lg:text-xl dark:text-white">
            Ordini
          </div>
        </div>
      </div>

      <RevenueChartSkeleton />
    </div>
  );
}

export function OrdersAreaChartSkeleton() {
  return (
    <div className="flex h-75 w-full animate-pulse items-center justify-between gap-1.5 p-5">
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((_, i) => (
        <div key={i} className="flex w-1/12 gap-1">
          <div className="mt-auto h-30 w-1/2 rounded bg-gray-200 dark:bg-zinc-700" />
          <div className="mt-auto h-50 w-1/2 rounded bg-gray-300/80 dark:bg-zinc-700/70" />
        </div>
      ))}
    </div>
  );
}

export function RevenueChartSkeleton() {
  return (
    <div className="relative h-75 w-full animate-pulse overflow-hidden rounded-md">
      <div
        className="absolute inset-6 bg-gray-200 bg-gradient-to-t to-transparent p-5 dark:bg-zinc-700"
        style={{
          clipPath: `path("M0,100 C100,250 350,100  600,200 C850,300 1100,100 1400,250 L1400,400 L0,500 Z")`,
        }}
      ></div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="_dark:bg-zinc-800/40 _bg-gray-50 _px-6 w-fit rounded py-2 text-2xl">
          Dashboard
        </h1>
      </div>

      <div className="grid grid-cols-1 grid-rows-[auto_22rem_auto_1fr] gap-x-8 gap-y-12 md:grid-cols-[1fr_1fr] md:grid-rows-[auto_28rem_auto_1fr] lg:grid-cols-[1fr_1fr] lg:grid-rows-[auto_auto_1fr]">
        <StatsSkeleton />
        <BestSellersSkeleton />
        <OrdersActivitySkeleton />
        <AreaChartSkeleton />
        <AreaChartSkeleton />
      </div>
    </div>
  );
}
