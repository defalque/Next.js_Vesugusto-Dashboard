import {
  format,
  differenceInDays,
  startOfToday,
  subDays,
  startOfDay,
  subMonths,
  startOfMonth,
} from "date-fns";
import { it } from "date-fns/locale";
import { ChartOrders } from "./definitions";

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

export function prepareOrdersChartData(
  type: "orders" | "revenues",
  filter: "last-7-days" | "last-month" | "last-year",
  orders: ChartOrders[],
) {
  const today = startOfToday();
  const daysArray: Date[] = [];
  let dateFormat: string;
  let valueFormat: string;

  if (filter === "last-7-days") {
    for (let i = 6; i >= 0; i--) {
      daysArray.push(startOfDay(subDays(today, i)));
    }
    dateFormat = "yyyy-MM-dd";
    valueFormat = "EEE";
  } else if (filter === "last-month") {
    for (let i = 29; i >= 0; i--) {
      daysArray.push(startOfDay(subDays(today, i)));
    }
    dateFormat = "yyyy-MM-dd";
    valueFormat = "d MMM";
  } else if (filter === "last-year") {
    for (let i = 11; i >= 0; i--) {
      daysArray.push(startOfMonth(subMonths(today, i)));
    }
    dateFormat = "yyyy-MM";
    valueFormat = "MMM";
  }

  // Group orders by day and sum totalCost
  const revenues: Record<string, number> = {};
  const ordersCount: Record<string, number> = {};
  const statusCountsByFilter: Record<
    string,
    { delivered: number; ready: number; unconfirmed: number }
  > = {};

  const startDate = daysArray[0];
  const endDate = daysArray[daysArray.length - 1];

  orders.forEach((order) => {
    const orderDateObj = new Date(order.orderDate);
    // For "last-year" filter, use month-level grouping; otherwise use day-level
    const orderDate =
      filter === "last-year"
        ? startOfMonth(orderDateObj)
        : startOfDay(orderDateObj);
    const dayKey = format(orderDate, dateFormat);

    // Only include orders within the filter range
    if (orderDate >= startDate && orderDate <= endDate) {
      revenues[dayKey] =
        (revenues[dayKey] || 0) + (order.totalCost ? order.totalCost / 100 : 0);

      ordersCount[dayKey] = (ordersCount[dayKey] || 0) + 1;

      // Conta gli status
      if (!statusCountsByFilter[dayKey]) {
        statusCountsByFilter[dayKey] = {
          delivered: 0,
          ready: 0,
          unconfirmed: 0,
        };
      }

      const status = order.status?.toLowerCase();
      if (
        status === "delivered" ||
        status === "ready" ||
        status === "unconfirmed"
      ) {
        statusCountsByFilter[dayKey][status]++;
      }
    }
  });

  // Map days array to chart data format
  const dailyData = daysArray.map((date) => {
    const dayKey = format(date, dateFormat);
    const value = capitalize(format(date, valueFormat, { locale: it }));

    return {
      value,
      totalRevenues: type === "revenues" ? (revenues[dayKey] ?? 0) : undefined,
      totalOrders: type === "orders" ? (ordersCount[dayKey] ?? 0) : undefined,
      fullDate: date,
      statusCounts: statusCountsByFilter[dayKey] || {
        delivered: 0,
        ready: 0,
        unconfirmed: 0,
      },
    };
  });

  return dailyData;
}
