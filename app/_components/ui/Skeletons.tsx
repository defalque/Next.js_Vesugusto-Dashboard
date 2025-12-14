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
        <div className="h-9.5 w-9.5 rounded-full bg-gray-200 md:h-10 md:w-10 dark:animate-pulse dark:bg-zinc-700" />
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

export function ProductStatsSkeleton() {
  return (
    <div className="dark:text-light grid grid-cols-2 justify-between gap-10 text-neutral-700 md:grid-cols-3 2xl:grid-cols-6">
      <div
        className={`dark:text-light relative flex animate-pulse cursor-not-allowed flex-col gap-2 border-t border-gray-200 py-4 text-neutral-700 dark:border-zinc-700/40`}
      >
        <h5 className="mb-2 self-baseline text-base font-semibold tracking-wide uppercase sm:text-sm md:text-xs">
          Prezzo
        </h5>
        <SkeletonBlock className="h-10 w-20 sm:h-9.5 md:h-8" />
      </div>
      <div
        className={`dark:text-light relative flex animate-pulse cursor-not-allowed flex-col gap-2 border-t border-gray-200 py-4 text-neutral-700 dark:border-zinc-700/40`}
      >
        <h5 className="mb-2 self-baseline text-base font-semibold tracking-wide uppercase sm:text-sm md:text-xs">
          Stock
        </h5>
        <SkeletonBlock className="h-10 w-20 sm:h-9.5 md:h-8" />
      </div>
      <div
        className={`dark:text-light relative flex animate-pulse cursor-not-allowed flex-col gap-2 border-t border-gray-200 py-4 text-neutral-700 dark:border-zinc-700/40`}
      >
        <h5 className="mb-2 self-baseline text-base font-semibold tracking-wide uppercase sm:text-sm md:text-xs">
          Quantità vendute
        </h5>
        <SkeletonBlock className="h-10 w-20 sm:h-9.5 md:h-8" />
      </div>
      <StatSkeleton label="Ricavi generati" />
      <StatSkeleton label="Frequenza ordini" />
      <StatSkeleton label="Wishlist utenti" />
    </div>
  );
}

