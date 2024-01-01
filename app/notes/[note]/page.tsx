import { useState } from "react";
import SingleCard from "../../components/note/Card";

export default function SingleNote({ params }: { params: { note: string } }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const dateNow = new Date().toISOString();
    const response = await fetch(`../api/notes/edit`, {
      method: "POST",
      body: JSON.stringify({
        noteId,
        title,
        description,
        "last-updated": dateNow,
      }),
    });
    if (!response.ok) {
      throw new Error("Failed to update note");
    } else {
      router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/notes`);
      // need refresh with push to update new note
      router.refresh();
    }
  }
  return <SingleCard noteId={params.note} />;
}
