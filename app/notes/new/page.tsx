import { v4 as uuidv4 } from "uuid";
import Note3 from "../../components/note/Card";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

export default function Page() {
  async function handleSubmit(formData: FormData) {
    "use server";
    const { getToken } = auth();
    const newNoteId = uuidv4();
    const title = formData.get("name");
    const description = formData.get("description");
    const currentDate = new Date().toISOString();
    try {
      fetch(`http://localhost:3000/api/notes/new`, {
        method: "POST",
        headers: { Authorization: `Bearer ${await getToken()}` },
        body: JSON.stringify({
          noteId: newNoteId,
          title,
          description,
          "last-updated": currentDate,
        }),
      });
    } catch (error) {
      throw new Error("Failed to create note");
    }
    redirect("/notes");
  }

  return (
    <Note3 notesTitle="" notesDescription="" handleSubmit={handleSubmit} />
  );
}
