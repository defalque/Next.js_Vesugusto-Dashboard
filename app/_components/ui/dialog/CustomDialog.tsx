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
import toast from "react-hot-toast";

import FileInput from "../FileInput";

export default function CustomDialog() {
  const { isOpen, dialogData, closeDialog } = useDialog();
  const { type, name, itemId, itemName } = dialogData;

  const handleConfirmDeliver = () => {
    toast.promise(
      confirmOrder(String(itemId), "delivered"),
      {
        loading: "Modifica in corso...",
        success: "Spedizione confermato con successo!",
        error: (err) => `${err.message}`,
      },
      {
        style: toastStyle,
      },
    );
    closeDialog();
  };

  const handleConfirmOrder = () => {
    toast.promise(
      confirmOrder(String(itemId), "ready"),
      {
        loading: "Modifica in corso...",
        success: "Ordine confermato con successo!",
        error: (err) => `${err.message}`,
      },
      {
        style: toastStyle,
      },
    );
    closeDialog();
  };

  const handleDeleteProduct = () => {
    toast.promise(
      deleteProduct(itemName ?? String(itemId)),
      {
        loading: "Eliminazione in corso...",
        success: "Prodotto eliminato con successo!",
        error: (err) => `Errore: ${err.message}`,
      },
      {
        style: toastStyle,
      },
    );
    closeDialog();
  };

  const handleDeleteImage = () => {
    toast.promise(
      deleteProductImage(name!, itemName!),
      {
        loading: "Eliminazione in corso...",
        success: "Immagine eliminata con successo!",
        error: (err) => `Errore: ${err.message}`,
      },
      {
        style: toastStyle,
      },
    );
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

    toast.promise(
      addProductImages(itemId!, formData),
      {
        loading: "Aggiunta in corso...",
        success: "Aggiunta avvenuta con successo!",
        error: (err) => `Errore: ${err.message}`,
      },
      {
        style: toastStyle,
      },
    );
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
            title={`Conferma stato ordine "${itemId}"`}
            description="Sei sicuro di voler rendere questo ordine pronto per la spedizione?"
            actionLabel="Conferma"
            actionFn={handleConfirmOrder}
            onClose={closeDialog}
          />
        )}

        {type === "done" && (
          <CustomPanel
            title={`Conferma spedizione avvenuta ordine "${itemId}"`}
            description="Sei sicuro di voler confermare la spedizione avvenuta di questo ordine?"
            actionLabel="Conferma"
            actionFn={handleConfirmDeliver}
            onClose={closeDialog}
          />
        )}

        {type === "delete" && (
          <CustomPanel
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
            title={`Elimina immagine "${itemName}"`}
            subTitle="L'immagine verrà eliminata definitivamente."
            description="Sei sicuro di voler eliminare questo immagine? Questa azione è irreversibile."
            actionLabel={`Elimina immagine`}
            actionFn={handleDeleteImage}
            onClose={closeDialog}
          />
        )}
      </Dialog>
    </>
  );
}
