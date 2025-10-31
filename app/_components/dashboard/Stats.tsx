import {
  BanknotesIcon,
  StarIcon,
  Square3Stack3DIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

import AnimatedStatWrapper from "./AnimatedStatWrapper";
import Stat from "./Stat";

import { getStatsOrders, getTopCustomer } from "@/app/_lib/apiOrders";
import { getTotalEcommerceUsers } from "@/app/_lib/apiEcommerceUsers";

async function Stats() {
  const ordersData = getStatsOrders();
  const usersData = getTotalEcommerceUsers();
  const customerData = getTopCustomer();

  const [ordersResult, usersResult, customerResult] = await Promise.allSettled([
    ordersData,
    usersData,
    customerData,
  ]);

  const orders =
    ordersResult.status === "fulfilled" && ordersResult.value
      ? ordersResult.value.orders
      : [];
  const revenues =
    orders && orders.reduce((sum, val) => sum + val.totalCost, 0);

  const count =
    ordersResult.status === "fulfilled" && ordersResult.value
      ? ordersResult.value.count
      : "Errore";

  const users =
    usersResult.status === "fulfilled" && usersResult.value
      ? usersResult.value
      : "Errore";

  const customer =
    customerResult.status === "fulfilled" && customerResult.value
      ? customerResult.value
      : [];
  const { customer_name, customer_email } = customer[0] ?? {
    customer_name: "Errore",
    customer_email: "Errore nel recupero dati",
  };

  return (
    <div className="text-dark dark:text-light grid grid-cols-2 grid-rows-3 justify-between gap-3 md:grid-rows-2 lg:flex lg:flex-row lg:flex-wrap">
      <Stat title="Ordini" value={count} position="row-start-2 md:row-start-1">
        <div className="bg-brand-950 dark:border-brand-950 dark:bg-brand-dark-600 row-span-full flex aspect-square size-15 items-center justify-center rounded-full dark:border">
          <Square3Stack3DIcon className="dark:text-brand-950 text-light size-9 sm:size-8 md:size-10" />
        </div>
      </Stat>

      {revenues ? (
        <AnimatedStatWrapper
          title="Ricavi"
          value={revenues}
          position="row-start-1 col-span-full md:col-span-1"
        >
          <BanknotesIcon className="dark:text-brand-950 text-light size-9 sm:size-8 md:size-10" />
        </AnimatedStatWrapper>
      ) : (
        <Stat
          title="Ricavi"
          value="Errore"
          position="row-start-1 col-span-full md:col-span-1"
        >
          <div className="bg-brand-950 dark:border-brand-950 dark:bg-brand-dark-600 row-span-full flex aspect-square size-15 items-center justify-center rounded-full dark:border">
            <BanknotesIcon className="dark:text-brand-950 text-light size-9 sm:size-8 md:size-10" />
          </div>
        </Stat>
      )}

      <Stat title="Clienti" value={users ?? 0} position="row-start-2">
        <div className="bg-brand-950 dark:border-brand-950 dark:bg-brand-dark-600 row-span-full flex aspect-square size-15 items-center justify-center rounded-full dark:border">
          <UserGroupIcon className="dark:text-brand-950 text-light size-9 sm:size-8 md:size-10" />
        </div>
      </Stat>

      <Stat
        title="Cliente top"
        value={
          <span className="flex flex-col gap-0.5">
            <span className="text-base font-semibold">{customer_name}</span>
            <span className="text-xs text-neutral-500 dark:text-neutral-400">
              {customer_email}
            </span>
          </span>
        }
        position="row-start-3 col-span-full md:row-start-2 md:col-span-1"
      >
        <div className="bg-brand-950 dark:border-brand-950 dark:bg-brand-dark-600 row-span-full flex aspect-square size-15 items-center justify-center rounded-full dark:border">
          <StarIcon className="dark:text-brand-950 text-light size-10 sm:size-8 md:size-10" />
        </div>
      </Stat>
    </div>
  );
}

export default Stats;
