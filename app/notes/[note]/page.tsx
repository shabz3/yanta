import NoteCard from "../../components/note/Card";
import { Note } from "../../lib/definitions";
import getNotes from "../../lib/data";
import { upsertNote } from "@/app/lib/actions";
import { revalidatePath, revalidateTag } from "next/cache";
import CardSkeleton from "@/app/components/note/skeleton/CardSkeleton";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Edit Note",
};

export default async function SingleNote({
  params,
}: {
  params: { note: string };
}) {
  const noteId = params.note;
  const { data } = await getNotes();
  let title = data!.find((obj: Note) => obj.id === noteId)?.title;

  let description = data!.find(
    (obj: Note) => obj.id === params.note
  )?.description;

  async function changeTitle(newTitle: string, noteId: string) {
    "use server";
    const dateNow = new Date().toISOString();
    const { error } = await upsertNote(noteId, newTitle, "", dateNow);
    if (error) {
      throw new Error(`Error updating note: ${error}`);
    } else {
      revalidatePath("/notes");
      return noteId;
    }
  }
  async function changeDescription(
    newTitle: string,
    newDescription: string,
    noteId: string
  ) {
    "use server";
    const dateNow = new Date().toISOString();
    const { error } = await upsertNote(
      noteId,
      newTitle,
      newDescription,
      dateNow
    );
    if (error) {
      throw new Error(`Error updating note: ${error}`);
    } else {
      revalidatePath("/notes");
      return noteId;
    }
  }

  return (
    <NoteCard
      noteId={noteId}
      notesTitle={title}
      notesDescription={description}
      changeTitle={changeTitle}
      changeDescription={changeDescription}
    />
  );
}
