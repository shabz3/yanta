import { auth } from "@clerk/nextjs";
import supabaseClient from "./supabaseClient";

async function getSupabaseAccessToken() {
  const { getToken } = auth();
  const supabaseAccessToken = await getToken({
    template: "supabase",
  });
  return supabaseAccessToken
}

export default async function getData() {
  const supabaseAccessToken = await getSupabaseAccessToken()
  const supabase = await supabaseClient(supabaseAccessToken);

  // TODO #2: Replace with your database table name

  const { data, error } = await supabase.from("Notes").select("*");
  return { data, error };
}
