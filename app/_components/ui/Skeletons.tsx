// Loading animation
const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full rounded before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-zinc-500/15 dark:before:via-black/30 before:to-transparent";

export function UserAvatarSkeleton() {
  return (
    <div className="flex animate-none items-center gap-3 dark:animate-pulse">
      <div
        className={`${shimmer} relative h-9 w-9 overflow-hidden rounded-full bg-gray-200 dark:bg-zinc-700`}
      />
      <div
        className={`${shimmer} relative h-6 w-24 overflow-hidden rounded-full bg-gray-200 dark:bg-zinc-700`}
      />
    </div>
  );
}

export function AuthFormSkeleton({ heading = true }) {
  return (
    <div className="w-full animate-pulse gap-3 px-5 pt-8 pb-15 sm:w-110 sm:px-10">
      {/* Heading */}
      {heading && (
        <div
          className={`relative mx-auto mb-6 h-6 w-2/3 overflow-hidden rounded bg-gray-200 dark:bg-zinc-700 ${shimmer}`}
        />
      )}

      {/* Email field */}
      <div className="mb-4 space-y-1">
        <div
          className={`relative h-4 w-1/3 overflow-hidden rounded bg-gray-200 dark:bg-zinc-700 ${shimmer}`}
        />
        <div
          className={`relative h-9 w-full overflow-hidden rounded-md bg-gray-200 dark:bg-zinc-700 ${shimmer}`}
        />
      </div>

      {/* Password field */}
      <div className="mb-4 space-y-1">
        <div className="flex justify-between">
          <div
            className={`relative h-4 w-1/3 overflow-hidden rounded bg-gray-200 dark:bg-zinc-700 ${shimmer}`}
          />
          <div
            className={`relative h-4 w-1/4 overflow-hidden rounded bg-gray-200 dark:bg-zinc-700 ${shimmer}`}
          />
        </div>
        <div
          className={`relative h-9 w-full overflow-hidden rounded-md bg-gray-200 dark:bg-zinc-700 ${shimmer}`}
        />
      </div>

      {/* Button */}
      <div
        className={`relative mt-10 h-10 w-full overflow-hidden rounded bg-gray-200 dark:bg-zinc-700 ${shimmer}`}
      />

      {/* Link */}
      <div
        className={`relative mx-auto mt-4 h-4 w-2/3 overflow-hidden rounded bg-gray-200 dark:bg-zinc-700 ${shimmer}`}
      />
    </div>
  );
}

export function WelcomeButtonSkeleton() {
  return (
    <div
      className="bg-brand-50/10 dark:bg-brand-950/20 flex animate-pulse items-center justify-center self-end rounded-lg px-4 py-2 font-bold shadow-xs transition-colors duration-300 text-shadow-white/30 text-shadow-xs focus:ring-4 focus:outline-none"
      style={{ minWidth: 110, minHeight: 45 }}
    >
      <span className="spinner-mini" />
    </div>
    // <div
    //   className="bg-brand-50/10 dark:bg-brand-950/20 flex animate-pulse items-center justify-center self-end rounded-lg px-4 py-2 font-bold shadow-xs transition-colors duration-300 text-shadow-white/30 text-shadow-xs focus:ring-4 focus:outline-none"
    //   style={{ minWidth: 110, minHeight: 45 }}
    // >
    //   <span className="border-brand-400 dark:border-brand-dark-300 inline-block h-4 w-4 animate-spin rounded-full border-2 border-t-transparent" />
    // </div>
  );
}

