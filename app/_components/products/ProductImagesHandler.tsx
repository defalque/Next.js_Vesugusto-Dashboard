"use client";

import { Product } from "@/app/_lib/definitions";
import SafeImage from "../ui/SafeImage";
import { useState } from "react";
import { useDialog } from "@/app/_contexts/DialogContext";
import CustomDialogWrapper from "../ui/dialog/CustomDialogWrapper";
import ImageLoader from "./ImageLoader";
import { ArrowUturnLeftIcon, TrashIcon } from "@heroicons/react/24/solid";
import { AnimatePresence, m } from "framer-motion";

function ProductImagesHandler({ product }: { product: Product }) {
  const { openDialog } = useDialog();
  const [imagesToAdd, setImagesToAdd] = useState<File[]>([]);
  const [imagesToRemove, setImagesToRemove] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div className="mt-8 flex flex-col gap-5 lg:mt-5">
      <h5 className="dark:text-light/80 border-gray-200 pt-2 text-lg font-semibold text-neutral-700 dark:border-zinc-700/40">
        Gestione immagini
      </h5>

      {product.image.length > 0 ? (
        <div className="flex flex-col gap-4 has-[input[type='checkbox']:checked]:[&>div:first-child>button:last-child]:visible has-[input[type='checkbox']:checked]:[&>div:first-child>form]:cursor-not-allowed has-[input[type='checkbox']:checked]:[&>div:first-child>form]:opacity-50">
          {/* Product images loader */}
          <ImageLoader
            imagesToAdd={imagesToAdd}
            setImagesToAdd={setImagesToAdd}
            imagesToRemove={imagesToRemove}
            isSubmitting={isSubmitting}
            setIsSubmitting={setIsSubmitting}
            productId={product.id}
          />

          {/* Product images */}
          <ol className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6">
            <AnimatePresence mode="popLayout" initial={false}>
              {product.image.map((img, index) => (
                <m.li
                  key={img}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.25, type: "spring", bounce: 0 }}
                  className="relative"
                >
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => {
                      if (isSubmitting) return;
                      setImagesToRemove((prev) =>
                        prev.includes(img)
                          ? prev.filter((curImg) => curImg !== img)
                          : [...prev, img],
                      );
                    }}
                    className="relative aspect-2/3 w-full cursor-pointer overflow-hidden rounded-2xl disabled:cursor-not-allowed"
                  >
                    <SafeImage
                      src={img}
                      alt={`Immagine ${index + 1} di ${product.name}`}
                      fill
                      placeholder="blur"
                      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8L8VQDwAE0wGaYyyo1gAAAABJRU5ErkJggg=="
                      quality={75}
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1280px) 25vw, 20vw"
                      className={`dark:shadow-primary-dark-700 rounded-2xl object-cover transition-opacity duration-200 dark:shadow-sm dark:brightness-80 ${imagesToRemove.includes(img) ? "opacity-70" : ""}`}
                    />
                    <m.div
                      exit={{ opacity: 0, transition: { duration: 0 } }}
                      className="pointer-events-none absolute top-2 right-2 flex h-4.5 w-4.5 items-center justify-center rounded-full border border-white/70 dark:border-black/40"
                    >
                      <AnimatePresence>
                        {imagesToRemove.includes(img) ? (
                          <m.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1.1, opacity: 1 }}
                            exit={{
                              scale: 0.9,
                              opacity: 0,
                              transition: { duration: 0.1 },
                            }}
                            transition={{
                              type: "spring",
                              duration: 0.25,
                              bounce: 0,
                            }}
                          >
                            <div className="absolute inset-0.5 rounded-full bg-white" />
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="relative size-5 shrink-0 rounded-full text-black"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                className="bg-white"
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM15.5805 9.97493C15.8428 9.65434 15.7955 9.18183 15.4749 8.91953C15.1543 8.65724 14.6818 8.70449 14.4195 9.02507L10.4443 13.8837L9.03033 12.4697C8.73744 12.1768 8.26256 12.1768 7.96967 12.4697C7.67678 12.7626 7.67678 13.2374 7.96967 13.5303L9.96967 15.5303C10.1195 15.6802 10.3257 15.7596 10.5374 15.7491C10.749 15.7385 10.9463 15.6389 11.0805 15.4749L15.5805 9.97493Z"
                                fill="currentColor"
                              />
                            </svg>
                          </m.div>
                        ) : null}
                      </AnimatePresence>
                    </m.div>
                  </button>
                </m.li>
              ))}
            </AnimatePresence>
          </ol>

          {/* Product images controls */}
          <AnimatePresence mode="wait" initial={false}>
            {imagesToRemove.length > 0 && !isSubmitting && (
              <m.div
                key="remove-images-drawer"
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
                className="fixed inset-x-4 bottom-4 z-10 mx-auto h-15 max-w-48 overflow-hidden rounded-xl border border-gray-200 bg-white outline-none md:mx-auto md:w-full dark:border-zinc-800/90 dark:bg-zinc-950 dark:shadow-2xs dark:inset-shadow-xs dark:shadow-zinc-600/10 dark:inset-shadow-zinc-600/20"
              >
                <div className="flex h-full w-full gap-2 p-1.5 text-sm sm:text-xs">
                  <m.button
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => {
                      if (isSubmitting) return;
                      setImagesToRemove([]);
                    }}
                    disabled={isSubmitting}
                    className="flex h-full w-1/2 cursor-pointer flex-col items-center justify-center gap-0.5 rounded-lg bg-gray-50 text-zinc-500 transition-colors duration-200 hover:bg-gray-100 hover:text-zinc-700 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-zinc-500 disabled:opacity-50 dark:bg-zinc-900/50 dark:hover:bg-zinc-900/80 dark:hover:text-zinc-300 dark:disabled:bg-zinc-900/50 dark:disabled:text-zinc-500"
                  >
                    <ArrowUturnLeftIcon className="size-4" />
                    Annulla
                  </m.button>
                  <m.button
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => {
                      if (isSubmitting) return;
                      openDialog({
                        type: "cancel",
                        name: product.name,
                        itemNames: imagesToRemove,
                      });
                    }}
                    disabled={isSubmitting}
                    className="flex h-full w-1/2 cursor-pointer flex-col items-center justify-center gap-0.5 rounded-lg bg-gray-50 text-zinc-500 transition-colors duration-200 hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-zinc-500 disabled:opacity-50 dark:bg-zinc-900/50 dark:text-zinc-500 dark:hover:bg-red-900/30 dark:hover:text-red-500 dark:disabled:bg-zinc-900/50 dark:disabled:text-zinc-400"
                  >
                    <TrashIcon className="size-4" />
                    Elimina
                  </m.button>
                </div>
              </m.div>
            )}
          </AnimatePresence>

          <CustomDialogWrapper
            afterAction={() => setImagesToRemove([])}
            isPending={isSubmitting}
            setIsPending={setIsSubmitting}
          />
        </div>
      ) : (
        <ImageLoader
          imagesToAdd={imagesToAdd}
          setImagesToAdd={setImagesToAdd}
          imagesToRemove={imagesToRemove}
          isSubmitting={isSubmitting}
          setIsSubmitting={setIsSubmitting}
          productId={product.id}
        />
      )}
    </div>
  );
}

export default ProductImagesHandler;
