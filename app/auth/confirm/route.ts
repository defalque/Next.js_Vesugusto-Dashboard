import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
// import { error } from "console";

export async function GET(request: NextRequest) {
  console.log(request);
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/dashboard";
  if (token_hash && type) {
    const supabase = await createClient();
    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });
    if (!error) {
      redirect(next);
    } else {
      // redirect("/");
      console.error(error);
      throw new Error(error.message);
    }
  }
  // redirect the user to an error page with some instructions
  // fallback if token_hash or type is missing
  throw new Error("Missing token_hash or type in URL parameters.");
}
