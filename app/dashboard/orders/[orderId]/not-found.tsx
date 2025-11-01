import PageNotFound from "@/app/_components/ui/NotFound";

export default function NotFound() {
  return (
    <main className="grid h-full place-content-center">
      <PageNotFound
        title="Ordine non trovato"
        message="Non è stato possibile trovare l'ordine da te selezionato."
        buttonText="Torna agli ordini"
        href="/dashboard/orders"
      />
    </main>
  );
}
