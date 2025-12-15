import { XMarkIcon } from "@heroicons/react/24/outline";

function ImageLoaderInput({
  imagesToAdd,
  setImagesToAdd,
  isSubmitting,
}: {
  imagesToAdd: File[];
  setImagesToAdd: (images: File[]) => void;
  isSubmitting: boolean;
}) {
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
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={`flex min-h-[154px] w-full justify-center rounded-lg border border-dashed border-neutral-400 bg-neutral-50/50 p-5 dark:border-zinc-500 dark:bg-zinc-950/20`}
    >
      {imagesToAdd.length === 0 && (
        <div className="text-center">
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            data-slot="icon"
            aria-hidden="true"
            className="mx-auto size-12 text-neutral-700/40 dark:text-zinc-500/60"
          >
            <path
              d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
              clipRule="evenodd"
              fillRule="evenodd"
            />
          </svg>
          <div className="mt-4 flex flex-wrap justify-center text-center text-[15px] text-neutral-700/60 sm:text-sm/6 dark:text-zinc-500/80">
            <label
              htmlFor="file-upload"
              className={`touch-hitbox relative rounded-md bg-transparent text-sm font-semibold text-neutral-500 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-neutral-500 dark:text-zinc-400 dark:focus-within:outline-zinc-400 ${"cursor-pointer hover:text-neutral-600 dark:hover:text-zinc-300"}`}
            >
              <span className="underline">Carica una o più immagini</span>
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
              />
            </label>
            <p className="pl-1 text-sm pointer-coarse:hidden pointer-fine:block">
              o trascinale e rilasciale
            </p>
          </div>
          <p className="mt-1 text-sm text-neutral-700/60 dark:text-zinc-500/80">
            PNG, JPG, GIF fino a 1MB
          </p>
        </div>
      )}
      {imagesToAdd.length > 0 && (
        <div className="flex flex-col items-center justify-center gap-4">
          <ul className="flex flex-wrap items-center justify-center gap-1">
            {imagesToAdd.map((image) => (
              <li
                key={image.name}
                className={`flex items-center justify-center gap-1 rounded-lg border border-neutral-300 py-0.5 pr-2 pl-1 text-neutral-700/80 hover:bg-neutral-100/50 dark:border-zinc-700/90 dark:text-zinc-400/86 dark:hover:bg-zinc-950/60 ${isSubmitting ? "cursor-not-allowed opacity-50" : ""}`}
              >
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => {
                    setImagesToAdd(
                      imagesToAdd.filter((file) => file.name !== image.name),
                    );
                  }}
                  className="touch-hitbox cursor-pointer rounded-lg p-0.5 hover:bg-neutral-200/50 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-zinc-900"
                >
                  <XMarkIcon className="size-4.5" />
                </button>
                <span className="text-xs font-semibold">{image.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ImageLoaderInput;
