import { createClient } from "@/utils/supabase/server";
import { subDays, subYears } from "date-fns";
import { DateRange } from "./definitions";

export async function getTotalEcommerceUsers(dateRange: DateRange) {
  const supabase = await createClient();

  const { count: totalCount, error: totalError } = await supabase
    .from("users")
    .select("id", { count: "exact" });

  if (totalError) {
    console.error("Non è stato possibile caricare gli utenti: ", totalError);
    return null;
  }

  let query = supabase.from("users").select("id", { count: "exact" });

  if (dateRange === "last-7-days") {
    query = query.gte("created_at", subDays(new Date(), 7).toISOString());
  } else if (dateRange === "last-month") {
    query = query.gte("created_at", subDays(new Date(), 30).toISOString());
  } else if (dateRange === "last-year") {
    query = query.gte("created_at", subYears(new Date(), 1).toISOString());
  }

  const { count: last7DaysCount, error: last7DaysError } = await query;

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
