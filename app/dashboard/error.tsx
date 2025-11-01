"use client";

import Button from "@/app/_components/ui/Button";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="dark:text-light grid h-full place-content-center text-neutral-700">
      <div className="bg-box box-style rounded-md border">
        <h2 className="box-style rounded border-b p-3 text-center text-xl font-semibold">
          Errore imprevisto
        </h2>
        <div className="flex flex-col gap-4 py-5">
          <p className="px-10 text-center text-base">
            Qualcosa è andato storto.
          </p>
          <Button
            className="group flex items-center gap-2 self-center px-4 py-1.5"
            onClick={
              // Attempt to recover by trying to re-render the invoices route
              () => reset()
            }
          >
            Riprova
            <ArrowPathIcon className="size-4 transition-transform duration-300 ease-out group-hover:rotate-180" />
          </Button>
        </div>
      </div>
    </main>
  );
}
