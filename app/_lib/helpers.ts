import { createClient } from "@/utils/supabase/server";

export default async function getCurrentUser() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error("Errore durante recupero utente: ", error.message);
    throw new Error("Errore durante recupero utente");
  }

  return data;
}
