import { createClient } from "@/utils/supabase/server";

import { OrdersInfo } from "./definitions";
import { subMonths, format, startOfDay } from "date-fns";

// export async function getOrders(
//   limit: number,
//   filters: {
//     page: string | number;
//     status: string;
//     sort: string;
//     query: string;
//   },
// ): Promise<OrdersInfo[]> {
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
      userId: Array.isArray(order.userId) ? order.userId[0] : order.userId, // <-- aggiungi questa normalizzazione
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
    console.error(
      "Non è stato possibile caricare gli ordini dell'ultimo anno: ",
      error,
    );
    return null;
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
    console.error("Non è stato possibile caricare gli ordini: ", error);
    return null;
  }

  return { orders, count };
}

export async function getOrdersActivity() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("orders")
    .select("id, userId(image), name, email, orderDate, status, totalCost")
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
    userId: Array.isArray(order.userId) ? order.userId[0] : order.userId,
  }));

  return fixedOrders;
}

export async function getTopCustomer() {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("get_top_customer");

  if (error) {
    console.error(
      "Non è stato possibile caricare il cliente con più ordini effettuati:",
      error,
    );
    return null;
  }

  return data;
}
