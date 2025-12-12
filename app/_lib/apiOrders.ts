import { createClient } from "@/utils/supabase/server";

import { subDays, subYears } from "date-fns";
import { DateRange, GenericStats } from "./definitions";
import { cache } from "react";

export async function getOrders(
  limit: number,
  filters: {
    page: string | number;
    status: string;
    sort: string;
    query: string;
  },
) {
  const supabase = await createClient();

  const from = (Number(filters.page) - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from("orders")
    .select(
      "id, orderDate, status, users:users!orders_userId_clerkUserId_fkey (image), name, email, totalCost, order_items(productId(name, regularPrice), quantity)",
    )
    .range(from, to);

  if (filters.query) {
    query = query.or(
      `name.ilike.%${filters.query}%,email.ilike.%${filters.query}%`,
    );
  }

  if (filters.status !== "all") {
    query = query.eq("status", filters.status);
  }

  if (filters.sort === "price-asc") {
    query = query.order("totalCost", { ascending: true });
  } else if (filters.sort === "price-desc") {
    query = query.order("totalCost", { ascending: false });
  } else if (filters.sort === "most-recent") {
    query = query.order("created_at", { ascending: false });
  } else if (filters.sort === "less-recent") {
    query = query.order("created_at", { ascending: true });
  } else {
    query = query.order("created_at", { ascending: false });
  }

  const { data: orders, error } = await query;

  if (error) {
    console.error("Non è stato possibile caricare gli ordini: ", error);
    return { orders: orders, error: true };
  }

  const paginatedOrders = orders.map((order) => {
    const normalizedOrderItems = order.order_items.map((item) => ({
      quantity: item.quantity,
      productId: Array.isArray(item.productId)
        ? item.productId[0]
        : item.productId,
    }));

    return {
      ...order,
      userId: Array.isArray(order.users) ? order.users[0] : order.users, // <-- aggiungi questa normalizzazione
      order_items: normalizedOrderItems,
    };
  });

  return { orders: paginatedOrders, error: false };
}

export async function getTotalOrders(filters: {
  page: string | number;
  status: string;
  sort: string;
  query: string;
}) {
  const supabase = await createClient();

  let query = supabase
    .from("orders")
    .select(
      "id, orderDate, status, userId, name, email, totalCost, order_items(productId(name, regularPrice), quantity)",
    );

  if (filters.query) {
    query = query.or(
      `name.ilike.%${filters.query}%,email.ilike.%${filters.query}%`,
    );
  }

  if (filters.status !== "all") {
    query = query.eq("status", filters.status);
  }

  if (filters.sort === "price-asc") {
    query = query.order("totalCost", { ascending: true });
  } else if (filters.sort === "price-desc") {
    query = query.order("totalCost", { ascending: false });
  } else if (filters.sort === "most-recent") {
    query = query.order("created_at", { ascending: false });
  } else if (filters.sort === "less-recent") {
    query = query.order("created_at", { ascending: true });
  } else {
    query = query.order("created_at", { ascending: false });
  }

  const { data: orders, error } = await query;

  if (error) {
    console.error("Non è stato possibile caricare gli ordini: ", error);
    return { count: orders, error: true };
    // throw new Error("Non è stato possibile caricare gli ordini");
  }

  const allOrders = orders.map((order) => {
    // Normalize order_items and unwrap productId
    const normalizedOrderItems = order.order_items.map((item) => ({
      quantity: item.quantity,
      productId: Array.isArray(item.productId)
        ? item.productId[0]
        : item.productId,
    }));

    return {
      ...order,
      order_items: normalizedOrderItems,
    };
  });

  return { count: allOrders.length ?? 0, error: false };
}

export const getOrder = cache(async (id: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("orders")
    .select(
      "id, orderDate, status, users:users!orders_userId_clerkUserId_fkey (image), name, email, totalCost, order_items(productId(name, regularPrice), quantity)",
    )
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("Non è stato possibile caricare l'ordine: ", error);
    throw new Error("Non è stato possibile caricare l'ordine.");
  }

  if (!data) {
    return null;
  }

  const normalizedUserId = Array.isArray(data?.users)
    ? data?.users[0]
    : data?.users;

  const normalizedOrderItems = (data?.order_items ?? []).map((item) => ({
    quantity: item.quantity,
    productId: Array.isArray(item.productId)
      ? item.productId[0]
      : item.productId,
  }));

  return {
    ...data,
    userId: normalizedUserId,
    order_items: normalizedOrderItems,
  };
});