// -------------------------------------------------------------
// PRODUCT
function ProductSkeleton({ value }: { value: number }) {
  return (
    <tr
      key={value}
      className="animate-none hover:bg-gray-50/60 dark:animate-pulse dark:hover:bg-zinc-800/25"
    >
      {/* Product Name */}
      <td className="px-4 py-4 whitespace-nowrap">
        <div className="h-4 w-28 rounded bg-gray-200 dark:bg-zinc-700"></div>
      </td>

      {/* Regular Price */}
      <td className="px-4 py-4 whitespace-nowrap">
        <div className="h-4 w-12 rounded bg-gray-200 dark:bg-zinc-700"></div>
      </td>

      {/* Discount */}
      <td className="px-4 py-4 whitespace-nowrap">
        <div className="h-4 w-12 rounded bg-gray-200 dark:bg-zinc-700"></div>
      </td>

      {/* Type */}
      <td className="px-4 py-4 whitespace-nowrap capitalize">
        <div className="h-4 w-16 rounded bg-gray-200 dark:bg-zinc-700"></div>
      </td>

      {/* Quantity */}
      <td className="px-4 py-4 text-center whitespace-nowrap">
        <div className="mx-auto h-4 w-6 rounded bg-gray-200 dark:bg-zinc-700"></div>
      </td>

      {/* Dropdown */}
      <td className="px-4 py-4 text-center whitespace-nowrap">
        <div className="mx-auto h-7 w-7 rounded bg-gray-200 dark:bg-zinc-700"></div>
      </td>
    </tr>
  );
}

export function ProductsListSkeleton() {
  return (
    <tbody
      className={`${shimmer} relative h-full divide-y divide-zinc-700/10 overflow-hidden text-gray-800/70 dark:divide-zinc-700/40 dark:text-gray-50/80`}
    >
      <ProductSkeleton value={1} />
      <ProductSkeleton value={2} />
      <ProductSkeleton value={3} />
      <ProductSkeleton value={4} />
      <ProductSkeleton value={5} />
      <ProductSkeleton value={6} />
    </tbody>
  );
}

function SkeletonPageBlock({ className }: { className: string }) {
  return (
    <div
      className={`${shimmer} relative animate-none overflow-hidden rounded bg-gray-200 dark:animate-pulse dark:bg-zinc-700 ${className}`}
    />
  );
}

