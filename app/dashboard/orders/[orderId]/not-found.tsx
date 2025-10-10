import { FaceFrownIcon } from "@heroicons/react/24/outline";
import Button from "@/app/_components/ui/Button";

export default function NotFound() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-2">
      <FaceFrownIcon className="w-10 text-gray-400" />
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <p>Non è stato possibile trovare l&apos;ordine da te selezionato.</p>
      <Button className="px-4" href="/dashboard/orders">
        Torna agli ordini
      </Button>
    </main>
  );
}
