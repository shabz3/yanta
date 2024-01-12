import { v4 as uuidv4 } from "uuid";
import Note3 from "../../components/note/Card";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import { createNote } from "@/app/lib/actions";

export default function Page() {
  async function handleSubmit(formData: FormData) {
    "use server";
    const { getToken } = auth();
    const newNoteId = uuidv4();
    const title = formData.get("name");
    const description = formData.get("description");
    const dateNow = new Date().toISOString();
    const { error } = await createNote(title, description, dateNow);
    if (error) {
      throw new Error(`Error creating note: ${error}`);
    } else {
      redirect("/notes");
    }
  }

  return (
    <Note3 notesTitle="" notesDescription="" handleSubmit={handleSubmit} />
  );
}
