"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { ReactNode } from "react";
import Button from "./Button";
import toast from "react-hot-toast";
import { confirmOrder, deleteProduct } from "@/app/_lib/server-actions";
import { toastStyle } from "@/constants/const";

function ActionDialog({
  open,
  onOpenChange,
  onClose,
  item,
  type,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClose?: () => void;
  item: string;
  type: "delete" | "confirm" | "done" | "";
  children: ReactNode;
}) {
  console.log(item);
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {/* <Dialog.Trigger asChild>{children}</Dialog.Trigger> */}
      {children}
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-all" />
        {type === "confirm" && (
          <Dialog.Content
            className="fixed top-1/2 left-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg dark:bg-zinc-900"
            aria-describedby="Conferma eliminazione item"
          >
            <Dialog.Title className="text-dark mb-4 text-base font-semibold sm:text-lg dark:text-gray-100">
              Conferma stato ordine &quot;{item}&quot;
            </Dialog.Title>
            <Dialog.Description
              id="Conferma eliminazione item"
              className="mb-8 text-sm text-gray-700 sm:text-base dark:text-gray-300"
            >
              Sei sicuro di voler rendere questo ordine pronto per la
              spedizione?
            </Dialog.Description>
            <div className="flex justify-end gap-2">
              <Dialog.Close onClick={onClose} asChild>
                <button className="inline-flex items-center justify-center rounded-md bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 dark:bg-zinc-800 dark:text-gray-200 dark:hover:bg-zinc-700">
                  Annulla
                </button>
              </Dialog.Close>
              <Button
                className="px-4"
                onClick={() => {
                  toast.promise(
                    confirmOrder(item, "ready"),
                    {
                      loading: "Modifica in corso...",
                      success: "Ordine confermato con successo!",
                      error: (err) => `Errore: ${err.message}`,
                    },
                    {
                      style: toastStyle,
                    },
                  );
                }}
              >
                Conferma
              </Button>
            </div>
            <Dialog.Close asChild>
              <button
                className="absolute top-3 right-3 inline-flex size-7 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 dark:text-gray-500 dark:hover:bg-zinc-800 dark:hover:text-gray-200"
                aria-label="Close"
                onClick={onClose}
              >
                <span className="text-lg leading-none font-bold">&times;</span>
              </button>
            </Dialog.Close>
          </Dialog.Content>
        )}

        {type === "done" && (
          <Dialog.Content
            className="fixed top-1/2 left-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg dark:bg-zinc-900"
            aria-describedby="Conferma eliminazione item"
          >
            <Dialog.Title className="text-dark mb-4 text-base font-semibold sm:text-lg dark:text-gray-100">
              Conferma spedizione avvenuta ordine &quot;{item}&quot;
            </Dialog.Title>
            <Dialog.Description
              id="Conferma eliminazione item"
              className="mb-8 text-sm text-gray-700 sm:text-base dark:text-gray-300"
            >
              Sei sicuro di voler confermare la spedizione avvenuta di questo
              ordine?
            </Dialog.Description>
            <div className="flex justify-end gap-2">
              <Dialog.Close onClick={onClose} asChild>
                <button className="inline-flex items-center justify-center rounded-md bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 dark:bg-zinc-800 dark:text-gray-200 dark:hover:bg-zinc-700">
                  Annulla
                </button>
              </Dialog.Close>
              <Button
                className="px-4"
                onClick={() => {
                  toast.promise(
                    confirmOrder(item, "delivered"),
                    {
                      loading: "Modifica in corso...",
                      success: "Ordine confermato con successo!",
                      error: (err) => `Errore: ${err.message}`,
                    },
                    {
                      style: toastStyle,
                    },
                  );
                }}
              >
                Conferma
              </Button>
            </div>
            <Dialog.Close asChild>
              <button
                className="absolute top-3 right-3 inline-flex size-7 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 dark:text-gray-500 dark:hover:bg-zinc-800 dark:hover:text-gray-200"
                aria-label="Close"
                onClick={onClose}
              >
                <span className="text-lg leading-none font-bold">&times;</span>
              </button>
            </Dialog.Close>
          </Dialog.Content>
        )}

        {type === "delete" && (
          <Dialog.Content
            className="fixed top-1/2 left-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg dark:bg-zinc-900"
            aria-describedby="Conferma eliminazione item"
          >
            <Dialog.Title className="text-dark mb-4 text-base font-semibold sm:text-lg dark:text-gray-100">
              Elimina prodotto &quot;{item}&quot;
            </Dialog.Title>
            <Dialog.Description
              id="Conferma eliminazione item"
              className="mb-8 text-sm text-gray-700 sm:text-base dark:text-gray-300"
            >
              Sei sicuro di voler eliminare questo prodotto? Questa azione è
              irreversibile.
            </Dialog.Description>
            <div className="flex justify-end gap-2">
              <Dialog.Close onClick={onClose} asChild>
                <button className="inline-flex items-center justify-center rounded-md bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 dark:bg-zinc-800 dark:text-gray-200 dark:hover:bg-zinc-700">
                  Annulla
                </button>
              </Dialog.Close>
              <Button
                className="px-4"
                onClick={async () => {
                  onClose?.();
                  toast.promise(
                    deleteProduct(item),
                    {
                      loading: "Eliminazione in corso...",
                      success: "Prodotto eliminato con successo!",
                      error: (err) => `Errore: ${err.message}`,
                    },
                    {
                      style: toastStyle,
                    },
                  );
                }}
              >
                Elimina
              </Button>
            </div>
            <Dialog.Close asChild>
              <button
                className="absolute top-3 right-3 inline-flex size-7 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 dark:text-gray-500 dark:hover:bg-zinc-800 dark:hover:text-gray-200"
                aria-label="Close"
                onClick={onClose}
              >
                <span className="text-lg leading-none font-bold">&times;</span>
              </button>
            </Dialog.Close>
          </Dialog.Content>
        )}
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default ActionDialog;
