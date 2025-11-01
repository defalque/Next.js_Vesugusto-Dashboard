import { FaceFrownIcon } from "@heroicons/react/24/outline";
import Button from "./Button";

function PageNotFound({
  title,
  message,
  buttonText,
  href,
}: {
  title: string;
  message: string;
  buttonText: string;
  href: string;
}) {
  return (
    <div className="box-style bg-box rounded-md border">
      <h2 className="box-style border-b p-3 text-center text-xl font-semibold">
        {title}
      </h2>
      <div className="flex flex-col px-10 py-5">
        <FaceFrownIcon className="w-10 self-center text-neutral-500 dark:text-neutral-400" />
        <p className="mt-2 mb-8 text-center text-base text-neutral-500 dark:text-neutral-400">
          {message}
        </p>
        <Button className="self-center px-4 py-2 sm:py-1" href={href}>
          {buttonText}
        </Button>
      </div>
    </div>
  );
}

export default PageNotFound;
