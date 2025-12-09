import { createClient } from "@/utils/supabase/server";
import { subDays } from "date-fns";

export async function getTotalEcommerceUsers() {
  const supabase = await createClient();

  const sevenDaysAgo = subDays(new Date(), 7).toISOString();

  const { count: totalCount, error: totalError } = await supabase
    .from("users")
    .select("id", { count: "exact" });

  if (totalError) {
    console.error("Non è stato possibile caricare gli utenti: ", totalError);
    return null;
  }

  const { count: last7DaysCount, error: last7DaysError } = await supabase
    .from("users")
    .select("id", { count: "exact" })
    .gte("created_at", sevenDaysAgo);

  if (last7DaysError) {
    console.error(
      "Non è stato possibile caricare gli utenti: ",
      last7DaysError,
    );
    return null;
  }

  return {
    total: totalCount,
    last7Days: last7DaysCount,
  };
}
