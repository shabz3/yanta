import getSupabaseAccessToken from "./getSupabaseAccessToken";
import supabaseClient from "./supabaseClient";
import { Note } from "./definitions";
import { auth } from "@clerk/nextjs";
import { newNote } from "./definitions";
import { revalidatePath } from "next/cache";

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
  console.log("data is editNote() is: ", data);
  return { data, error };
}

export async function createNote(
  title: string | null,
  description: string | null,
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
export async function deleteNote(noteId: number) {
  const supabaseAccessToken = await getSupabaseAccessToken();
  const supabase = await supabaseClient(supabaseAccessToken);
  const { error } = await supabase.from("Notes").delete().eq("id", noteId);
  return { error };
}
