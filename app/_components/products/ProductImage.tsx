"use client";
// import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
// import MiniImageButton from "./MiniImageButton";
// import ImageBox from "./ImageBox";
// import IconButton from "./IconButton";
// import CustomDialogWrapper from "../ui/dialog/CustomDialogWrapper";
// import AddProductImageButton from "./AddProductImageButton";
// import CancelProductImageButton from "./CancelProductImageButton";
// import Image from "next/image";
// import { PlusIcon } from "@heroicons/react/24/solid";
// import SelectedImageContextProvider from "@/app/_contexts/SelectedImageContext";
// import DialogContextProvider from "@/app/_contexts/DialogContext";

import { Product } from "@/app/_lib/definitions";
import SafeImage from "../ui/SafeImage";
import { addProductImages } from "@/app/_lib/server-actions";
import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { toast } from "sonner";

function ProductImage({ product }: { product: Product }) {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddProductImages = (e: React.FormEvent<HTMLFormElement>) => {
    if (isSubmitting) return;
    e.preventDefault(); // Blocca il reload della pagina

    setIsSubmitting(true);

    if (selectedImages.length === 0) {
      toast.error("Nessuna immagine selezionata.");
      setIsSubmitting(false);
      setSelectedImages([]);
      return;
    }

    const formData = new FormData();
    selectedImages.forEach((file) => {
      formData.append("images", file);
    });

    toast.promise(addProductImages(product.id, formData), {
      loading: "Aggiunta in corso...",
      success: (data) => {
        if (data.notUploadedImages.length === 0) {
          return "Caricamento avvenuto con successo!";
        } else {
          return `Alcune immagini non sono state caricate: ${data.notUploadedImages.join(", ")}`;
        }
      },
      error: (err) => `${err.message}`,
      finally: () => {
        setIsSubmitting(false);
      },
    });

    setSelectedImages([]);
  };

  const handleFileSelect = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const fileArray = Array.from(files);
    setSelectedImages((prev) => [...prev, ...fileArray]);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    handleFileSelect(files);
  };

  return (
    <div className="mt-8 flex flex-col gap-5 lg:mt-5">
      <h5 className="dark:text-light/80 border-gray-200 pt-2 text-lg font-semibold text-neutral-700 dark:border-zinc-700/40">
        Gestione immagini
      </h5>

      {product.image.length > 0 ? (
        <div className="flex flex-col gap-4 has-[input[type='checkbox']:checked]:[&>div:first-child>button:last-child]:visible has-[input[type='checkbox']:checked]:[&>div:first-child>form]:cursor-not-allowed has-[input[type='checkbox']:checked]:[&>div:first-child>form]:opacity-50">
          {/* Product images controls */}
          <div className="flex flex-col gap-2">
            {/* Product images form */}
            <form onSubmit={handleAddProductImages}>
              <div
                className="flex min-h-40 min-w-full justify-center rounded-lg border border-dashed border-gray-900/25 p-5 sm:w-sm dark:border-white/30"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                {selectedImages.length === 0 && (
                  <div className="text-center">
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      data-slot="icon"
                      aria-hidden="true"
                      className="mx-auto size-12 text-gray-300 dark:text-white/30"
                    >
                      <path
                        d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                        clipRule="evenodd"
                        fillRule="evenodd"
                      />
                    </svg>
                    <div className="mt-4 flex flex-wrap justify-center text-center text-[15px] text-gray-400 sm:text-sm/6 dark:text-white/30">
                      <label
                        htmlFor="file-upload"
                        className="touch-hitbox relative cursor-pointer rounded-md bg-transparent font-semibold text-pink-600 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-pink-600 hover:text-pink-500 disabled:cursor-not-allowed disabled:opacity-50 dark:text-rose-400 dark:focus-within:outline-rose-400 dark:hover:text-rose-300"
                      >
                        <span>Carica una o più immagini</span>
                        <input
                          id="file-upload"
                          onChange={(e) => {
                            handleFileSelect(e.target.files);
                          }}
                          type="file"
                          accept="image/*"
                          name="images"
                          multiple
                          className="sr-only disabled:cursor-not-allowed disabled:opacity-50"
                          disabled={selectedImages.length > 0 || isSubmitting}
                        />
                      </label>
                      <p className="pl-1 pointer-coarse:hidden pointer-fine:block">
                        o trascinale e rilasciale
                      </p>
                    </div>
                    <p className="mt-1 text-sm text-gray-400 sm:mt-0 sm:text-xs/5 dark:text-white/30">
                      PNG, JPG, GIF fino a 1MB
                    </p>
                  </div>
                )}
                {selectedImages.length > 0 && (
                  <div className="flex flex-col items-center justify-center gap-4">
                    <div className="flex flex-wrap items-center justify-center gap-1">
                      {selectedImages.map((image, i) => (
                        <div
                          key={image.name + i}
                          className="dark:text-light/80 flex items-center justify-center gap-1 rounded-lg border border-gray-200 py-0.5 pr-2 pl-1 text-neutral-700/80 dark:border-zinc-700/40 dark:hover:bg-zinc-800/90"
                        >
                          <button
                            type="button"
                            disabled={isSubmitting}
                            onClick={() => {
                              setSelectedImages(
                                selectedImages.filter(
                                  (file) => file.name !== image.name,
                                ),
                              );
                            }}
                            className="touch-hitbox cursor-pointer rounded-lg p-0.5 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-zinc-900"
                          >
                            <XMarkIcon className="size-4.5" />
                          </button>
                          <span className="text-sm font-semibold">
                            {image.name}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      <button
                        type="submit"
                        className="touch-hitbox flex cursor-pointer items-center justify-center rounded-lg border border-inherit bg-lime-500 px-3 py-2 text-sm font-semibold text-white inset-shadow-2xs transition-colors duration-200 hover:bg-lime-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700/40 dark:bg-lime-600 dark:shadow-sm dark:inset-shadow-white/20 dark:hover:bg-lime-700"
                        disabled={isSubmitting}
                      >
                        Carica
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedImages([])}
                        className="touch-hitbox flex cursor-pointer items-center justify-center rounded-lg border border-inherit bg-stone-500 px-3 py-2 text-sm font-semibold text-white inset-shadow-2xs transition-colors duration-200 hover:bg-stone-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700/40 dark:bg-stone-800 dark:shadow-sm dark:inset-shadow-white/20 dark:hover:bg-stone-900"
                        disabled={isSubmitting}
                      >
                        Cancella tutto
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </form>
            {/* Product images remove selected */}
            <button
              type="button"
              className="touch-hitbox invisible flex cursor-pointer items-center justify-center self-stretch rounded-lg border border-inherit bg-red-500 px-2 py-1.5 text-sm font-semibold text-white inset-shadow-2xs transition-colors duration-200 group-hover:visible group-has-checked:invisible hover:bg-red-600 dark:border-zinc-700/40 dark:bg-red-800 dark:shadow-sm dark:inset-shadow-white/20 dark:hover:bg-red-700"
              disabled={isSubmitting}
            >
              Rimuovi selezionati
            </button>
          </div>

          {/* Product images */}
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
            {product.image.map((img, index) => (
              <div key={index} className="group transition-all duration-200">
                <div className="relative aspect-2/3 w-full overflow-hidden rounded-md">
                  <SafeImage
                    src={img}
                    alt={`Immagine ${index + 1} di ${product.name}`}
                    fill
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8L8VQDwAE0wGaYyyo1gAAAABJRU5ErkJggg=="
                    quality={75}
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1280px) 25vw, 20vw"
                    className="dark:shadow-primary-dark-700 object-cover transition-opacity duration-200 group-has-checked:opacity-50 dark:shadow-sm dark:brightness-80"
                  />
                </div>
                <div className="flex items-center justify-between pt-1.5">
                  <input
                    disabled={selectedImages.length > 0 || isSubmitting}
                    type="checkbox"
                    className="touch-hitbox invisible size-5 rounded-lg border border-gray-400 text-white accent-red-500 group-hover:visible group-has-checked:visible disabled:cursor-not-allowed disabled:opacity-50 sm:size-4 dark:accent-red-600 pointer-coarse:visible"
                  />
                  <button
                    disabled={selectedImages.length > 0 || isSubmitting}
                    className="touch-hitbox invisible flex cursor-pointer items-center rounded-lg border border-inherit bg-red-500 px-2 py-1 text-sm font-semibold text-white inset-shadow-2xs transition-colors duration-200 group-hover:visible group-has-checked:invisible hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50 sm:text-xs dark:border-zinc-700/40 dark:bg-red-800 dark:shadow-sm dark:inset-shadow-white/20 dark:hover:bg-red-700 pointer-coarse:visible"
                  >
                    Elimina
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mx-auto">
          <form onSubmit={handleAddProductImages}>
            <div
              className="flex min-h-40 min-w-full justify-center rounded-lg border border-dashed border-gray-900/25 p-5 sm:w-sm dark:border-white/30"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              {selectedImages.length === 0 && (
                <div className="text-center">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    data-slot="icon"
                    aria-hidden="true"
                    className="mx-auto size-12 text-gray-300 dark:text-white/30"
                  >
                    <path
                      d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                      clipRule="evenodd"
                      fillRule="evenodd"
                    />
                  </svg>
                  <div className="mt-4 flex flex-wrap justify-center text-center text-[15px] text-gray-400 sm:text-sm/6 dark:text-white/30">
                    <label
                      htmlFor="file-upload"
                      className="touch-hitbox relative cursor-pointer rounded-md bg-transparent font-semibold text-pink-600 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-pink-600 hover:text-pink-500 disabled:cursor-not-allowed disabled:opacity-50 dark:text-rose-400 dark:focus-within:outline-rose-400 dark:hover:text-rose-300"
                    >
                      <span>Carica una o più immagini</span>
                      <input
                        id="file-upload"
                        onChange={(e) => {
                          handleFileSelect(e.target.files);
                        }}
                        type="file"
                        accept="image/*"
                        name="images"
                        multiple
                        className="sr-only disabled:cursor-not-allowed disabled:opacity-50"
                        disabled={selectedImages.length > 0 || isSubmitting}
                      />
                    </label>
                    <p className="pl-1 pointer-coarse:hidden pointer-fine:block">
                      o trascinale e rilasciale
                    </p>
                  </div>
                  <p className="mt-1 text-sm text-gray-400 sm:mt-0 sm:text-xs/5 dark:text-white/30">
                    PNG, JPG, GIF fino a 1MB
                  </p>
                </div>
              )}
              {selectedImages.length > 0 && (
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="flex flex-wrap items-center justify-center gap-1">
                    {selectedImages.map((image, i) => (
                      <div
                        key={image.name + i}
                        className="dark:text-light/80 flex items-center justify-center gap-1 rounded-lg border border-gray-200 py-0.5 pr-2 pl-1 text-neutral-700/80 dark:border-zinc-700/40 dark:hover:bg-zinc-800/90"
                      >
                        <button
                          type="button"
                          disabled={isSubmitting}
                          onClick={() => {
                            setSelectedImages(
                              selectedImages.filter(
                                (file) => file.name !== image.name,
                              ),
                            );
                          }}
                          className="touch-hitbox cursor-pointer rounded-lg p-0.5 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-zinc-900"
                        >
                          <XMarkIcon className="size-4.5" />
                        </button>
                        <span className="text-sm font-semibold">
                          {image.name}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="touch-hitbox flex cursor-pointer items-center justify-center rounded-lg border border-inherit bg-lime-500 px-3 py-2 text-sm font-semibold text-white inset-shadow-2xs transition-colors duration-200 hover:bg-lime-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700/40 dark:bg-lime-600 dark:shadow-sm dark:inset-shadow-white/20 dark:hover:bg-lime-700"
                      disabled={isSubmitting}
                    >
                      Carica
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedImages([])}
                      className="touch-hitbox flex cursor-pointer items-center justify-center rounded-lg border border-inherit bg-stone-500 px-3 py-2 text-sm font-semibold text-white inset-shadow-2xs transition-colors duration-200 hover:bg-stone-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700/40 dark:bg-stone-800 dark:shadow-sm dark:inset-shadow-white/20 dark:hover:bg-stone-900"
                      disabled={isSubmitting}
                    >
                      Cancella tutto
                    </button>
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default ProductImage;
