import NoteCard from "../../components/note/Card";
import { Note } from "../../lib/definitions";
import { auth } from "@clerk/nextjs";
import getNotes from "../../lib/data";
import { editNote } from "@/app/lib/actions";
import { revalidatePath, revalidateTag } from "next/cache";
import CardSkeleton from "@/app/components/note/skeleton/CardSkeleton";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Note",
};

export default async function SingleNote({
  params,
}: {
  params: { note: number };
}) {
  // hacky but doing params: { note: number } doesn't actually convert note to number
  params.note = Number(params.note);
  const noteId = params.note;
  const { data } = await getNotes();
  let title = data!.find((obj: Note) => obj.id === noteId)?.title;

  let description = data!.find(
    (obj: Note) => obj.id === params.note
  )?.description;

  async function changeTitle(newTitle: string, noteId: number) {
    "use server";
    const dateNow = new Date().toISOString();
    const { error } = await editNote(noteId, newTitle, "", dateNow);
    if (error) {
      throw new Error(`Error updating note: ${error}`);
    } else {
      revalidatePath("/notes");
      return noteId;
    }
  }
  async function changeDescription(newDescription: string) {
    "use server";
    const dateNow = new Date().toISOString();
    const { error } = await editNote(noteId, "", newDescription, dateNow);
    if (error) {
      throw new Error(`Error updating note: ${error}`);
    } else {
      revalidatePath("/notes");
      return noteId;
    }
  }

  return (
    <>
      <NoteCard
        noteId={noteId}
        notesTitle={title}
        notesDescription={description}
        changeTitle={changeTitle}
        changeDescription={changeDescription}
      />
    </>
  );
}
