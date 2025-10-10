"use client";

import Button from "@/app/_components/ui/Button";
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
    <main className="flex h-full flex-col items-center justify-center gap-3">
      <h2 className="text-center text-2xl">Qualcosa è andato storto! 😓</h2>
      <Button
        className="px-4"
        onClick={
          // Attempt to recover by trying to re-render the invoices route
          () => reset()
        }
      >
        Riprova
      </Button>
    </main>
  );
}
