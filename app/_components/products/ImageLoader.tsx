import { addProductImages } from "@/app/_lib/server-actions";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { AnimatePresence } from "motion/react";
import { toast } from "sonner";
import * as m from "motion/react-m";

function ImageLoader({
  imagesToAdd,
  setImagesToAdd,
  imagesToRemove,
  isSubmitting,
  setIsSubmitting,
  productId,
}: {
  imagesToAdd: File[];
  setImagesToAdd: (images: File[]) => void;
  imagesToRemove: string[];
  isSubmitting: boolean;
  setIsSubmitting: (isSubmitting: boolean) => void;
  productId: number;
}) {
  const handleAddProductImages = (e: React.FormEvent<HTMLFormElement>) => {
    if (isSubmitting) return;
    e.preventDefault(); // Blocca il reload della pagina

    setIsSubmitting(true);

    if (imagesToAdd.length === 0) {
      toast.error("Nessuna immagine selezionata.");
      setIsSubmitting(false);
      setImagesToAdd([]);
      return;
    }

    const formData = new FormData();
    imagesToAdd.forEach((file) => {
      formData.append("images", file);
    });

    toast.promise(addProductImages(productId, formData), {
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
        setImagesToAdd([]);
      },
    });
  };
  const handleFileSelect = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const fileArray = Array.from(files);
    setImagesToAdd([...imagesToAdd, ...fileArray]);
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
    <form onSubmit={handleAddProductImages}>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`flex min-h-40 min-w-full justify-center rounded-lg border border-dashed border-pink-500 bg-pink-50/50 p-5 sm:w-sm dark:border-indigo-500 dark:bg-indigo-950/20 ${isSubmitting || (imagesToRemove && imagesToRemove.length > 0) ? "cursor-not-allowed opacity-50" : ""}`}
      >
        <AnimatePresence mode="wait" initial={false}>
          {imagesToAdd.length === 0 && (
            <m.div
              key="image-loader-empty"
              initial={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
              className="text-center"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                data-slot="icon"
                aria-hidden="true"
                className="mx-auto size-12 text-pink-700/40 dark:text-indigo-500/60"
              >
                <path
                  d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                />
              </svg>
              <div className="mt-4 flex flex-wrap justify-center text-center text-[15px] text-pink-700/60 sm:text-sm/6 dark:text-indigo-500/80">
                <label
                  htmlFor="file-upload"
                  className={`touch-hitbox relative rounded-md bg-transparent font-semibold text-pink-600 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-pink-600 dark:text-indigo-400 dark:focus-within:outline-indigo-400 ${
                    imagesToAdd.length > 0 ||
                    isSubmitting ||
                    (imagesToRemove && imagesToRemove.length > 0)
                      ? "cursor-not-allowed opacity-50"
                      : "cursor-pointer hover:text-pink-500 dark:hover:text-indigo-300"
                  }`}
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
                    disabled={
                      imagesToAdd.length > 0 ||
                      isSubmitting ||
                      (imagesToRemove && imagesToRemove.length > 0)
                    }
                  />
                </label>
                <p className="pl-1 pointer-coarse:hidden pointer-fine:block">
                  o trascinale e rilasciale
                </p>
              </div>
              <p className="mt-1 text-sm text-pink-700/60 sm:mt-0 sm:text-xs/5 dark:text-indigo-500/80">
                PNG, JPG, GIF fino a 1MB
              </p>
            </m.div>
          )}
          {imagesToAdd.length > 0 && (
            <m.div
              key="image-loader-images"
              initial={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
              className="flex flex-col items-center justify-center gap-4"
            >
              <div className="flex flex-wrap items-center justify-center gap-1">
                {imagesToAdd.map((image, i) => (
                  <div
                    key={image.name + i}
                    className={`flex items-center justify-center gap-1 rounded-lg border border-pink-200 py-0.5 pr-2 pl-1 text-pink-700/80 hover:bg-pink-100/50 dark:border-indigo-700/40 dark:text-indigo-400/80 dark:hover:bg-indigo-950/60 ${isSubmitting ? "cursor-not-allowed opacity-50" : ""}`}
                  >
                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={() => {
                        setImagesToAdd(
                          imagesToAdd.filter(
                            (file) => file.name !== image.name,
                          ),
                        );
                      }}
                      className="touch-hitbox cursor-pointer rounded-lg p-0.5 hover:bg-pink-200/50 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-zinc-900"
                    >
                      <XMarkIcon className="size-4.5" />
                    </button>
                    <span className="text-sm font-semibold">{image.name}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="touch-hitbox flex cursor-pointer items-center justify-center rounded-lg border border-inherit bg-pink-500 px-3 py-2 text-sm font-semibold text-white inset-shadow-2xs transition-colors duration-200 hover:bg-pink-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700/40 dark:bg-indigo-700 dark:shadow-sm dark:inset-shadow-white/20 dark:hover:bg-indigo-600"
                  disabled={isSubmitting}
                >
                  Aggiungi
                </button>
                <button
                  type="button"
                  onClick={() => setImagesToAdd([])}
                  className="touch-hitbox _dark:border-zinc-700/40 flex cursor-pointer items-center justify-center rounded-lg border border-pink-100 bg-pink-100 px-3 py-2 text-sm font-semibold text-pink-500 inset-shadow-2xs transition-colors duration-200 hover:bg-pink-200 disabled:cursor-not-allowed disabled:opacity-50 dark:border-indigo-950/50 dark:bg-indigo-950/50 dark:text-indigo-500 dark:shadow-sm dark:inset-shadow-white/20 dark:hover:bg-indigo-950"
                  disabled={isSubmitting}
                >
                  Cancella tutto
                </button>
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}

export default ImageLoader;
