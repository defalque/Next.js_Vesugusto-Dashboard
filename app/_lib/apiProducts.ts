import { createClient as createServerClient } from "@/utils/supabase/server";
// import { Product } from "./definitions";

// export async function getProducts(
//   limit: number,
//   filters: { page: string | number; type: string; sort: string; query: string },
// ): Promise<Product[]> {
export async function getProducts(
  limit: number,
  filters: { page: string | number; type: string; sort: string; query: string },
) {
  const supabase = await createServerClient();

  const from = (Number(filters.page) - 1) * limit;
  const to = from + limit - 1;

  let query = supabase.from("products").select("*").range(from, to);

  if (filters.query) {
    query = query.ilike("name", `%${filters.query}%`);
  }

  if (filters.type !== "all") {
    query = query.eq("type", filters.type);
  }

  if (filters.sort === "price-asc") {
    query = query.order("regularPrice", { ascending: true });
  } else if (filters.sort === "price-desc") {
    query = query.order("regularPrice", { ascending: false });
  } else if (filters.sort === "most-recent") {
    query = query.order("created_at", { ascending: false });
  } else if (filters.sort === "less-recent") {
    query = query.order("created_at", { ascending: true });
  } else if (filters.sort === "max-stock") {
    query = query.order("quantity", { ascending: false });
  } else if (filters.sort === "min-stock") {
    query = query.order("quantity", { ascending: true });
  } else {
    query = query.order("created_at", { ascending: false });
  }

  const { data, error } = await query;
  if (error) {
    console.error("Non è stato possibile caricare i prodotti: ", error);
    return { products: data, error: true };
  }

  return { products: data ?? [], error: false };
}

export async function getTotalProducts(filters: {
  page: string | number;
  type: string;
  sort: string;
  query: string;
}) {
  const supabase = await createServerClient();
  let query = supabase
    .from("products")
    .select("id, type, regularPrice", { count: "exact" });

  if (filters.query) {
    query = query.ilike("name", `%${filters.query}%`);
  }

  if (filters.type !== "all") {
    query = query.eq("type", filters.type);
  }

  if (filters.sort === "price-asc") {
    query = query.order("regularPrice", { ascending: true });
  } else if (filters.sort === "price-desc") {
    query = query.order("regularPrice", { ascending: false });
  } else if (filters.sort === "most-recent") {
    query = query.order("created_at", { ascending: false });
  } else if (filters.sort === "less-recent") {
    query = query.order("created_at", { ascending: true });
  } else if (filters.sort === "max-stock") {
    query = query.order("quantity", { ascending: false });
  } else if (filters.sort === "min-stock") {
    query = query.order("quantity", { ascending: true });
  } else {
    query = query.order("created_at", { ascending: false });
  }

  const { count, error } = await query;

  if (error) {
    console.error("Non è stato possibile caricare i prodotti: ", error);
    return { count: count, error: true };
    // notFound();
  }

  return { count: count ?? 0, error: false };
}

export async function getAllProducts() {
  // const supabase = await createClient2();
  const supabase = await createServerClient();

  const { data, error } = await supabase.from("products").select("*");

  if (error) {
    console.error(error);
    throw new Error("Non è stato possibile caricare il prodotto.");
    // notFound();
  }

  return data;
}

export async function getProduct(id: string) {
  const supabase = await createServerClient();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error(error);
    throw new Error("Non è stato possibile caricare il prodotto.");
    // notFound();
  }

  return data;
}

export async function getProductName(id: string) {
  const supabase = await createServerClient();

  const { data, error } = await supabase
    .from("products")
    .select("name")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error(error);
    throw new Error("Non è stato possibile caricare il prodotto.");
    // notFound();
  }

  return data;
}

export async function getBestSeller() {
  const supabase = await createServerClient();

  const { data, error } = await supabase.rpc("get_top_3_best_sellers");

  if (error) {
    console.error(
      "Non è stato possibile recuperare i prodotti più venduti: ",
      error,
    );
    return null;
  }

  return data;
}