export function ProductDataSkeleton() {
  return (
    <div className="flex flex-col gap-8 sm:gap-5">
      {/* Product header */}
      <div className="flex flex-1 animate-pulse cursor-not-allowed flex-wrap items-center justify-between gap-x-4 gap-y-4">
        <div className="flex items-center gap-2">
          <SkeletonPageBlock className="h-8 w-30" />
          <SkeletonPageBlock className="h-6 w-24 rounded-lg" />
        </div>
        <div className="flex gap-3">
          <SkeletonPageBlock className="h-10.5 w-20 rounded-lg" />
          <SkeletonPageBlock className="h-10.5 w-20 rounded-lg" />
        </div>
      </div>

      {/* Stats */}
      <ProductStatsSkeleton />

      {/* Product details */}
      <div className="dark:text-light mt-8 flex basis-1/2 animate-pulse cursor-not-allowed flex-col gap-5 text-neutral-700 lg:mt-5 lg:gap-3.5">
        <div className="flex w-full flex-col overflow-hidden border-t border-gray-200 pt-5 lg:pt-3.5 dark:border-zinc-700/40">
          <div className="group flex items-center border-gray-200 text-left text-lg font-medium lg:text-base">
            Descrizione
          </div>
          <div className="space-y-1.5 border-gray-200 pt-4 lg:pt-2 dark:border-zinc-700/40">
            <SkeletonPageBlock className="h-5 w-full xl:h-4.5" />
            <SkeletonPageBlock className="block h-5 w-full sm:w-1/4 lg:hidden" />
            <SkeletonPageBlock className="block h-5 w-1/5 sm:hidden" />
          </div>
        </div>
        <div className="flex w-full flex-col overflow-hidden border-t border-gray-200 pt-5 lg:pt-3.5 dark:border-zinc-700/40">
          <div className="group flex items-center border-gray-200 text-left text-lg font-medium lg:text-base">
            Dettagli
          </div>
          <div className="border-gray-200 pt-4 lg:pt-2 dark:border-zinc-700/40">
            <SkeletonPageBlock className="h-5 w-full sm:w-[75%] lg:w-1/2 xl:h-4.5" />
          </div>
        </div>
        <div className="flex w-full flex-col overflow-hidden border-t border-gray-200 pt-5 lg:pt-3.5 dark:border-zinc-700/40">
          <div className="group flex items-center border-gray-200 text-left text-lg font-medium lg:text-base">
            Ingredienti
          </div>
          <div className="space-y-1.5 border-gray-200 pt-4 lg:pt-2 dark:border-zinc-700/40">
            <SkeletonPageBlock className="h-5 w-full xl:h-4.5" />
            <SkeletonPageBlock className="block h-5 w-full sm:w-[75%] md:w-1/3 lg:hidden" />
            <SkeletonPageBlock className="block h-5 w-1/2 sm:hidden" />
          </div>
        </div>
        <div className="flex w-full flex-col overflow-hidden border-t border-gray-200 pt-5 lg:pt-3.5 dark:border-zinc-700/40">
          <div className="group flex items-center border-gray-200 text-left text-lg font-medium lg:text-base">
            Informazioni nutrizionali
          </div>
          <div className="space-y-1.5 border-gray-200 pt-4 lg:pt-2 dark:border-zinc-700/40">
            <SkeletonPageBlock className="h-5 w-full xl:h-4.5" />
            <SkeletonPageBlock className="h-5 w-full md:w-1/2 xl:h-4.5" />
            <SkeletonPageBlock className="h-5 w-full sm:w-1/3 md:hidden" />
            <SkeletonPageBlock className="h-5 w-1/3 sm:hidden" />
          </div>
        </div>
      </div>

      {/* Product images */}
      <div className="mt-8 flex animate-pulse cursor-not-allowed flex-col gap-5 lg:mt-5">
        <h5 className="dark:text-light/80 border-gray-200 pt-2 text-lg font-semibold text-neutral-700 dark:border-zinc-700/40">
          Gestione immagini
        </h5>

        <div className="flex animate-pulse cursor-not-allowed flex-col gap-4">
          {/* <div
            className={`flex min-h-40 min-w-full justify-center rounded-lg border border-dashed border-neutral-500 bg-neutral-50/50 p-5 sm:w-sm dark:border-zinc-500 dark:bg-zinc-950/20`}
          >
            <div className="text-center">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                data-slot="icon"
                aria-hidden="true"
                className="mx-auto size-12 text-neutral-700/40 dark:text-zinc-500/60"
              >
                <path
                  d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                />
              </svg>
              <div className="mt-4 flex flex-wrap justify-center text-center text-[15px] text-neutral-700/60 sm:text-sm/6 dark:text-zinc-500/80">
                <div
                  className={`touch-hitbox dark:focus-within:outline-zinc-400} relative rounded-md bg-transparent font-semibold text-neutral-600 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-neutral-600 dark:text-zinc-400`}
                >
                  <span>Carica una o più immagini</span>
                </div>
                <p className="pl-1 pointer-coarse:hidden pointer-fine:block">
                  o trascinale e rilasciale
                </p>
              </div>
              <p className="mt-1 text-sm text-neutral-700/60 sm:mt-0 sm:text-xs/5 dark:text-zinc-500/80">
                PNG, JPG, GIF fino a 1MB
              </p>
            </div>
          </div> */}

          <ul className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
            {[...Array(3)].map((_, index) => (
              <li key={index} className="relative">
                <div className="relative aspect-2/3 w-full overflow-hidden rounded-2xl bg-gray-200 dark:bg-zinc-700"></div>
              </li>
            ))}
            <li key="image-loader" className="relative">
              <div className="relative flex aspect-2/3 w-full items-center justify-center overflow-hidden rounded-2xl border border-dashed border-neutral-400 bg-neutral-50/50 p-5 dark:border-zinc-500 dark:bg-zinc-950/20">
                <div className="my-auto text-center">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    data-slot="icon"
                    aria-hidden="true"
                    className="mx-auto size-12 text-neutral-700/40 dark:text-zinc-500/60"
                  >
                    <path
                      d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                      clipRule="evenodd"
                      fillRule="evenodd"
                    />
                  </svg>
                  <div className="mt-4 flex flex-wrap justify-center text-center text-[15px] text-neutral-700/60 sm:text-sm/6 dark:text-zinc-500/80">
                    <div
                      className={`touch-hitbox relative rounded-md bg-transparent text-[0.7rem] font-semibold text-neutral-500 sm:text-xs dark:text-zinc-400`}
                    >
                      <span className="underline">
                        Carica una o più immagini
                      </span>
                    </div>
                    <p className="pl-1 text-[0.7rem] sm:text-xs pointer-coarse:hidden pointer-fine:block">
                      o trascinale e rilasciale
                    </p>
                  </div>
                  <p className="mt-1 text-[0.7rem] text-neutral-700/60 sm:text-xs/5 dark:text-zinc-500/80">
                    PNG, JPG, GIF fino a 1MB
                  </p>
                </div>
              </div>
            </li>
          </ul>
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
    <div className="dark:text-light flex w-full animate-pulse cursor-not-allowed flex-col gap-12 text-neutral-700">
      <div className="flex w-full flex-col gap-5">
        <div className="flex items-center gap-5">
          <SkeletonBlock className="h-8 w-30 sm:h-8.5 md:h-7 lg:h-7" />
          <SkeletonBlock className="h-7 w-24 rounded-lg md:h-6" />
        </div>

        <div className="flex flex-wrap justify-between gap-x-10 gap-y-5">
          <div className="flex flex-wrap items-center gap-x-10 gap-y-5 text-base md:text-sm">
            <div className="flex items-center gap-2">
              <SkeletonBlock className="h-6 w-6 rounded-lg md:h-5 md:w-5" />
              <SkeletonBlock className="h-6 w-20 md:h-5" />
            </div>
            <div className="flex items-center gap-2">
              <SkeletonBlock className="h-6 w-6 rounded-lg md:h-5 md:w-5" />
              <SkeletonBlock className="h-6 w-50 md:h-5" />
            </div>
            <div className="inline-flex w-fit items-center gap-2">
              <SkeletonBlock className="h-6 w-6 rounded-lg md:h-5 md:w-5" />
              <SkeletonBlock className="h-6 w-20 md:h-5" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <SkeletonPageBlock className="h-11.5 w-25 rounded-lg md:h-10.5" />
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col gap-1 text-base md:text-sm">
        <h3 className="box-style border-b pb-2 text-lg font-semibold md:text-base">
          Dati cliente
        </h3>

        <div className="box-style flex flex-col gap-1">
          <div className="grid grid-cols-1 gap-y-1.5 border-b border-b-gray-200 py-3 sm:grid-cols-[10rem_1fr] md:grid-cols-[20rem_1fr] dark:border-b-zinc-700/40">
            <div className="dark:text-light/60 text-neutral-500">Cliente</div>
            <div>
              <div className="flex items-center gap-2">
                <SkeletonBlock className="h-8 w-8 rounded-full md:h-7 md:w-7" />
                <SkeletonBlock className="h-5 w-20 md:h-4" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-y-1 py-4 sm:grid-cols-[10rem_1fr] md:grid-cols-[20rem_1fr]">
            <div className="dark:text-light/60 text-neutral-500">Email</div>
            <div className="flex items-center gap-2">
              <SkeletonBlock className="h-5 w-45 md:h-4" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col">
        <h3 className="pb-2 text-lg font-semibold md:text-base">
          Prodotti venduti
        </h3>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-b-gray-200 text-sm dark:border-b-zinc-700/40">
                <th className="py-2 text-left font-normal tracking-wide text-neutral-500 dark:text-neutral-400">
                  Nome
                </th>
                <th className="py-2 text-left font-normal tracking-wide text-neutral-500 dark:text-neutral-400">
                  Prezzo unitario
                </th>
                <th className="py-2 text-left font-normal tracking-wide text-neutral-500 dark:text-neutral-400">
                  Quantità
                </th>
                <th className="py-3 text-left font-normal tracking-wide text-neutral-500 dark:text-neutral-400">
                  Totale riga
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-zinc-700/40">
              {[0, 1].map((item, idx) => (
                <tr key={idx}>
                  <td className="py-3">
                    <div
                      className={`${shimmer} relative h-4 w-20 animate-none overflow-hidden rounded bg-gray-200 dark:animate-pulse dark:bg-zinc-700`}
                    ></div>
                  </td>
                  <td className="py-3">
                    <div
                      className={`${shimmer} relative h-4 w-1/2 animate-none overflow-hidden rounded bg-gray-200 dark:animate-pulse dark:bg-zinc-700`}
                    ></div>
                  </td>
                  <td className="py-3">
                    <div
                      className={`${shimmer} relative h-4 w-1/3 animate-none overflow-hidden rounded bg-gray-200 dark:animate-pulse dark:bg-zinc-700`}
                    ></div>
                  </td>
                  <td className="py-3">
                    <div
                      className={`${shimmer} relative h-4 w-2/3 animate-none overflow-hidden rounded bg-gray-200 dark:animate-pulse dark:bg-zinc-700`}
                    ></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    // <div className="flex w-full cursor-not-allowed flex-col gap-8">
    //   {/* Order Info */}
    //   <div
    //     className={`${shimmer} bg-box box-style relative flex w-full flex-col gap-1 overflow-hidden rounded-xl border border-gray-200 lg:max-w-2xl dark:border-zinc-800`}
    //   >
    //     <div className="box-style flex justify-between border-b p-3">
    //       <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
    //         Dati ordine
    //       </h2>
    //       {/* Status Tag */}
    //       <div
    //         className={`${shimmer} relative h-6 w-24 animate-none overflow-hidden rounded-md bg-gray-200 dark:animate-pulse dark:bg-zinc-700`}
    //       />
    //     </div>

    //     <div className="flex flex-wrap items-center justify-between gap-3 p-3 sm:flex-row sm:gap-8">
    //       {[...Array(2)].map((_, idx) => (
    //         <div
    //           key={idx}
    //           className={`${shimmer} box-style relative inline-flex w-fit items-center gap-2 overflow-hidden rounded border bg-gray-50 px-2 py-1 dark:bg-zinc-800/40`}
    //         >
    //           <div className="h-5 w-5 animate-none rounded-full bg-gray-200 dark:animate-pulse dark:bg-zinc-600" />
    //           <SkeletonBlock className="h-4 w-24" />
    //           <SkeletonBlock className="h-8 w-25" />
    //         </div>
    //       ))}

    //       {/* Action Button */}
    //       <div
    //         className={`${shimmer} rounded- relative h-8 w-24 animate-none overflow-hidden bg-gray-200 sm:w-18 dark:animate-pulse dark:bg-zinc-700`}
    //       />
    //     </div>
    //   </div>

    //   {/* Customer Info */}
    //   <div
    //     className={`${shimmer} bg-box box-style relative flex w-full flex-col gap-1 overflow-hidden rounded-xl border lg:max-w-2xl`}
    //   >
    //     <h2 className="box-style mb-3 border-b p-3 text-lg font-semibold text-gray-900 dark:text-gray-100">
    //       Dati cliente
    //     </h2>
    //     <div className="flex flex-wrap gap-2 p-3 text-sm">
    //       <div className="box-style bg-style inline-flex items-center gap-2 border p-1">
    //         <div
    //           className={`h-8 w-8 animate-none rounded-full bg-gray-200 dark:animate-pulse dark:bg-zinc-700`}
    //         />
    //         <SkeletonBlock className="h-4 w-40" />
    //       </div>
    //       <div className="box-style bg-style inline-flex items-center gap-2 border p-1">
    //         <div
    //           className={`h-5 w-5 animate-none rounded-full bg-gray-200 dark:animate-pulse dark:bg-zinc-700`}
    //         />
    //         <SkeletonBlock className="h-4 w-40" />
    //       </div>
    //     </div>
    //   </div>

    //   {/* Product Table */}
    //   <div className="flex w-full flex-col">
    //     <h2 className="box-style bg-box rounded-t-xl border p-3 text-lg font-semibold">
    //       Prodotti venduti
    //     </h2>
    //     <div className="overflow-x-auto rounded-b-md border border-gray-100 dark:border-zinc-800">
    //       <table className="min-w-full text-sm">
    //         <thead>
    //           <tr className="bg-gray-50 text-xs uppercase sm:text-sm dark:bg-zinc-800">
    //             {["Nome", "Prezzo unitario", "Quantità", "Totale riga"].map(
    //               (heading) => (
    //                 <th
    //                   key={heading}
    //                   className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-200"
    //                 >
    //                   {heading}
    //                 </th>
    //               ),
    //             )}
    //           </tr>
    //         </thead>
    //         <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
    //           {[...Array(3)].map((_, idx) => (
    //             <tr key={idx} className={`bg-white dark:bg-zinc-900`}>
    //               <td className="px-4 py-3">
    //                 <SkeletonBlock className="h-4 w-20" />
    //               </td>
    //               <td className="px-4 py-3">
    //                 <SkeletonBlock className="h-4 w-1/2" />
    //               </td>
    //               <td className="px-4 py-3">
    //                 <SkeletonBlock className="h-4 w-1/3" />
    //               </td>
    //               <td className="px-4 py-3">
    //                 <SkeletonBlock className="h-4 w-2/3" />
    //               </td>
    //             </tr>
    //           ))}
    //         </tbody>
    //       </table>
    //     </div>
    //   </div>
    // </div>
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
      className={`${shimmer} relative ${breadcumbs ? "hidden h-6 animate-pulse cursor-not-allowed sm:block" : "block h-6.5 md:h-7"} mb-4 w-30 animate-none overflow-hidden rounded-md bg-gray-200 dark:animate-pulse dark:bg-zinc-700`}
    />
  );
}

export function UpdateProductFormSkeleton({ title = true }) {
  return (
    <>
      {title && <PageTitleSkeleton />}
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
        <div
          className={`dark:text-light relative flex animate-pulse cursor-not-allowed flex-col gap-2 border-t border-gray-200 py-4 text-neutral-700 dark:border-zinc-700/40`}
        >
          <h5 className="mb-2 self-baseline text-base font-semibold tracking-wide uppercase sm:text-sm md:text-xs">
            Miglior cliente
          </h5>
          <SkeletonBlock className="h-8 w-20 sm:h-6 md:h-5.5 md:w-20" />
          <SkeletonBlock className="h-4.5 w-50 sm:h-4.5 md:h-4 md:w-40" />
          <div className="flex items-center gap-1">
            <SkeletonBlock className="h-5.5 w-10 sm:h-5.5 md:h-5" />
            <SkeletonBlock className="h-5.5 w-25 sm:h-5.5 md:h-5" />
          </div>
        </div>
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
      <SkeletonBlock className="h-10 w-20 sm:h-9.5 md:h-8" />
      <div className="flex items-center gap-1">
        <SkeletonBlock className="h-5 w-10 sm:h-5.5 md:h-5.5" />
        <SkeletonBlock className="h-5 w-20 sm:h-5.5 md:h-5.5" />
      </div>
    </div>
  );
}

export function OrdersActivitySkeleton() {
  return (
    <div
      className={`_border _bg-gray-50/65 _dark:bg-zinc-800/40 relative col-span-full flex animate-pulse cursor-not-allowed flex-col overflow-hidden rounded-md border-gray-200 [--box-padding:--spacing(4)] lg:col-span-1 lg:overflow-clip dark:border-zinc-700/40 _${shimmer}`}
    >
      <div className="space-y-1 border-b border-gray-200 py-(--box-padding) dark:border-zinc-700/40">
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
      className={`_bg-gray-50/65 _dark:bg-zinc-800/40 h-117 grow animate-none cursor-not-allowed py-(--box-padding) sm:h-113 lg:h-108 dark:animate-pulse`}
    >
      <div className="flex items-center justify-between pb-(--box-padding)">
        <div className="h-10 w-2/3 rounded-md bg-gray-200 lg:h-8 dark:bg-zinc-700" />
        <div className="h-10 w-18 rounded-md bg-gray-200 lg:h-8 lg:w-18 dark:bg-zinc-700"></div>
      </div>

      <ul className={`flex h-81 flex-col rounded`}>
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
      className={`_${shimmer} _border _bg-gray-50/65 _dark:bg-zinc-800/40 relative col-span-full row-span-1 row-start-2 flex cursor-not-allowed flex-col overflow-hidden rounded-md border-gray-200 [--box-padding:--spacing(4)] lg:col-start-2 dark:border-zinc-700/40`}
    >
      <div className="space-y-1 border-b border-gray-200 py-(--box-padding) dark:border-zinc-700/40">
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
      className={`_dark:animate-pulse _animate-none flex min-h-[405px] w-full animate-pulse cursor-not-allowed flex-col items-center justify-center gap-6 py-(--box-padding)`}
    >
      <div className="relative mb-2 aspect-square h-40 w-40 rounded-full border border-gray-300 bg-gray-200 dark:border-none dark:bg-zinc-700">
        <div className="absolute inset-10 aspect-square rounded-full border border-gray-300 bg-gray-100 dark:border-none dark:bg-zinc-900/90" />
      </div>

      <ul className="flex flex-wrap justify-center gap-3">
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
        className={`${shimmer} relative h-62.5 w-full animate-none overflow-hidden rounded-md bg-gray-50/65 dark:animate-pulse dark:bg-zinc-800/40`}
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
        className="absolute inset-6 bg-gray-200 bg-linear-to-t to-transparent p-5 dark:bg-zinc-700"
        style={{
          clipPath: `path("M0,100 C100,250 350,100  600,200 C850,300 1100,100 1400,250 L1400,400 L0,500 Z")`,
        }}
      ></div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <>
      <div className="col-span-full">
        <StatsSkeleton />
      </div>
      <BestSellersSkeleton />
      <OrdersActivitySkeleton />
      <ChartsSkeleton />
    </>
  );
}
