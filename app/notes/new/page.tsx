import Note3 from "../../components/note/Card";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import { createNote, editNote } from "@/app/lib/actions";
import { revalidatePath } from "next/cache";

export default function Page() {
  async function newNote(
    newTitle: string,
    newDescription: string,
    dateNow: string
  ) {
    "use server";
    const { data, error } = await createNote(newTitle, newDescription, dateNow);
    if (error) {
      throw new Error(`Error updating note: ${error}`);
    } else {
      revalidatePath("/notes");

      return data![0].id;
    }
  }

  async function changeTitle(newTitle: string, noteId: number) {
    "use server";
    console.log("first getting into noteId. It is: ", noteId);
    const dateNow = new Date().toISOString();
    if (noteId === 0) {
      console.log("going to call newNote()");
      const newNoteId = await newNote(newTitle, "", dateNow);
      return newNoteId;
    } else {
      console.log("noteId going to the db is: ", noteId);
      console.log("Note has already been created. Going to edit instead...");
      const { data, error } = await editNote(noteId, newTitle, "", dateNow);
      if (error) {
        throw new Error(`Error updating note: ${error}`);
      } else {
        // revalidatePath("/notes");
        return (noteId = data![0].id);
      }
    }
  }

  async function changeDescription(newDescription: string, noteId: number) {
    "use server";
    const dateNow = new Date().toISOString();
    if (noteId === 0) {
      const newNoteId = await newNote("", newDescription, dateNow);
      return newNoteId;
    } else {
      const { data, error } = await editNote(noteId, "", newDescription, dateNow);
      if (error) {
        throw new Error(`Error updating note: ${error}`);
      } else {
        // revalidatePath("/notes");
        return (noteId = data![0].id);
      }
    }
  }
  return (
    <Note3
      noteId={0}
      notesTitle=""
      notesDescription=""
      changeTitle={changeTitle}
      changeDescription={changeDescription}
    />
  );
}
