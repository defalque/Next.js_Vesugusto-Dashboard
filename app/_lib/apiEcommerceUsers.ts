import { createClient } from "@/utils/supabase/server";

export async function getTotalEcommerceUsers() {
  const supabase = await createClient();

  const { count, error } = await supabase
    .from("users")
    .select("id", { count: "exact" });

  if (error) {
    console.error("Non è stato possibile caricare gli ordini: ", error);
    return null;
  }

  return count;
}
