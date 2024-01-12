import getSupabaseAccessToken from "./getSupabaseAccessToken";
import supabaseClient from "./supabaseClient";

export default async function getNotes() {
  const supabaseAccessToken = await getSupabaseAccessToken();
  const supabase = await supabaseClient(supabaseAccessToken);

  const { data, error } = await supabase.from("Notes").select("*");
  return { data, error };
}
