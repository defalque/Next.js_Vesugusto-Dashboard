import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";

function EmptyWrapper({
  title,
  subTitle,
  message,
}: {
  title: "Attività ordini" | "Prodotti più venduti";
  subTitle: string;
  message: string;
}) {
  return (
    <div
      className={`${title === "Prodotti più venduti" && "row-span-1 row-start-2 lg:col-start-2"} col-span-full flex flex-col overflow-hidden rounded-md border border-gray-200 bg-gray-50/30 [--box-padding:--spacing(4)] md:overflow-visible lg:col-span-1 dark:border-zinc-700/40 dark:bg-zinc-800/40`}
    >
      <div className="space-y-1 border-b border-gray-200 p-(--box-padding) dark:border-zinc-700/40">
        <h2 className="dark:text-light rounded text-xl font-semibold text-neutral-700">
          {title}
        </h2>
        <p className="text-neutral-500 dark:text-neutral-400">{subTitle}</p>
      </div>
      {/* <div className="-mx-(--box-padding) flex overflow-x-auto md:-mx-0"> */}
      {/* <div className="h-88 grow px-(--box-padding) md:px-0"> */}
      <div className="grid h-88 place-content-center p-(--box-padding)">
        <ChatBubbleBottomCenterTextIcon className="mx-auto size-15 text-neutral-500 dark:text-neutral-400" />
        <span className="mt-4 text-neutral-500 dark:text-neutral-400">
          {message}
        </span>
      </div>
      {/* </div> */}
      {/* </div> */}
    </div>
  );
}

export default EmptyWrapper;
