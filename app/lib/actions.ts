import getSupabaseAccessToken from "./getSupabaseAccessToken";
import supabaseClient from "./supabaseClient";
import { Note } from "../components/table/Table";
import { auth } from "@clerk/nextjs";

export async function editNote(
  noteId: number,
  title: string | null,
  description: string | null,
  dateNow: string
) {
  const { userId } = auth();
  const supabaseAccessToken = await getSupabaseAccessToken();
  const supabase = await supabaseClient(supabaseAccessToken);
  function formToUpdate() {
    if (description && title) {
      console.log("1")
      return {
        title,
        description,
        last_updated: dateNow,
        user_id: userId,
      };
    } else if (description === null) {
      console.log("2")
      return {
        title,
        last_updated: dateNow,
        user_id: userId,
      };
    } else if (title === null) {
      console.log("3")
      return {
        description,
        last_updated: dateNow,
        user_id: userId,
      };
    }
  }

  let { error } = await supabase
    .from("Notes")
    .update(formToUpdate())
    .eq("id", noteId);
  return { error };
}

export async function createNote(
  title: FormDataEntryValue | null,
  description: FormDataEntryValue | null,
  dateNow: string
) {
  const { userId } = auth();
  const supabaseAccessToken = await getSupabaseAccessToken();
  const supabase = await supabaseClient(supabaseAccessToken);
  const { error } = await supabase
    .from("Notes")
    .insert({
      title,
      description,
      last_updated: dateNow,
      user_id: userId,
    })
    .select();
  return { error };
}