export function ProductDataSkeleton() {
  return (
    <div className="flex w-full items-center justify-center">
      <div className="grid w-full max-w-full grid-cols-1 gap-x-5 gap-y-10 md:grid-cols-2 md:gap-y-0">
        {/* Left: Image Skeleton */}
        <div className="flex w-full items-start gap-x-5">
          {/* Thumbnails */}
          <div className="hidden flex-col items-center gap-4 lg:flex">
            {[...Array(2)].map((_, i) => (
              <SkeletonPageBlock key={i} className="relative h-24 w-16" />
            ))}
          </div>

          {/* Main Image */}
          <div className="relative aspect-2/3 w-full overflow-hidden rounded">
            <SkeletonPageBlock className="absolute top-0 left-0 h-full w-full" />
          </div>
        </div>

        {/* Right: Details Skeleton */}
        <div className="flex w-full flex-col gap-8 md:ml-3">
          {/* Badges & Actions */}
          <div className="flex flex-wrap items-center gap-5">
            <SkeletonPageBlock className="h-6 w-32 rounded-full" />
            <div className="ml-auto inline-flex gap-3">
              <SkeletonPageBlock className="h-8 w-20" />
              <SkeletonPageBlock className="h-8 w-20" />
            </div>
          </div>

          {/* Price, Discount, Stock */}
          <div className="flex gap-5">
            <SkeletonPageBlock className="h-16 w-24 rounded" />
            <SkeletonPageBlock className="h-16 w-24 rounded" />
            <SkeletonPageBlock className="ml-auto h-16 w-24 rounded" />
          </div>

          {/* Product Description Blocks */}
          <div className="flex flex-col gap-5">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="flex flex-col gap-2 rounded bg-gray-100 px-3 py-3 dark:bg-zinc-800/40"
              >
                <SkeletonPageBlock className="h-5 w-32" />
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

// -------------------------------------------------------------
// ORDER
function OrderSkeleton({ value }: { value: number }) {
  return (
    <tr
      key={value}
      className="animate-none hover:bg-gray-50/60 dark:animate-pulse dark:hover:bg-zinc-800/25"
    >
      {/* Order ID */}
      <td className="px-4 py-4 whitespace-nowrap">
        <div className="h-5 w-8 rounded bg-gray-200 dark:bg-zinc-700"></div>
      </td>

      {/* Customer Name */}
      <td className="px-4 py-4 whitespace-nowrap">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-zinc-700"></div>
          <div className="space-y-1 truncate">
            <div className="h-4 w-28 rounded bg-gray-200 dark:bg-zinc-700"></div>
            <div className="h-4 w-46 rounded bg-gray-200 dark:bg-zinc-700"></div>
          </div>
        </div>
      </td>

      {/* Order Date */}
      <td className="px-4 py-4 whitespace-nowrap">
        <div className="h-5 w-20 rounded bg-gray-200 dark:bg-zinc-700"></div>
      </td>

      {/* Status */}
      <td className="px-4 py-4 whitespace-nowrap">
        <div className="h-5 w-24 rounded-full bg-gray-200 dark:bg-zinc-700"></div>
      </td>

      {/* Total */}
      <td className="px-4 py-4 whitespace-nowrap">
        <div className="h-5 w-12 rounded bg-gray-200 dark:bg-zinc-700"></div>
      </td>

      {/* Dropdown menu */}
      <td className="px-4 py-4 text-center whitespace-nowrap">
        <div className="mx-auto h-6 w-6 rounded bg-gray-200 dark:bg-zinc-700"></div>
      </td>
    </tr>
  );
}

export function OrdersListSkeleton() {
  // <tbody className="divide-y divide-zinc-700/10 text-sm text-gray-800/70 dark:divide-zinc-700/40 dark:text-gray-50/80">
  return (
    <tbody
      className={`${shimmer} relative divide-y divide-zinc-700/10 overflow-hidden text-sm text-gray-800/70 dark:divide-zinc-700/40 dark:text-gray-50/80`}
    >
      <OrderSkeleton value={1} />
      <OrderSkeleton value={2} />
      <OrderSkeleton value={3} />
      <OrderSkeleton value={4} />
      <OrderSkeleton value={5} />
      <OrderSkeleton value={6} />
    </tbody>
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
    <div
      className={`${shimmer} relative h-4 overflow-hidden rounded bg-gray-200 dark:bg-zinc-700 ${className} animate-none dark:animate-pulse`}
    />
  );
}

export function OrderDetailsSkeleton() {
  return (
    <div className="flex w-full flex-col gap-8">
      {/* Order Info */}
      <div className="flex w-fit flex-col gap-1 rounded-xl border border-gray-200 p-3 dark:border-zinc-800">
        <h2 className="mb-3 text-lg font-semibold text-gray-900 dark:text-gray-100">
          Dati ordine
        </h2>

        <div className="flex flex-wrap items-center gap-3 sm:flex-row sm:gap-6">
          {[...Array(2)].map((_, idx) => (
            <div
              key={idx}
              className={`${shimmer} relative inline-flex w-fit items-center gap-2 overflow-hidden rounded bg-gray-50 px-2 py-1 dark:bg-zinc-800/40`}
            >
              <div className="h-5 w-5 animate-none rounded-full bg-gray-200 dark:animate-pulse dark:bg-zinc-600" />
              <SkeletonBlock className="h-4 w-24" />
              <SkeletonBlock className="h-4 w-16" />
            </div>
          ))}
          {/* Status Tag */}
          <div
            className={`${shimmer} relative h-6 w-24 animate-none overflow-hidden rounded-full bg-gray-200 dark:animate-pulse dark:bg-zinc-700`}
          />
          {/* Action Button */}
          <div
            className={`${shimmer} rounded- relative h-6 w-18 animate-none overflow-hidden bg-gray-200 dark:animate-pulse dark:bg-zinc-700`}
          />
        </div>
      </div>

      {/* Customer Info */}
      <div className="flex w-fit flex-col gap-1 rounded-xl border border-gray-200 p-3 dark:border-zinc-800">
        <h2 className="mb-3 text-lg font-semibold text-gray-900 dark:text-gray-100">
          Dati cliente
        </h2>
        <div className="flex flex-col gap-2 text-sm">
          <div className="inline-flex items-center gap-2">
            <div
              className={`${shimmer} relative h-8 w-8 animate-none overflow-hidden rounded-full bg-gray-200 dark:animate-pulse dark:bg-zinc-700`}
            />
            <SkeletonBlock className="h-4 w-40" />
          </div>
          <div className="inline-flex items-center gap-2">
            <div
              className={`${shimmer} relative h-5 w-5 animate-none overflow-hidden rounded-full bg-gray-200 dark:animate-pulse dark:bg-zinc-700`}
            />
            <SkeletonBlock className="h-4 w-40" />
          </div>
        </div>
      </div>

      {/* Product Table */}
      <div>
        <h2 className="mb-3 text-lg font-semibold text-gray-900 dark:text-gray-100">
          Prodotti ordinati
        </h2>
        <div className="overflow-x-auto rounded-lg border border-gray-100 dark:border-zinc-800">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-zinc-800">
                {["Nome", "Prezzo unitario", "Quantità", "Totale riga"].map(
                  (heading) => (
                    <th
                      key={heading}
                      className="px-4 py-2 text-left font-semibold text-gray-700 dark:text-gray-200"
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
                  <td className="px-4 py-2">
                    <SkeletonBlock className="h-4 w-32" />
                  </td>
                  <td className="px-4 py-2">
                    <SkeletonBlock className="h-4 w-20" />
                  </td>
                  <td className="px-4 py-2">
                    <SkeletonBlock className="h-4 w-12" />
                  </td>
                  <td className="px-4 py-2">
                    <SkeletonBlock className="h-4 w-20" />
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
    <div className="flex flex-col gap-1">
      <div className="h-5 w-20 animate-pulse rounded-md bg-gray-200 dark:bg-zinc-700"></div>
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
      className={`${shimmer} relative h-8 overflow-hidden md:h-10 ${breadcumbs ? "mb-6 w-80 md:w-120" : "w-48"} animate-none rounded-full bg-gray-200 dark:animate-pulse dark:bg-zinc-700`}
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
      className={`${shimmer} relative flex h-full flex-col gap-8 overflow-hidden bg-gray-50 px-3 py-4 sm:p-8 dark:bg-zinc-800/60`}
    >
      <h1 className="h-7 w-45 animate-pulse rounded bg-gray-200 dark:bg-zinc-700" />
      <form className="flex animate-pulse flex-col gap-5 md:gap-3">
        <div className="space-y-5">
          <FormRow height="2rem" />
          <FormRow height="2rem" />
        </div>

        {/* File input skeleton */}
        <div className="mt-3 flex flex-col justify-baseline gap-3 md:flex-row">
          <div className="h-4 w-56 rounded bg-gray-200 dark:bg-zinc-700" />
          <div className="flex items-center gap-2">
            <div className="h-12 w-24 rounded bg-gray-200 dark:bg-zinc-700" />
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
      className={`${shimmer} relative flex h-full flex-col gap-8 overflow-hidden bg-gray-50 px-3 py-4 sm:p-8 dark:bg-zinc-800/60`}
    >
      <h1 className="h-7 w-45 animate-pulse rounded bg-gray-200 dark:bg-zinc-700" />
      <form className="flex animate-pulse flex-col gap-5 md:gap-3">
        <div className="space-y-5">
          <FormRow height="2rem" />
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
export function StatSkeleton() {
  return (
    <div
      className={`${shimmer} relative grid w-full grow animate-none grid-cols-[4.2rem_1fr] grid-rows-[auto_auto] gap-x-5 gap-y-1 overflow-hidden rounded-md bg-gray-50/65 p-4 lg:w-60 lg:grid-cols-[auto_auto] dark:animate-pulse dark:bg-zinc-800/40`}
    >
      {/* Circle placeholder for icon */}
      <div className="row-span-full flex aspect-square size-15 items-center justify-center rounded-full bg-gray-100 dark:bg-zinc-800/90">
        <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-zinc-700" />
      </div>
      {/* Title skeeleton */}
      <h5 className="h-4 w-24 self-end rounded bg-gray-200 dark:bg-zinc-700" />
      {/* Value skeleton */}
      <p className="h-10 w-20 rounded bg-gray-200 dark:bg-zinc-700" />
    </div>
  );
}

export function StatsSkeleton() {
  return (
    <div className="col-span-full">
      <div className="text-dark dark:text-light flex flex-col justify-between gap-3 lg:flex-row">
        <StatSkeleton />
        <StatSkeleton />
        <StatSkeleton />
        <StatSkeleton />
      </div>
    </div>
  );
}

export function LatestOrdersSkeleton() {
  return (
    <div
      className={`col-span-full flex flex-col rounded-md bg-gray-50/65 px-(--box-padding) py-3 [--box-padding:--spacing(2)] lg:col-span-1 dark:bg-zinc-800/40`}
    >
      <h2 className="dark:text-light text-dark mb-3 rounded px-2 text-xl font-semibold">
        Ultimi ordini
      </h2>
      <ul
        className={`${shimmer} relative flex animate-none flex-col overflow-hidden rounded bg-gray-50/65 dark:animate-pulse dark:bg-zinc-800/40`}
      >
        {[...Array(5)].map((_, i) => (
          <li
            key={i}
            className="grid w-full grid-cols-[3rem_auto_7.5rem_6rem_5.5rem] items-center justify-between gap-4 p-3"
          >
            {/*Link */}
            <div className="h-4 w-14 rounded bg-gray-200 dark:bg-zinc-700" />

            {/* Name + Email */}
            <div className="flex items-center gap-3">
              <div className="h-7 w-7 rounded-full bg-gray-200 dark:bg-zinc-700" />
              <div className="space-y-1">
                <div className="h-4 w-28 rounded bg-gray-200 dark:bg-zinc-700" />
                <div className="h-3 w-40 rounded bg-gray-200 dark:bg-zinc-700" />
              </div>
            </div>

            {/* Total Cost */}
            <div className="mx-auto h-4 w-16 rounded bg-gray-200 dark:bg-zinc-700" />

            {/* Status Tag */}
            <div className="mx-auto h-6 w-20 rounded-full bg-gray-200 dark:bg-zinc-700" />
            {/* Action Button */}
            <div className="h-6 w-14 rounded bg-gray-200 dark:bg-zinc-700" />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function BestSellersChartSkeleton() {
  return (
    <div
      className={`${shimmer} relative flex h-full w-full animate-none flex-col items-center justify-center gap-6 overflow-hidden dark:animate-pulse`}
    >
      {/* Simulated Pie Chart */}
      <div className="pieChart:h-45 pieChart:w-45 relative mb-2 h-40 w-40 rounded-full bg-gray-200 md:h-60 md:w-60 lg:h-40 lg:w-40 dark:bg-zinc-700">
        <div className="absolute inset-8 rounded-full bg-gray-50 dark:bg-zinc-900/70" />
      </div>

      {/* Simulated Legend */}

      <ul className="flex flex-wrap justify-center gap-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <li
            key={index}
            className="flex items-center gap-1 rounded-md border border-gray-200 bg-white p-1 dark:border-none dark:bg-zinc-700/50"
          >
            <span className="inline-block h-3 w-3 rounded-full bg-gray-200 dark:bg-zinc-700" />
            <span className="inline-block h-4 w-17 rounded-full bg-gray-200 dark:bg-zinc-700"></span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function BestSellersSkeleton() {
  return (
    <div
      className={`col-span-full row-span-1 row-start-2 flex flex-col rounded-md bg-gray-50/65 px-(--box-padding) py-3 [--box-padding:--spacing(2)] lg:col-start-2 dark:bg-zinc-800/40`}
    >
      <h2 className="dark:text-light text-dark mb-3 rounded px-2 text-xl font-semibold">
        Top 5 Best Sellers
      </h2>

      <BestSellersChartSkeleton />
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
        <LatestOrdersSkeleton />
        <AreaChartSkeleton />
        <AreaChartSkeleton />
      </div>
    </div>
  );
}
