import NoteCard from "../../components/note/Card";
import { Note } from "@/app/components/table/Table";
import { auth } from "@clerk/nextjs";
import getNotes from "../../lib/data";
import { editNote } from "@/app/lib/actions";
import { revalidatePath } from "next/cache";

export default async function SingleNote({
  params,
}: {
  params: { note: number };
}) {
  // hacky but doing params: { note: number } doesn't actually convert note to number
  params.note = Number(params.note);
  const { data } = await getNotes();
  console.log(typeof params.note);
  let title = data!.find((obj: Note) => obj.id === params.note)?.title;

  let description = data!.find(
    (obj: Note) => obj.id === params.note
  )?.description;

  async function changeTitle(newTitle: string) {
    "use server";
    const noteId = params.note;
    const dateNow = new Date().toISOString();
    const { error } = await editNote(noteId, newTitle, null, dateNow);
    if (error) {
      throw new Error(`Error updating note: ${error}`);
    } else {
      revalidatePath("/notes");
    }
  }
  async function changeDescription(newDescription: string) {
    "use server";
    const noteId = params.note;
    const dateNow = new Date().toISOString();
    const { error } = await editNote(noteId, null, newDescription, dateNow);
    if (error) {
      throw new Error(`Error updating note: ${error}`);
    } else {
      revalidatePath("/notes");
    }
  }

  return (
    <NoteCard
      notesTitle={title}
      notesDescription={description}
      changeTitle={changeTitle}
      changeDescription={changeDescription}
    />
  );
}