export async function getOrderId(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("orders")
    .select("id")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error(error);
    throw new Error("Non è stato possibile caricare il prodotto.");
    // notFound();
  }

  return data;
}

export async function getFilteredOrders(dateRange: DateRange) {
  const supabase = await createClient();

  let range;
  if (dateRange === "last-7-days") {
    range = subDays(new Date(), 7).toISOString();
  } else if (dateRange === "last-month") {
    range = subDays(new Date(), 30).toISOString();
  } else if (dateRange === "last-year") {
    range = subYears(new Date(), 1).toISOString();
  }
  // const oneYearAgo = subYears(new Date(), 1).toISOString();

  const { data: orders, error } = await supabase
    .from("orders")
    .select("id, orderDate, totalCost, status")
    .gte("created_at", range);
  // .gte("created_at", oneYearAgo);

  if (error) {
    console.error(
      "Non è stato possibile caricare gli ordini dell'ultimo anno: ",
      error,
    );
    return null;
  }

  return orders;
}

export async function getStatsOrders(dateRange: DateRange) {
  const supabase = await createClient();

  const {
    data: orders,
    count: totalCount,
    error: totalError,
  } = await supabase.from("orders").select("totalCost", { count: "exact" });

  if (totalError) {
    console.error(
      "Non è stato possibile caricare il totale degli ordini: ",
      totalError,
    );
    return null;
  }

  let query = supabase.from("orders").select("totalCost", { count: "exact" });

  if (dateRange === "last-7-days") {
    query = query.gte("created_at", subDays(new Date(), 7).toISOString());
  } else if (dateRange === "last-month") {
    query = query.gte("created_at", subDays(new Date(), 30).toISOString());
  } else if (dateRange === "last-year") {
    query = query.gte("created_at", subYears(new Date(), 1).toISOString());
  }

  const {
    data: last7DaysOrders,
    count: last7DaysCount,
    error: last7DaysError,
  } = await query;

  if (last7DaysError) {
    console.error(
      "Non è stato possibile caricare ordini dell'ultima settimana: ",
      last7DaysError,
    );
    return null;
  }

  const ordersRevenues = orders?.reduce(
    (sum, order) => sum + order.totalCost,
    0,
  );

  const last7DaysRevenues = last7DaysOrders?.reduce(
    (sum, order) => sum + order.totalCost,
    0,
  );

  return {
    ordersRevenues: ordersRevenues,
    last7daysRevenues: last7DaysRevenues,
    total: totalCount,
    last7Days: last7DaysCount,
  };
}

export async function getOrdersActivity() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("orders")
    .select(
      "id, users:users!orders_userId_clerkUserId_fkey (image), name, email, orderDate, status, totalCost",
    )
    .order("created_at", { ascending: false })
    .neq("status", "delivered");

  if (error) {
    console.error(
      "Non è stato possibile recuperare gli ordini da gestire: ",
      error,
    );
    return null;
  }

  const fixedOrders = data.map((order) => ({
    ...order,
    users: Array.isArray(order.users) ? order.users[0] : order.users,
  }));

  return fixedOrders;
}

export async function getTopCustomer(dateRange: DateRange) {
  const supabase = await createClient();

  let range;
  if (dateRange === "last-7-days") {
    range = subDays(new Date(), 7).toISOString();
  } else if (dateRange === "last-month") {
    range = subDays(new Date(), 30).toISOString();
  } else if (dateRange === "last-year") {
    range = subYears(new Date(), 1).toISOString();
  }

  const { data, error } = await supabase.rpc("get_top_customer", {
    date_range: range,
  });

  if (error) {
    console.error(
      "Non è stato possibile caricare il cliente con più ordini effettuati:",
      error,
    );
    return null;
  }

  return data;
}

export async function getGenericStats(): Promise<{
  data: GenericStats[] | null;
  error: boolean;
}> {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("get_generic_stats");

  if (error) {
    console.error(
      "Non è stato possibile caricare le statistiche degli ordini:",
      error,
    );
    return { data: null, error: true };
  }

  return { data, error: false };
}
