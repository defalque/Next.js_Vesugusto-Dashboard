import { Product } from "@/app/_lib/definitions";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import MiniImageButton from "./MiniImageButton";
import ImageBox from "./ImageBox";
import IconButton from "./IconButton";
import SelectedImageContextProvider from "@/app/_contexts/SelectedImageContext";
import DialogContextProvider from "@/app/_contexts/DialogContext";
import CustomDialogWrapper from "../ui/dialog/CustomDialogWrapper";
import AddProductImageButton from "./AddProductImageButton";
import CancelProductImageButton from "./CancelProductImageButton";
import SafeImage from "../ui/SafeImage";

function ProductImage({ product }: { product: Product }) {
  return (
    <div className="flex flex-col-reverse items-center gap-y-2 lg:flex-row lg:items-start lg:gap-x-5">
      <SelectedImageContextProvider
        key={product.image.length}
        images={product.image}
      >
        <DialogContextProvider>
          <div className="flex w-full flex-col gap-y-4 lg:sticky lg:top-5 lg:w-fit lg:items-center">
            {product.image.length > 0 && (
              <div className="hidden w-full flex-col items-center gap-4 lg:flex">
                {product.image.map((img, index) => (
                  <MiniImageButton key={index + 1} index={index}>
                    <SafeImage
                      src={img}
                      alt={`Immagine ${index + 1} di ${product.name}`}
                      fill
                      placeholder="blur"
                      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8L8VQDwAE0wGaYyyo1gAAAABJRU5ErkJggg=="
                      quality={80}
                      priority={false}
                      sizes="2.75rem"
                      className={`dark:shadow-primary-dark-700 object-cover dark:shadow-sm dark:brightness-80`}
                    />
                  </MiniImageButton>
                ))}
              </div>
            )}
            <AddProductImageButton id={product.id}>
              <span className="hidden lg:block">Aggiungi</span>
              <span className="block lg:hidden">Aggiungi immagine/i</span>
            </AddProductImageButton>
          </div>

          <div className="_h-auto relative flex aspect-2/3 w-full text-center lg:sticky lg:top-5">
            {product.image.length === 0 && (
              <span>Nessuna immagine presente.</span>
            )}
            {product.image.length > 0 &&
              product.image.map((img, index) => (
                <ImageBox key={index + 1} index={index}>
                  <SafeImage
                    src={img}
                    alt={`${product.name}-${index + 1}`}
                    fill
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8L8VQDwAE0wGaYyyo1gAAAABJRU5ErkJggg=="
                    quality={80}
                    priority={index === 0 ? true : false}
                    sizes="(max-width: 64rem) 100vw, 66vw"
                    className="dark:shadow-dark-100 object-cover dark:shadow-sm dark:brightness-80"
                  />
                </ImageBox>
              ))}
            {product.image.length > 0 && (
              <CancelProductImageButton name={product.name}>
                Elimina
              </CancelProductImageButton>
            )}

            {product.image && product.image.length > 1 && (
              <div className="absolute top-1/2 right-0 left-0 flex -translate-y-1/2 transform justify-between px-4">
                <IconButton
                  title="Immagine precedente"
                  length={product.image.length}
                >
                  <ChevronLeftIcon
                    aria-hidden="true"
                    className="text-primary-50 size-10"
                  />
                </IconButton>

                <IconButton
                  title="Prossima immagine"
                  length={product.image.length}
                >
                  <ChevronRightIcon
                    aria-hidden="true"
                    className="text-primary-900 size-10"
                  />
                </IconButton>
              </div>
            )}
          </div>

          <CustomDialogWrapper />
        </DialogContextProvider>
      </SelectedImageContextProvider>
    </div>
  );
}

export default ProductImage;
