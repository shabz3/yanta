import Note3 from "../../components/note/Card";
import { Note } from "@/app/components/table/Table";
import { redirect } from "next/navigation";
import { auth } from '@clerk/nextjs';
import getData from "../../lib/getData"


export default async function SingleNote({
  params,
}: {
  params: { note: string };
}) {
  const data = await getData();
  let title = data.notes.find((obj: Note) => obj.id === params.note).title;
  let description = data.notes.find(
    (obj: Note) => obj.id === params.note
  ).description;

  async function handleSubmit(formData: FormData) {
    "use server";
    const { getToken } = auth();
    const title = formData.get("name");
    const description = formData.get("description");
    console.log(title, description);
    const dateNow = new Date().toISOString();
    try {
      fetch(`http://localhost:3000/api/notes/edit`, {
        method: "POST",
        headers: { Authorization: `Bearer ${await getToken()}` },
        body: JSON.stringify({
          noteId: params.note,
          title,
          description,
          "last-updated": dateNow,
        }),
      });
    } catch (error) {
      throw new Error(`Failed to update note: ${error}`);
    }
    redirect("/notes");
  }

  return (
    <Note3
      notesTitle={title}
      notesDescription={description}
      handleSubmit={handleSubmit}
    />
  );
}
