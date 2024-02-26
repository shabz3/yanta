import getSupabaseAccessToken from "./getSupabaseAccessToken";
import supabaseClient from "./supabaseClient";
import { Note } from "./definitions";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

export async function upsertNote(
  noteId: string,
  title: string,
  description: string,
  dateNow: string
) {
  const { userId } = auth();
  const supabaseAccessToken = await getSupabaseAccessToken();
  const supabase = await supabaseClient(supabaseAccessToken);

  const form = {
    id: noteId,
    title,
    description,
    last_updated: dateNow,
    user_id: userId,
  };
  const { data, error } = await supabase.from("Notes").upsert(form).select();

  return { data, error };
}

export async function createNote(
  noteId: string,
  dateNow: string
) {
  const { userId } = auth();
  const supabaseAccessToken = await getSupabaseAccessToken();
  const supabase = await supabaseClient(supabaseAccessToken);
  const { data, error } = await supabase
    .from("Notes")
    .insert({
      id: noteId,
      last_updated: dateNow,
      user_id: userId,
    })
    .select();
  return { data, error };
}
export async function deleteNote(noteId: string) {
  const supabaseAccessToken = await getSupabaseAccessToken();
  const supabase = await supabaseClient(supabaseAccessToken);
  const { error } = await supabase.from("Notes").delete().eq("id", noteId);
  return { error };
}
