import { getStatsOrders, getTopCustomer } from "@/app/_lib/apiOrders";
import { getTotalEcommerceUsers } from "@/app/_lib/apiEcommerceUsers";

import OrdersStats from "./OrdersStats";
import UsersStats from "./UsersStats";
import RevenuesStats from "./RevenuesStats";
import CustomersStats from "./CustomersStats";

async function Stats() {
  const ordersData = getStatsOrders();
  const usersData = getTotalEcommerceUsers();
  const customerData = getTopCustomer();

  const [ordersResult, usersResult, customerResult] = await Promise.allSettled([
    ordersData,
    usersData,
    customerData,
  ]);

  const revenues =
    ordersResult.status === "fulfilled" && ordersResult.value
      ? (ordersResult.value.ordersRevenues ?? "Errore")
      : "Errore";

  const last7DaysRevenues =
    ordersResult.status === "fulfilled" && ordersResult.value
      ? (ordersResult.value.last7daysRevenues ?? "Errore")
      : "Errore";

  const totalCount =
    ordersResult.status === "fulfilled" && ordersResult.value
      ? (ordersResult.value.total ?? "Errore")
      : "Errore";

  const last7DaysCount =
    ordersResult.status === "fulfilled" && ordersResult.value
      ? (ordersResult.value.last7Days ?? "Errore")
      : "Errore";

  const users =
    usersResult.status === "fulfilled" && usersResult.value
      ? (usersResult.value.total ?? "Errore")
      : "Errore";

  const last7DaysUsers =
    usersResult.status === "fulfilled" && usersResult.value
      ? (usersResult.value.last7Days ?? "Errore")
      : "Errore";

  const customer =
    customerResult.status === "fulfilled" && customerResult.value
      ? Array.isArray(customerResult.value)
        ? customerResult.value.length > 0
          ? customerResult.value[0]
          : null
        : customerResult.value
      : "Errore";

  return (
    <div className="text-dark dark:text-light grid grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
      <OrdersStats
        title="Ordini totali"
        value={totalCount}
        filteredValue={last7DaysCount}
      />

      <RevenuesStats
        title="Ricavi totali"
        value={revenues}
        filteredValue={last7DaysRevenues}
      />

      <UsersStats
        title="Clienti totali"
        value={users}
        filteredValue={last7DaysUsers}
      />

      <CustomersStats title="Miglior cliente" value={customer} />
    </div>
  );
}

export default Stats;
