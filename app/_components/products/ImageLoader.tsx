import { addProductImages } from "@/app/_lib/server-actions";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { toast } from "sonner";

function ImageLoader({
  selectedImages,
  setSelectedImages,
  removedImages,
  isSubmitting,
  setIsSubmitting,
  productId,
}: {
  selectedImages: File[];
  setSelectedImages: (images: File[]) => void;
  removedImages?: string[];
  isSubmitting: boolean;
  setIsSubmitting: (isSubmitting: boolean) => void;
  productId: number;
}) {
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
        setSelectedImages([]);
      },
    });
  };
  const handleFileSelect = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const fileArray = Array.from(files);
    setSelectedImages([...selectedImages, ...fileArray]);
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
        className="flex min-h-40 min-w-full justify-center rounded-lg border border-dashed border-gray-900/25 p-5 sm:w-sm dark:border-white/30"
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
                className={`touch-hitbox relative rounded-md bg-transparent font-semibold text-pink-600 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-pink-600 dark:text-indigo-400 dark:focus-within:outline-indigo-400 ${
                  selectedImages.length > 0 ||
                  isSubmitting ||
                  (removedImages && removedImages.length > 0)
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
                    selectedImages.length > 0 ||
                    isSubmitting ||
                    (removedImages && removedImages.length > 0)
                  }
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
                  className={`dark:text-light/80 flex items-center justify-center gap-1 rounded-lg border border-gray-200 py-0.5 pr-2 pl-1 text-neutral-700/80 dark:border-zinc-700/40 dark:hover:bg-zinc-800/90 ${isSubmitting ? "cursor-not-allowed opacity-50" : ""}`}
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
                  <span className="text-sm font-semibold">{image.name}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                className="touch-hitbox flex cursor-pointer items-center justify-center rounded-lg border border-inherit bg-lime-500 px-3 py-2 text-sm font-semibold text-white inset-shadow-2xs transition-colors duration-200 hover:bg-lime-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700/40 dark:bg-lime-700 dark:shadow-sm dark:inset-shadow-white/20 dark:hover:bg-lime-600"
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
  );
}

export default ImageLoader;
