import getSupabaseAccessToken from "./getSupabaseAccessToken";
import supabaseClient from "./supabaseClient";
import { Note } from "../components/_table/Table";
import { auth } from "@clerk/nextjs";

export async function editNote(
  noteId: number,
  title: string,
  description: string,
  dateNow: string
) {
  const { userId } = auth();
  const supabaseAccessToken = await getSupabaseAccessToken();
  const supabase = await supabaseClient(supabaseAccessToken);
  function formToUpdate() {
    if (description !== "" && title !== "") {
      return {
        title,
        description,
        last_updated: dateNow,
        user_id: userId,
      };
    } else if (description === "") {
      return {
        title,
        last_updated: dateNow,
        user_id: userId,
      };
    } else if (title === "") {
      return {
        description,
        last_updated: dateNow,
        user_id: userId,
      };
    }
  }

  const { data, error } = await supabase
    .from("Notes")
    .update(formToUpdate())
    .eq("id", noteId)
    .select();
  return { data, error };
}

export async function createNote(
  title: FormDataEntryValue | null,
  description: FormDataEntryValue | null,
  dateNow: string
) {
  const { userId } = auth();
  const supabaseAccessToken = await getSupabaseAccessToken();
  const supabase = await supabaseClient(supabaseAccessToken);
  const { data, error } = await supabase
    .from("Notes")
    .insert({
      title,
      description,
      last_updated: dateNow,
      user_id: userId,
    })
    .select();
  return { data, error };
}
