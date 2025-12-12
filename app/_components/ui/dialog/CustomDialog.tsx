"use client";

import {
  addProductImages,
  confirmOrder,
  deleteProduct,
  deleteProductImage,
} from "@/app/_lib/server-actions";

import { useDialog } from "@/app/_contexts/DialogContext";
import { Dialog, DialogBackdrop } from "@headlessui/react";
import CustomPanel from "./CustomPanel";

import { toastStyle } from "@/constants/const";

import FileInput from "../FileInput";
import { toast } from "sonner";

export default function CustomDialog({
  afterAction,
  isPending,
  setIsPending,
}: {
  afterAction?: () => void;
  isPending?: boolean;
  setIsPending?: (isPending: boolean) => void;
}) {
  const { isOpen, dialogData, closeDialog } = useDialog();
  const { type, name, itemId, itemName, itemNames } = dialogData;

  const handleConfirmDeliver = () => {
    toast.promise(confirmOrder(String(itemId), "delivered"), {
      loading: "Modifica in corso...",
      success: "Spedizione confermato con successo!",
      error: (err) => `${err.message}`,
    });
    closeDialog();
  };

  const handleConfirmOrder = () => {
    toast.promise(confirmOrder(String(itemId), "ready"), {
      loading: "Modifica in corso...",
      success: "Ordine confermato con successo!",
      error: (err) => `${err.message}`,
    });
    closeDialog();
  };

  const handleDeleteProduct = () => {
    toast.promise(deleteProduct(itemName ?? String(itemId)), {
      loading: "Eliminazione in corso...",
      success: "Prodotto eliminato con successo!",
      error: (err) => `Errore: ${err.message}`,
    });
    closeDialog();
  };

  const handleDeleteImage = () => {
    if (isPending) return;
    const successMessage =
      itemNames?.length && itemNames?.length > 1
        ? "Immagini eliminate con successo!"
        : "Immagine eliminata con successo!";
    setIsPending?.(true);
    toast.promise(deleteProductImage(name!, itemNames!), {
      loading: "Eliminazione in corso...",
      success: successMessage,
      error: (err) => `Errore: ${err.message}`,
      finally: () => {
        setIsPending?.(false);
        afterAction?.();
      },
    });
    closeDialog();
  };

  const handleAddProductImages = (formData?: FormData) => {
    if (!formData) return;

    const images = formData
      .getAll("images")
      .filter((file) => file instanceof File && file.size > 0);

    if (images.length === 0) {
      toast.error("Nessuna immagine selezionata.", { style: toastStyle });
      return;
    }

    toast.promise(addProductImages(itemId!, formData), {
      loading: "Aggiunta in corso...",
      success: "Aggiunta avvenuta con successo!",
      error: (err) => `Errore: ${err.message}`,
    });
    closeDialog();
  };

  return (
    <>
      <Dialog
        open={isOpen}
        role={type === "delete" || type === "cancel" ? "alertdialog" : "dialog"}
        className="relative z-100 focus:outline-none"
        onClose={closeDialog}
      >
        <DialogBackdrop className="fixed inset-0 bg-white/40 backdrop-blur-xs dark:bg-black/40" />

        {type === "confirm" && (
          <CustomPanel
            type="confirm"
            title={`Conferma stato ordine "${itemId}"`}
            description="Sei sicuro di voler rendere questo ordine pronto per la spedizione?"
            actionLabel="Conferma"
            actionFn={handleConfirmOrder}
            onClose={closeDialog}
          />
        )}

        {type === "done" && (
          <CustomPanel
            type="done"
            title={`Conferma spedizione avvenuta ordine "${itemId}"`}
            description="Sei sicuro di voler confermare la spedizione avvenuta di questo ordine?"
            actionLabel="Conferma"
            actionFn={handleConfirmDeliver}
            onClose={closeDialog}
          />
        )}

        {type === "delete" && (
          <CustomPanel
            type="delete"
            title={`Elimina prodotto "${itemName}"`}
            subTitle="Il prodotto verrà eliminato definitivamente."
            description="Sei sicuro di voler eliminare questo prodotto? Questa azione è irreversibile."
            actionLabel={`Elimina "${itemName}"`}
            actionFn={handleDeleteProduct}
            onClose={closeDialog}
          />
        )}

        {type === "add" && (
          <CustomPanel
            title="Aggiungi una o più nuove immagini del prodotto"
            actionLabel="Aggiungi"
            formRow={
              <FileInput
                multiple
                name="images"
                type="file"
                accept="image/*"
                label="Scegli una o più immagini"
              />
            }
            actionFn={handleAddProductImages}
            onClose={closeDialog}
          />
        )}

        {type === "cancel" && (
          <CustomPanel
            type="cancel"
            title={`Elimina ${(() => {
              const names =
                itemNames?.map((name) =>
                  name.replace(
                    "https://mldueodzggqqwjvkyalt.supabase.co/storage/v1/object/public/product-images/",
                    "",
                  ),
                ) || [];
              if (names.length === 0) return "";
              if (names.length === 1) return `"${names[0]}"`;
              if (names.length === 2) return `"${names[0]}" e "${names[1]}"`;

              const allButLast = names.slice(0, -1);
              const last = names[names.length - 1];
              return `"${allButLast.join('", "')}" e "${last}"`;
            })()}`}
            subTitle={
              itemNames && itemNames.length > 1
                ? "Le immagini verranno eliminate definitivamente."
                : "L'immagine verrà eliminata definitivamente."
            }
            description={
              itemNames && itemNames.length > 1
                ? "Sei sicuro di voler eliminare queste immagini? Questa azione è irreversibile."
                : "Sei sicuro di voler eliminare questa immagine? Questa azione è irreversibile."
            }
            actionLabel={
              itemNames && itemNames.length > 1
                ? "Elimina immagini"
                : "Elimina immagine"
            }
            actionFn={handleDeleteImage}
            onClose={closeDialog}
          />
        )}
      </Dialog>
    </>
  );
}
