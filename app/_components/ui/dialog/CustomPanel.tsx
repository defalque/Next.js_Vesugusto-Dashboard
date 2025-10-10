import {
  Button,
  Description,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ReactNode } from "react";

function CustomPanel({
  title,
  subTitle,
  description,
  formRow,
  actionFn,
  actionLabel,
  onClose,
}: {
  title: string;
  subTitle?: string;
  description?: string;
  formRow?: ReactNode;
  actionFn: (formData?: FormData) => void;
  actionLabel: string;
  onClose: () => void;
}) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Blocca il reload della pagina
    const formData = new FormData(e.currentTarget); // Ottieni tutti i dati del form
    actionFn(formData); // Passa il formData all'action
  };

  const hasForm = Boolean(formRow);

  return (
    <div className="fixed inset-0 flex w-screen items-center justify-center overflow-hidden p-4">
      <DialogPanel
        transition
        as={hasForm ? "form" : "div"}
        onSubmit={hasForm ? handleSubmit : undefined}
        className="w-full max-w-xl min-w-sm rounded-xl border border-gray-300 bg-white p-6 text-zinc-900 shadow-xs backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 dark:border-zinc-800 dark:bg-zinc-800/50 dark:text-white"
      >
        <DialogTitle
          as="h3"
          className="_break-all text-base/7 font-medium hyphens-auto dark:text-white"
        >
          {title}
        </DialogTitle>

        {subTitle && (
          <Description className="mb-2 text-xs/6 text-zinc-700 dark:text-white/50">
            {subTitle}
          </Description>
        )}

        <p className="mt-2 text-sm/6 dark:text-white/70">{description}</p>

        {formRow && <div className="my-10 text-sm">{formRow}</div>}

        <div className="_gap-x-0 _sm:gap-x-2 _flex-wrap mt-4 ml-auto flex flex-wrap-reverse justify-end gap-x-2 gap-y-2">
          <button
            onClick={onClose}
            className="focus-visible:ring-brand-950 inline-flex cursor-pointer items-center justify-center rounded-md bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 focus:outline-none focus-visible:ring-4 dark:bg-zinc-800/10 dark:text-gray-200 dark:hover:bg-zinc-700"
          >
            Annulla
          </button>

          <Button
            className="data-hover:bg-brand-600 data-open:bg-brand-700 dark:data-open:bg-brand-950/25 inset-shadow-brand-50/60 bg-brand-950 dark:bg-brand-950/25 dark:border-brand-dark-300 dark:data-hover:bg-brand-950/40 text-brand-50 dark:data-focus:ring-brand-dark-300 data-focus:ring-brand-dark-300 inline-flex cursor-pointer items-center gap-2 rounded-md px-3 py-1.5 text-sm/6 font-semibold inset-shadow-sm transition-colors duration-200 focus:not-data-focus:outline-none data-focus:ring-4 data-focus:outline-none dark:border dark:inset-shadow-none"
            {...(!hasForm && { onClick: () => actionFn() })}
            type={formRow ? "submit" : "button"}
          >
            {actionLabel}
          </Button>
        </div>
      </DialogPanel>
    </div>
  );
}

export default CustomPanel;
