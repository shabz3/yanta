import { Note } from "../../lib/definitions";
import moment from "moment";
import getNotes from "../../lib/data";
import getSupabaseAccessToken from "../../lib/getSupabaseAccessToken";
import supabaseClient from "../../lib/supabaseClient";
import { revalidatePath, unstable_noStore as noStore } from "next/cache";
import NoteCell from "../../components/Table/NoteCell";
import { Suspense } from "react";
import { deleteNote } from "../../lib/actions";
import { Metadata } from "next";
import NoteCellSkeleton from "../../components/Table/skeleton/NoteCellSkeleton";
import NotesTable from "./NotesTable";
import { v4 as uuidv4 } from "uuid";

export const metadata: Metadata = {
  title: "All Notes",
};

const formatDateInRows = (rows: Note[] | null) => {
  if (rows === null) return [];
  // sorts rows to be most recently updated first
  rows.sort((a: Note, b: Note) => {
    const dateA = new Date(a["last_updated"]).getTime();
    const dateB = new Date(b["last_updated"]).getTime();

    return dateB - dateA;
  });
  // converts utc date to human readable
  let formattedDates = rows.map((row) => {
    const formattedDate = moment(row["last_updated"]).fromNow();
    return {
      ...row,
      last_updated: formattedDate,
    };
  });
  return formattedDates;
};

async function noteDeletion(noteId: string) {
  "use server";
  const { error } = await deleteNote(noteId);
  if (error) {
    throw new Error(`Error deleting note: ${error}`);
  }
  revalidatePath("/notes");
}

export default async function Notes() {
  const newId = uuidv4();
  noStore();
  let { data } = await getNotes();

  const notesData = formatDateInRows(data);

  return (
    <NotesTable
      notesData={notesData}
      noteDeletion={noteDeletion}
      newNoteUuid={newId}
    />
  );
}
