import { format, subMonths, differenceInDays, startOfToday } from "date-fns";
import { it } from "date-fns/locale";

export function formatCurrency(amount: number): string {
  return (amount / 100).toLocaleString("it-IT", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;

  const today = startOfToday();
  const dateStart = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  );
  const daysDiff = differenceInDays(today, dateStart);

  if (daysDiff === 0) {
    return "Oggi";
  } else if (daysDiff === 1) {
    return "Ieri";
  } else if (daysDiff > 1 && daysDiff <= 7) {
    return `${daysDiff} giorni fa`;
  } else {
    const formatted = format(date, "d MMM, yyyy", { locale: it });
    const spaceIndex = formatted.indexOf(" ");
    if (spaceIndex !== -1) {
      return (
        formatted.substring(0, spaceIndex + 1) +
        capitalize(formatted.substring(spaceIndex + 1))
      );
    }
    return formatted;
  }
}

export function formatType(type: string): string {
  switch (type) {
    case "food":
      return "Cibo";
    case "drink":
      return "Bevanda";
    default:
      return type;
  }
}

export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

// export function prepareOrdersChartData(
//   orders: {
//     id: number;
//     orderDate: string;
//     totalCost?: number;
//     status?: string;
//   }[],
// ) {
//   const totalRevenuesByMonthYear = orders.reduce(
//     (acc, order) => {
//       const date = new Date(order.orderDate);
//       const key = format(date, "yyyy-MM");
//       acc[key] =
//         (acc[key] || 0) + (order.totalCost ? order.totalCost / 100 : 1);
//       return acc;
//     },
//     {} as Record<string, number>,
//   );

//   const now = new Date();

//   // Crea array con gli ultimi 12 mesi da 12 mesi fa a oggi
//   const monthsArray = [];
//   for (let i = 11; i >= 0; i--) {
//     const date = subMonths(now, i);
//     monthsArray.push(date);
//   }

//   const monthlyData = monthsArray.map((date) => {
//     const key = format(date, "yyyy-MM");
//     const monthAbbrev = format(date, "MMM", { locale: it });

//     return {
//       month: monthAbbrev.charAt(0).toUpperCase() + monthAbbrev.slice(1),
//       orderCount: totalRevenuesByMonthYear[key] || 0,
//       fullDate: date,
//     };
//   });

//   return monthlyData;
// }

export function prepareOrdersChartData(
  orders: {
    id: number;
    orderDate: string;
    totalCost?: number;
    status?: string;
  }[],
) {
  const totalRevenuesByMonthYear: Record<string, number> = {};
  const statusCountsByMonthYear: Record<
    string,
    { delivered: number; ready: number; unconfirmed: number }
  > = {};

  orders.forEach((order) => {
    const date = new Date(order.orderDate);
    const key = format(date, "yyyy-MM");

    // Totale ricavi
    totalRevenuesByMonthYear[key] =
      (totalRevenuesByMonthYear[key] || 0) +
      (order.totalCost ? order.totalCost / 100 : 1);

    // Conta gli status
    if (!statusCountsByMonthYear[key]) {
      statusCountsByMonthYear[key] = { delivered: 0, ready: 0, unconfirmed: 0 };
    }

    const status = order.status?.toLowerCase();
    if (
      status === "delivered" ||
      status === "ready" ||
      status === "unconfirmed"
    ) {
      statusCountsByMonthYear[key][status]++;
    }
  });

  const now = new Date();

  const monthsArray = [];
  for (let i = 11; i >= 0; i--) {
    monthsArray.push(subMonths(now, i));
  }

  const monthlyData = monthsArray.map((date) => {
    const key = format(date, "yyyy-MM");
    const monthAbbrev = format(date, "MMMM", { locale: it });
    const capitalizedMonth =
      monthAbbrev.charAt(0).toUpperCase() + monthAbbrev.slice(1);

    const statusCounts = statusCountsByMonthYear[key] || {
      delivered: 0,
      ready: 0,
      unconfirmed: 0,
    };

    return {
      month: capitalizedMonth,
      orderCount: totalRevenuesByMonthYear[key] || 0,
      fullDate: date,
      statusCounts, // ← nuovo campo: { delivered, ready, done }
    };
  });

  return monthlyData;
}
