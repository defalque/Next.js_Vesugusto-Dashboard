import { createClient } from "@/utils/supabase/server";

import { OrdersInfo } from "./definitions";
import { subMonths, format, startOfDay, endOfDay } from "date-fns";

export async function getOrders(
  limit: number,
  filters: {
    page: string | number;
    status: string;
    sort: string;
    query: string;
  },
): Promise<OrdersInfo[]> {
  const supabase = await createClient();

  const from = (Number(filters.page) - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from("orders")
    .select(
      "id, orderDate, status, userId(image), name, email, totalCost, order_items(productId(name, regularPrice), quantity)",
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
  } else {
    query = query.order("created_at", { ascending: true });
  }

  const { data: orders, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("Non è stato possibile caricare gli ordini.");
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
      userId: Array.isArray(order.userId) ? order.userId[0] : order.userId, // <-- aggiungi questa normalizzazione
      order_items: normalizedOrderItems,
    };
  });

  return paginatedOrders;
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
  } else {
    query = query.order("created_at", { ascending: true });
  }

  const { data: orders, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("Non è stato possibile caricare gli ordini.");
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

  return allOrders.length ?? 0;
}

export async function getOrder(id: string): Promise<OrdersInfo> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("orders")
    .select(
      "id, orderDate, status, userId(image), name, email, totalCost, order_items(productId(name, regularPrice), quantity)",
    )
    .eq("id", id)
    .single();

  if (error || !data) {
    // notFound();
    console.error(error);
    throw new Error("Non è stato possibile caricare l'ordine.");
  }

  const normalizedUserId = Array.isArray(data.userId)
    ? data.userId[0]
    : data.userId;

  const normalizedOrderItems = (data.order_items ?? []).map((item) => ({
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
}

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

export async function getChartOrders() {
  const supabase = await createClient();

  const { data: orders, error } = await supabase
    .from("orders")
    .select("id, orderDate");

  if (error) {
    console.error(error);
    throw new Error("Non è stato possibile caricare gli ordini.");
  }

  return orders;
}

export async function getLastYearOrders() {
  const supabase = await createClient();

  // Data di oggi, a fine giornata
  const now = new Date();

  // Data esattamente 12 mesi fa, all'inizio del giorno
  const lastYearDate = startOfDay(subMonths(now, 12)); // Esempio: 2024-08-13T00:00:00

  const fromDate = format(lastYearDate, "yyyy-MM-dd");
  const toDate = format(now, "yyyy-MM-dd"); // oppure: format(endOfDay(now), ...) se vuoi precisione massima

  const { data: orders, error } = await supabase
    .from("orders")
    .select("id, orderDate, totalCost, status")
    .gte("orderDate", fromDate)
    .lte("orderDate", toDate);

  if (error) {
    console.error(error);
    throw new Error("Non è stato possibile caricare gli ordini.");
  }

  return orders;
}

export async function getStatsOrders() {
  const supabase = await createClient();

  const {
    data: orders,
    count,
    error,
  } = await supabase.from("orders").select("totalCost", { count: "exact" });

  if (error) {
    console.error(error);
    throw new Error("Non è stato possibile caricare gli ordini.");
  }

  return { orders, count };
}

export async function getLatestOrders() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("orders")
    .select("id, userId(image), name, email, orderDate, status, totalCost")
    .order("created_at", { ascending: false })
    .limit(5);

  if (error) {
    console.error(error);
    throw new Error("Non è stato possibile caricare gli ordini.");
  }

  const fixedOrders = data.map((order) => ({
    ...order,
    userId: Array.isArray(order.userId) ? order.userId[0] : order.userId, // <-- aggiungi questa normalizzazione
  }));

  return fixedOrders;
}

export async function getTodayOrders() {
  const supabase = await createClient();

  //consider using startOfToday
  const start = startOfDay(new Date()).toISOString();
  const end = endOfDay(new Date()).toISOString();

  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .gte("orderDate", start) // >= inizio giorno
    .lte("orderDate", end) // <= fine giorno
    .order("orderDate", { ascending: false });

  if (error) {
    console.error(error);
    throw new Error("Non è stato possibile caricare gli ordini di oggi.");
  }

  return data;
}

export async function getTopCustomer() {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("get_top_customer");

  if (error) {
    console.error("Error fetching top customer:", error);
    throw new Error(
      "Non è stato possibile caricare il cliente con più ordini effettuati.",
    );
  }

  return data;
}
