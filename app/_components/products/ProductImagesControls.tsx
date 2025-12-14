import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import { ArchiveBoxArrowDownIcon, TrashIcon } from "@heroicons/react/24/solid";
import { m } from "framer-motion";

function ProductImagesControls({
  type,
  disabled,
  onCancel,
  onConfirm,
}: {
  type: "add" | "remove";
  disabled: boolean;
  onCancel: () => void;
  onConfirm?: () => void;
}) {
  return (
    <m.div
      key={`${type}-images-drawer`}
      initial={{
        opacity: 0,
        scale: 0.9,
        filter: "blur(4px)",
        y: 50,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        y: 0,
      }}
      exit={{
        opacity: 0,
        scale: 0.9,
        filter: "blur(4px)",
        y: 50,
      }}
      transition={{ duration: 0.2, type: "spring", bounce: 0 }}
      className="fixed inset-x-4 bottom-4 z-10 mx-auto h-15 max-w-56 overflow-hidden rounded-xl border border-gray-200 bg-white outline-none md:mx-auto md:w-full dark:border-zinc-800/90 dark:bg-zinc-950 dark:shadow-2xs dark:inset-shadow-xs dark:shadow-zinc-600/10 dark:inset-shadow-zinc-600/20"
    >
      <div className="flex h-full w-full gap-2 p-1.5 text-sm sm:text-xs">
        <m.button
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={onCancel}
          disabled={disabled}
          className="flex h-full w-1/2 cursor-pointer flex-col items-center justify-center gap-0.5 rounded-lg bg-gray-50 text-zinc-500 transition-colors duration-200 hover:bg-gray-100 hover:text-zinc-700 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-zinc-500 disabled:opacity-50 dark:bg-zinc-900/50 dark:hover:bg-zinc-900/80 dark:hover:text-zinc-300 dark:disabled:bg-zinc-900/50 dark:disabled:text-zinc-500"
        >
          <ArrowUturnLeftIcon aria-hidden="true" className="size-4" />
          Annulla
        </m.button>
        <m.button
          whileTap={{ scale: 0.95 }}
          type={type === "add" ? "submit" : "button"}
          {...(type === "remove" && { onClick: onConfirm })}
          disabled={disabled}
          className={`flex h-full w-1/2 cursor-pointer flex-col items-center justify-center gap-0.5 rounded-lg bg-gray-50 text-zinc-500 transition-colors duration-200 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-zinc-500 disabled:opacity-50 dark:bg-zinc-900/50 dark:text-zinc-500 dark:disabled:bg-zinc-900/50 dark:disabled:text-zinc-400 ${type === "add" ? "hover:bg-green-50 hover:text-green-500 dark:bg-green-900/50 dark:hover:bg-green-900/30 dark:hover:text-green-400 dark:disabled:bg-green-900/50 dark:disabled:text-green-500" : "hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/30 dark:hover:text-red-500"}`}
        >
          {type === "add" ? (
            <ArchiveBoxArrowDownIcon aria-hidden="true" className="size-4" />
          ) : (
            <TrashIcon aria-hidden="true" className="size-4" />
          )}
          {type === "add" ? "Salva" : "Elimina"}
        </m.button>
      </div>
    </m.div>
  );
}

export default ProductImagesControls;
