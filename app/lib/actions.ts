import getSupabaseAccessToken from "./getSupabaseAccessToken";
import supabaseClient from "./supabaseClient";
import { Note } from "../components/table/Table";
import { auth } from "@clerk/nextjs";
import { totalmem } from "os";

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
      console.log("1");
      return {
        title,
        description,
        last_updated: dateNow,
        user_id: userId,
      };
    } else if (description === "") {
      console.log("2");
      return {
        title,
        last_updated: dateNow,
        user_id: userId,
      };
    } else if (title === "") {
      console.log("3");
      return {
        description,
        last_updated: dateNow,
        user_id: userId,
      };
    }
  }
  console.log("formToUpdate() is: ", formToUpdate());

  const { data, error } = await supabase
    .from("Notes")
    .update(formToUpdate())
    .eq("id", noteId)
    .select();
  console.log("EDIT: ", data);
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
