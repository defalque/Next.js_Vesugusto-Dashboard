import {
  BanknotesIcon,
  BriefcaseIcon,
  TrophyIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

import Stat from "./Stat";
import { getStatsOrders, getTopCustomer } from "@/app/_lib/apiOrders";
import { getTotalEcommerceUsers } from "@/app/_lib/apiEcommerceUsers";
import AnimatedStatWrapper from "./AnimatedStatWrapper";

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
    ordersResult.status === "fulfilled" ? ordersResult.value.orders : [];
  const count =
    ordersResult.status === "fulfilled" ? ordersResult.value.count : 0;
  const users = usersResult.status === "fulfilled" ? usersResult.value : 0;
  const customer =
    customerResult.status === "fulfilled" ? customerResult.value : [];
  const { customer_name, customer_email } = customer[0] ?? {};

  const revenues = orders.reduce((sum, val) => sum + val.totalCost, 0);

  return (
    <div className="text-dark dark:text-light flex flex-col justify-between gap-3 lg:flex-row">
      <Stat title="N. Ordini" value={count ?? 0}>
        <div className="bg-brand-100 dark:border-brand-950 dark:bg-brand-950/20 row-span-full flex aspect-square size-15 items-center justify-center rounded-full dark:border">
          <BriefcaseIcon className="text-brand-950 size-8 md:size-10" />
        </div>
      </Stat>

      <AnimatedStatWrapper title="Guadagni" value={revenues} isCurrency={true}>
        <BanknotesIcon className="text-brand-950 size-8 md:size-10" />
      </AnimatedStatWrapper>

      <Stat title="N. Clienti" value={users ?? 0}>
        <div className="bg-brand-100 dark:border-brand-950 dark:bg-brand-950/20 row-span-full flex aspect-square size-15 items-center justify-center rounded-full dark:border">
          <UserCircleIcon className="text-brand-950 size-8 md:size-10" />
        </div>
      </Stat>

      <Stat
        title="Cliente top"
        value={
          <span className="inline-flex flex-col gap-0.5 font-semibold">
            <span className="text-base">{customer_name}</span>
            <span className="text-xs">{customer_email}</span>
          </span>
        }
      >
        <div className="bg-brand-100 dark:border-brand-950 dark:bg-brand-950/20 row-span-full flex aspect-square size-15 items-center justify-center rounded-full dark:border">
          <TrophyIcon className="text-brand-950 size-6 md:size-8" />
        </div>
      </Stat>
    </div>
  );
}

export default Stats;
