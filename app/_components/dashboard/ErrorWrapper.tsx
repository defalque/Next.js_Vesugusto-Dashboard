import { FaceFrownIcon } from "@heroicons/react/24/outline";

function ErrorWrapper({
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
      <div className="grid h-88 place-content-center p-(--box-padding)">
        <FaceFrownIcon className="mx-auto size-10 text-neutral-500 dark:text-neutral-400" />
        <span className="mx-auto mt-4 text-center text-xs text-neutral-500 sm:text-sm dark:text-neutral-400">
          {message}
        </span>
        <span className="mx-auto text-center text-xs text-neutral-500 sm:text-sm dark:text-neutral-400">
          Riprova più tardi.
        </span>
      </div>
    </div>
  );
}

export default ErrorWrapper;

// return (
//   <div
//     className={`col-span-full flex flex-col overflow-hidden rounded-md border border-gray-200 bg-gray-50/30 [--box-padding:--spacing(4)] md:overflow-visible lg:col-span-1 dark:border-zinc-700/40 dark:bg-zinc-800/40`}
//   >
//     <div className="space-y-1 border-b border-gray-200 p-(--box-padding) dark:border-zinc-700/40">
//       <h2 className="dark:text-light rounded text-xl font-semibold text-neutral-700">
//         Attività ordini
//       </h2>
//       <p className="text-neutral-500 dark:text-neutral-400">
//         Gestisci gli ordini in attesa di conferma e preparali per la
//         consegna.
//       </p>
//     </div>
//     <div className="-mx-(--box-padding) flex overflow-x-auto md:-mx-0">
//       <div className="h-88 grow px-(--box-padding) md:px-0">
//         <div className="grid h-full place-content-center">
//           <FaceFrownIcon className="mx-auto size-10 text-neutral-500 dark:text-neutral-400" />
//           <span className="mt-4 text-center text-neutral-500 dark:text-neutral-400">
//             Non è stato possibile recuperare gli ordini da gestire.
//           </span>
//         </div>
//       </div>
//     </div>
//   </div>
// );

// return (
//   <div
//     className={`col-span-full row-span-1 row-start-2 flex flex-col rounded-md border border-gray-200 bg-gray-50/30 [--box-padding:--spacing(4)] lg:col-start-2 dark:border-zinc-700/40 dark:bg-zinc-800/40`}
//   >
//     <div className="space-y-1 border-b border-gray-200 p-(--box-padding) dark:border-zinc-700/40">
//       <h2 className="dark:text-light rounded text-xl font-semibold text-neutral-700">
//         Prodotti più venduti
//       </h2>
//       <p className="text-neutral-500 dark:text-neutral-400">
//         Visualizza i prodotti che hanno riscosso più successo tra i nostri
//         clienti.
//       </p>
//     </div>
//     <div className="grid h-full place-content-center px-(--box-padding)">
//       <FaceFrownIcon className="mx-auto size-10 text-neutral-500 dark:text-neutral-400" />
//       <span className="mt-4 text-center text-neutral-500 dark:text-neutral-400">
//         Non è stato possibile recuperare i prodotti più venduti.
//       </span>
//     </div>
//   </div>
// );
