import Table from "../components/table/Table";
import { Note } from "../components/table/Table";
import moment from "moment";
import getNotes from "../lib/data";
import getSupabaseAccessToken from "../lib/getSupabaseAccessToken";
import supabaseClient from "../lib/supabaseClient";
import { revalidatePath, unstable_noStore as noStore } from "next/cache";
import NoteCell from "../components/Table/NoteCell";
import { Suspense } from "react";
import NoteCellSkeleton from "../components/Table/skeleton/NoteCellSkeleton";

const formatDatesInRows = (rows: Note[]) => {
  return rows.map((row) => {
    const formattedDate = moment(row["last_updated"]).fromNow();
    return {
      ...row,
      last_updated: formattedDate,
    };
  });
};

export async function deleteNote(noteId: number) {
  "use server";
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

  const columns = [
    {
      key: "title",
      label: "Title",
    },
    {
      key: "description",
      label: "Brief Description",
    },
    {
      key: "last_updated",
      label: "Last Updated",
    },
    {
      key: "actions",
      label: "Actions",
    },
  ];
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 ">
      <>
        {notesData.map((note) => (
          <NoteCell
            key={note.id}
            noteId={note.id}
            title={note.title}
            description={note.description}
            dateFormatted={note.last_updated}
            deleteNote={deleteNote}
          />
        ))}
      </>
    </div>
  );
}
