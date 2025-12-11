"use client";

import { Product } from "@/app/_lib/definitions";
import SafeImage from "../ui/SafeImage";
import { useState } from "react";
import { useDialog } from "@/app/_contexts/DialogContext";
import CustomDialogWrapper from "../ui/dialog/CustomDialogWrapper";
import ImageLoader from "./ImageLoader";

function ProductImage({ product }: { product: Product }) {
  const { openDialog } = useDialog();
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [removedImages, setRemovedImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
            <ImageLoader
              selectedImages={selectedImages}
              setSelectedImages={setSelectedImages}
              removedImages={removedImages}
              isSubmitting={isSubmitting}
              setIsSubmitting={setIsSubmitting}
              productId={product.id}
            />
            {/* Product images remove selected */}
            {removedImages.length > 0 && (
              <button
                type="button"
                className="touch-hitbox invisible flex cursor-pointer items-center justify-center self-stretch rounded-lg border border-inherit bg-red-500 px-2 py-1.5 text-sm font-semibold text-white inset-shadow-2xs transition-colors duration-200 group-hover:visible group-has-checked:invisible hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700/40 dark:bg-red-800 dark:shadow-sm dark:inset-shadow-white/20 dark:hover:bg-red-700"
                disabled={isSubmitting}
                onClick={(e) => {
                  e.preventDefault();
                  if (isSubmitting) return;
                  openDialog({
                    type: "cancel",
                    name: product.name,
                    itemNames: removedImages.map((img) => img),
                  });
                }}
              >
                Rimuovi selezionati
              </button>
            )}
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
                    value={img}
                    onChange={(e) => {
                      if (isSubmitting) return;
                      setRemovedImages((prev) =>
                        prev.includes(e.target.value)
                          ? prev.filter((img) => img !== e.target.value)
                          : [...prev, e.target.value],
                      );
                    }}
                    className="touch-hitbox invisible size-5 rounded-lg border border-gray-300 text-white accent-red-500 group-hover:visible group-has-checked:visible disabled:cursor-not-allowed disabled:opacity-50 sm:size-4 dark:accent-red-600 pointer-coarse:visible"
                  />
                  <button
                    disabled={selectedImages.length > 0 || isSubmitting}
                    onClick={(e) => {
                      e.preventDefault();
                      if (isSubmitting) return;
                      openDialog({
                        type: "cancel",
                        name: product.name,
                        itemNames: [img],
                      });
                    }}
                    className="touch-hitbox invisible flex cursor-pointer items-center rounded-lg border border-inherit bg-red-500 px-2 py-1 text-sm font-semibold text-white inset-shadow-2xs transition-colors duration-200 group-hover:visible group-has-checked:invisible hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50 sm:text-xs dark:border-zinc-700/40 dark:bg-red-800 dark:shadow-sm dark:inset-shadow-white/20 dark:hover:bg-red-700 pointer-coarse:visible"
                  >
                    Elimina
                  </button>
                </div>
              </div>
            ))}
          </div>

          <CustomDialogWrapper
            afterAction={() => setRemovedImages([])}
            isPending={isSubmitting}
            setIsPending={setIsSubmitting}
          />
        </div>
      ) : (
        <ImageLoader
          selectedImages={selectedImages}
          setSelectedImages={setSelectedImages}
          isSubmitting={isSubmitting}
          setIsSubmitting={setIsSubmitting}
          productId={product.id}
        />
      )}
    </div>
  );
}

export default ProductImage;
