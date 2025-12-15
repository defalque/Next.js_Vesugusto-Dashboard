"use client";

import { useRouter } from "next/navigation";

import { SubmitHandler, useForm } from "react-hook-form";

import FormRow from "../ui/form/FormRow";
import FormError from "../ui/form/FormError";
import SelectInput from "../ui/form/SelectInput";
import TextAreaField from "../ui/form/TextAreaField";
import HeadingFormHidden from "../ui/form/HeadingFormHidden";
import { Product, UpdateProductFormInputs } from "@/app/_lib/definitions";
import { createProduct, updateProduct } from "@/app/_lib/server-actions";
import FormButtons from "../ui/form/FormButtons";
import { useEffect, useMemo, useState } from "react";
import ImageLoaderInput from "../ui/form/ImageLoaderInput";
import { toast } from "sonner";

function ProductForm({ product }: { product?: Product }) {
  const router = useRouter();
  const [imagesToAdd, setImagesToAdd] = useState<File[]>([]);

  const defaultValues = useMemo<UpdateProductFormInputs>(() => {
    if (product) {
      return {
        name: product.name,
        regularPrice: product.regularPrice / 100,
        discount: product.discount ? product.discount / 100 : 0,
        quantity: product.quantity,
        type: (product.type === "food" || product.type === "drink"
          ? product.type
          : "food") as "food" | "drink",
        info: product.info,
        details: product.details,
        description: product.description,
        ingredients: product.ingredients,
        image: undefined,
      };
    }
    return {
      name: "",
      regularPrice: 0,
      discount: 0,
      quantity: 0,
      type: "food",
      info: "",
      details: "",
      description: "",
      ingredients: "",
      image: undefined,
    };
  }, [product]);

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<UpdateProductFormInputs>({
    defaultValues,
  });

  // Reset il form dopo il primo render per correggere isDirty
  useEffect(() => {
    // Forza un reset con i defaultValues per sincronizzare correttamente isDirty
    reset(defaultValues);
  }, [reset, defaultValues]);

  const onSubmit: SubmitHandler<UpdateProductFormInputs> = async (data) => {
    if (isSubmitting) return;
    if (product) {
      toast.promise(updateProduct(String(product.id), data), {
        loading: "Modifica in corso...",
        success: "Prodotto modificato con successo!",
        error: (err) => `Errore: ${err.message}`,
      });
      reset(data);
    } else {
      toast.promise(createProduct(data, imagesToAdd), {
        loading: "Creazione in corso...",
        success: (data) => {
          if (data.notUploadedImages.length === 0) {
            return "Prodotto creato con successo!";
          } else {
            return `Prodotto creato con successo, ma alcune immagini non sono state caricate: ${data.notUploadedImages.join(", ")}`;
          }
        },
        error: (err) => `Errore: ${err.message}`,
        finally: () => {
          setImagesToAdd([]);
          router.push("/dashboard/products");
        },
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      aria-labelledby="title"
      className="dark:text-light space-y-5 rounded py-3 text-neutral-700"
      encType="multipart/form-data" // Importante per l'upload dei file
    >
      <HeadingFormHidden id="title" className="sr-only">
        Form di Modifica Prodotto
      </HeadingFormHidden>

      <FormRow
        type="text"
        placeholder="Nome..."
        label="Nome"
        {...register("name", { required: "Il nome è obbligatorio." })}
        aria-invalid={errors.name ? "true" : "false"}
        disabled={isSubmitting}
      />
      <FormError message={errors.name?.message} />

      <FormRow
        type="number"
        step="any"
        placeholder="Prezzo..."
        label="Prezzo"
        {...register("regularPrice", {
          required: "Il prezzo è obbligatorio.",
          min: {
            value: 1,
            message: "Il prezzo non può essere 0 o inferiore!",
          },
        })}
        aria-invalid={errors.regularPrice ? "true" : "false"}
        disabled={isSubmitting}
      />
      <FormError message={errors.regularPrice?.message} />

      <FormRow
        type="number"
        placeholder="Sconto..."
        step="any"
        label="Sconto"
        {...register("discount", {
          min: {
            value: 0,
            message: "Lo sconto non può essere inferiore a 0!",
          },
          validate: (value) => {
            if (!value || value === 0) return true;
            return (
              value <= getValues("regularPrice") ||
              "Lo sconto deve essere minore del prezzo!"
            );
          },
        })}
        aria-invalid={errors.discount ? "true" : "false"}
        disabled={isSubmitting}
      />
      <FormError message={errors.discount?.message} />

      <FormRow
        type="number"
        placeholder="Quantità..."
        label="Quantità"
        {...register("quantity", {
          required: "La quantità è obbligatoria.",
          min: {
            value: 0,
            message: "La quantità non può essere inferiore a 0!",
          },
        })}
        aria-invalid={errors.quantity ? "true" : "false"}
        disabled={isSubmitting}
      />
      <FormError message={errors.quantity?.message} />

      <SelectInput
        id="type"
        label="Tipo"
        options={["food", "drink"]}
        {...register("type", { required: "Il tipo è obbligatorio." })}
        aria-invalid={errors.type ? "true" : "false"}
        disabled={isSubmitting}
      />
      <FormError message={errors.type?.message} />

      <TextAreaField
        id="description"
        label="Descrizione"
        placeholder="Descrizione del prodotto..."
        {...register("description", {
          required: "La descrizione è obbligatoria.",
        })}
        aria-invalid={errors.description ? "true" : "false"}
        disabled={isSubmitting}
      />
      <FormError message={errors.description?.message} />

      <TextAreaField
        id="ingredients"
        label="Ingredienti"
        placeholder="Elenco ingredienti del prodotto..."
        {...register("ingredients", {
          required: "Gli ingredienti sono obbligatori.",
        })}
        aria-invalid={errors.ingredients ? "true" : "false"}
        disabled={isSubmitting}
      />
      <FormError message={errors.ingredients?.message} />

      <TextAreaField
        id="info"
        label="Informazioni nutrizionali"
        placeholder="Valori nutrizionali del prodotto..."
        {...register("info", {
          required: "Le informazioni sono obbligatorie.",
        })}
        aria-invalid={errors.info ? "true" : "false"}
        disabled={isSubmitting}
      />
      <FormError message={errors.info?.message} />

      <TextAreaField
        id="details"
        label="Dettagli"
        placeholder="Dettagli del prodotto (peso, confezione, ecc.)..."
        {...register("details", {
          required: "I dettagli sono obbligatori.",
        })}
        aria-invalid={errors.details ? "true" : "false"}
        disabled={isSubmitting}
      />
      <FormError message={errors.details?.message} />

      {!product && (
        <div className="flex flex-col gap-2">
          <span className="text-[15px] font-semibold sm:text-sm">
            Immagini del prodotto
          </span>
          <ImageLoaderInput
            imagesToAdd={imagesToAdd}
            setImagesToAdd={setImagesToAdd}
            isSubmitting={isSubmitting}
          />
        </div>
      )}

      <FormButtons
        isSubmitting={isSubmitting}
        isDirty={isDirty}
        onClick={() => reset()}
        defaultText={product ? "Modifica" : "Crea"}
        pendingText={product ? "Modifica in corso..." : "Creazione in corso..."}
      />
    </form>
  );
}

export default ProductForm;
