function ProductDetail({
  productAttribute,
  label,
}: {
  productAttribute: string;
  label: string;
}) {
  return (
    <div className="flex w-full flex-col gap-3 rounded-md bg-gray-50/65 px-3 py-3 dark:bg-zinc-800/40">
      <h2 className="_lg:text-lg text-base font-medium">{label}</h2>
      <p className="_whitespace-normal text-sm/6 dark:text-zinc-300">
        {productAttribute}
      </p>
    </div>
  );
}

export default ProductDetail;
