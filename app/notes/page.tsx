import { Note } from "../lib/definitions";
import moment from "moment";
import getNotes from "../lib/data";
import getSupabaseAccessToken from "../lib/getSupabaseAccessToken";
import supabaseClient from "../lib/supabaseClient";
import { revalidatePath, unstable_noStore as noStore } from "next/cache";
import NoteCell from "../components/Table/NoteCell";
import { Suspense } from "react";
import { deleteNote } from "../lib/actions";
import { Metadata } from "next";
import NoteCellSkeleton from "../components/Table/skeleton/NoteCellSkeleton";

export const metadata: Metadata = {
  title: "All Notes",
};

const formatDatesInRows = (rows: Note[]) => {
  return rows.map((row) => {
    const formattedDate = moment(row["last_updated"]).fromNow();
    return {
      ...row,
      last_updated: formattedDate,
    };
  });
};

async function noteDeletion(noteId: number) {
  "use server";
  // const { error } = await deleteNote(noteId);
  // if (error) {
  //   throw new Error(`Error deleting note: ${error}`);
  // }
  // revalidatePath("/notes");
  const supabaseAccessToken = await getSupabaseAccessToken();
  const supabase = await supabaseClient(supabaseAccessToken);
  const { error } = await supabase.from("Notes").delete().eq("id", noteId);
  if (error) {
    throw new Error(`Error deleting note: ${error}`);
  }
  revalidatePath("/notes");
}

const sortNotesInLatestCreated = (data: Note[]) => {
  data.sort((a: Note, b: Note) => {
    const dateA = new Date(a["last_updated"]).getTime();
    const dateB = new Date(b["last_updated"]).getTime();

    return dateB - dateA;
  });
};

export default async function Notes() {
  noStore();
  let { data } = await getNotes();
  if (data === null) {
    data = [];
  }
  sortNotesInLatestCreated(data);
  const notesData = formatDatesInRows(data);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 ">
      <>
        <Suspense fallback={<NoteCellSkeleton number={notesData.length} />}>
          {notesData.map((note) => (
            <NoteCell
              key={note.id}
              noteId={note.id}
              title={note.title}
              description={note.description}
              dateFormatted={note.last_updated}
              noteDeletion={noteDeletion}
            />
          ))}
        </Suspense>
      </>
    </div>
  );
}
