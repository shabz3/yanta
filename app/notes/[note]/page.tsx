"use client";
import Note3 from "../../components/note/Card3";
import { Note } from "@/app/components/table/Table";
import { redirect } from "next/navigation";

async function getData() {
  const res = await fetch("http://localhost:3000/api/notes", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const dateNow = new Date().toISOString();
    try {
      const response = await fetch(`/api/notes/edit`, {
        method: "POST",
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
  }
  return (
    <Note3
      notesTitle={title}
      notesDescription={description}
      handleSubmit={handleSubmit}
    />
  );
}
