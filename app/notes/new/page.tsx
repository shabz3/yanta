import Note from "../../components/note/Card";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import { createNote, editNote } from "@/app/lib/actions";
import { revalidatePath } from "next/cache";
import { Suspense } from "react";
import CardSkeleton from "@/app/components/note/skeleton/CardSkeleton";
import NoteCellSkeleton from "@/app/components/Table/skeleton/NoteCellSkeleton";

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
    const dateNow = new Date().toISOString();
    if (noteId === 0) {
      const newNoteId = await newNote(newTitle, "", dateNow);
      return newNoteId;
    } else {
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
      const { data, error } = await editNote(
        noteId,
        "",
        newDescription,
        dateNow
      );
      if (error) {
        throw new Error(`Error updating note: ${error}`);
      } else {
        // revalidatePath("/notes");
        return (noteId = data![0].id);
      }
    }
  }
  return (
    <>
      
      <Note
        noteId={0}
        notesTitle=""
        notesDescription=""
        changeTitle={changeTitle}
        changeDescription={changeDescription}
      />
    </>
  );
}
