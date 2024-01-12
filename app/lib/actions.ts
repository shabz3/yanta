import getSupabaseAccessToken from "./getSupabaseAccessToken";
import supabaseClient from "./supabaseClient";
import { Note } from "../components/table/Table";
import { auth } from "@clerk/nextjs";

export async function editNote(
  noteId: number,
  title: FormDataEntryValue | null,
  description: FormDataEntryValue | null,
  dateNow: string
) {
  const { userId } = auth();
  const supabaseAccessToken = await getSupabaseAccessToken();
  const supabase = await supabaseClient(supabaseAccessToken);
  const { error } = await supabase
    .from("Notes")
    .update({
      title,
      description,
      last_updated: dateNow,
      user_id: userId,
    })
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

export async function deleteNote(noteId: number){
  const supabaseAccessToken = await getSupabaseAccessToken();
  const supabase = await supabaseClient(supabaseAccessToken);
  const { error } = await supabase
    .from("Notes")
    .delete()
    .eq("id", noteId);
  return { error };
}