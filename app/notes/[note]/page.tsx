import Note3 from "../../components/note/Card";
import { Note } from "@/app/components/table/Table";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import getNotes from "../../lib/data";
import {editNote} from "@/app/lib/actions";

export default async function SingleNote({
  params,
}: {
  params: { note: number };
}) {
  // hacky but doing params: { note: number } doesn't convert note to number
  params.note = Number(params.note);
  const { data } = await getNotes();
  console.log(typeof params.note);
  let title = data!.find((obj: Note) => obj.id === params.note)?.title;

  let description = data!.find(
    (obj: Note) => obj.id === params.note
  )?.description;

  async function handleSubmit(formData: FormData) {
    "use server";
    const noteId = params.note;
    const title = formData.get("name");
    const description = formData.get("description");
    const dateNow = new Date().toISOString();
    const { error } = await editNote(noteId, title, description, dateNow);
    if (error) {
      throw new Error(`Error updating note: ${error}`);
    } else {
      redirect("/notes");
    }
  }

  return (
    <Note3
      notesTitle={title}
      notesDescription={description}
      handleSubmit={handleSubmit}
    />
  );
}
