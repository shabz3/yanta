import { revalidateTag } from "next/cache";
import getSupabaseAccessToken from "./getSupabaseAccessToken";
import supabaseClient from "./supabaseClient";
// import { Note } from "../components/table/Table";


export default async function getNotes() {
  console.log("Getting the latest data");
  const supabaseAccessToken = await getSupabaseAccessToken();
  const supabase = await supabaseClient(supabaseAccessToken);

  const { data, error } = await supabase
    .from("Notes")
    .select("id, title, description, last_updated");
  console.log("DATA: ", data);
  return { data, error };
}
