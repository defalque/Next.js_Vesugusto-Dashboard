import { getOrdersActivity } from "@/app/_lib/apiOrders";
import EmptyWrapper from "./EmptyWrapper";
import ErrorWrapper from "./ErrorWrapper";
import LazyOrdersActivity from "./LazyOrdersActivity";

// const DUMMY = [
//   {
//     id: 101,
//     name: "Giulia Rossi",
//     email: "giulia.rossi@example.com",
//     orderDate: "2025-10-25",
//     status: "ready",
//     totalCost: 3200,
//     userId: {
//       image:
//         "https://lh3.googleusercontent.com/a/ACg8ocJqHLN8d_awAgdLYVW6TD1FhK38BHvBu0Uo99JCejJX0QOs4g=s96-c",
//     },
//   },
//   {
//     id: 102,
//     name: "Luca Bianchi",
//     email: "luca.bianchi@example.com",
//     orderDate: "2025-10-23",
//     status: "ready",
//     totalCost: 4500,
//     userId: {
//       image:
//         "https://lh3.googleusercontent.com/a/ACg8ocJqHLN8d_awAgdLYVW6TD1FhK38BHvBu0Uo99JCejJX0QOs4g=s96-c",
//     },
//   },
//   {
//     id: 103,
//     name: "Sara Conti",
//     email: "sara.conti@example.com",
//     orderDate: "2025-10-21",
//     status: "unconfirmed",
//     totalCost: 2800,
//     userId: {
//       image:
//         "https://lh3.googleusercontent.com/a/ACg8ocJqHLN8d_awAgdLYVW6TD1FhK38BHvBu0Uo99JCejJX0QOs4g=s96-c",
//     },
//   },
//   {
//     id: 104,
//     name: "Davide Greco",
//     email: "davide.greco@example.com",
//     orderDate: "2025-10-20",
//     status: "ready",
//     totalCost: 5100,
//     userId: {
//       image:
//         "https://lh3.googleusercontent.com/a/ACg8ocJqHLN8d_awAgdLYVW6TD1FhK38BHvBu0Uo99JCejJX0QOs4g=s96-c",
//     },
//   },
//   {
//     id: 105,
//     name: "Chiara Romano",
//     email: "chiara.romano@example.com",
//     orderDate: "2025-10-19",
//     status: "unconfirmed",
//     totalCost: 3600,
//     userId: {
//       image:
//         "https://lh3.googleusercontent.com/a/ACg8ocJqHLN8d_awAgdLYVW6TD1FhK38BHvBu0Uo99JCejJX0QOs4g=s96-c",
//     },
//   },
//   {
//     id: 106,
//     name: "Francesco Gallo",
//     email: "francesco.gallo@example.com",
//     orderDate: "2025-10-18",
//     status: "ready",
//     totalCost: 4000,
//     userId: {
//       image:
//         "https://lh3.googleusercontent.com/a/ACg8ocJqHLN8d_awAgdLYVW6TD1FhK38BHvBu0Uo99JCejJX0QOs4g=s96-c",
//     },
//   },
//   {
//     id: 107,
//     name: "Martina Esposito",
//     email: "martina.esposito@example.com",
//     orderDate: "2025-10-16",
//     status: "ready",
//     totalCost: 2700,
//     userId: {
//       image:
//         "https://lh3.googleusercontent.com/a/ACg8ocJqHLN8d_awAgdLYVW6TD1FhK38BHvBu0Uo99JCejJX0QOs4g=s96-c",
//     },
//   },
//   {
//     id: 108,
//     name: "Paolo Ricci",
//     email: "paolo.ricci@example.com",
//     orderDate: "2025-10-15",
//     status: "unconfirmed",
//     totalCost: 5200,
//     userId: {
//       image:
//         "https://lh3.googleusercontent.com/a/ACg8ocJqHLN8d_awAgdLYVW6TD1FhK38BHvBu0Uo99JCejJX0QOs4g=s96-c",
//     },
//   },
//   {
//     id: 109,
//     name: "Elena Ferri",
//     email: "elena.ferri@example.com",
//     orderDate: "2025-10-14",
//     status: "ready",
//     totalCost: 3100,
//     userId: {
//       image:
//         "https://lh3.googleusercontent.com/a/ACg8ocJqHLN8d_awAgdLYVW6TD1FhK38BHvBu0Uo99JCejJX0QOs4g=s96-c",
//     },
//   },
//   {
//     id: 110,
//     name: "Matteo Rizzo",
//     email: "matteo.rizzo@example.com",
//     orderDate: "2025-10-12",
//     status: "ready",
//     totalCost: 5900,
//     userId: {
//       image:
//         "https://lh3.googleusercontent.com/a/ACg8ocJqHLN8d_awAgdLYVW6TD1FhK38BHvBu0Uo99JCejJX0QOs4g=s96-c",
//     },
//   },
// ];

async function OrdersActivityWrapper() {
  const orders = await getOrdersActivity();

  if (!orders) {
    return (
      <ErrorWrapper
        title="Attività ordini"
        subTitle="Gestisci gli ordini ancora in attesa di conferma e preparali per la consegna."
        message="Non è stato possibile caricare gli ordini da gestire."
      />
    );
  }

  if (orders.length === 0) {
    return (
      <EmptyWrapper
        title="Attività ordini"
        subTitle="Gestisci gli ordini ancora in attesa di conferma e preparali per la consegna."
        message="Nessun ordine da gestire al momento."
      />
    );
  }

  return (
    <div
      className={`relative col-span-full flex flex-col overflow-hidden rounded-md border border-gray-200 bg-gray-50/30 [--box-padding:--spacing(4)] md:overflow-clip lg:col-span-1 dark:border-zinc-700/40 dark:bg-zinc-800/40`}
    >
      <div className="space-y-1 border-b border-gray-200 p-(--box-padding) dark:border-zinc-700/40">
        <h2 className="dark:text-light rounded text-xl font-semibold text-neutral-700">
          Attività ordini
        </h2>
        <p className="text-neutral-500 dark:text-neutral-400">
          Gestisci gli ordini in attesa di conferma e preparali per la consegna.
        </p>
      </div>

      <LazyOrdersActivity orders={orders} />
    </div>
  );
}

export default OrdersActivityWrapper;
