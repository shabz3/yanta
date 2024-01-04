"use client";

import { Suspense, useEffect, useState } from "react";
import SingleCard from "../../components/note/Card";
import { useRouter } from "next/navigation";
import Note2 from "../../components/note/Card2";
import { Note } from "@/app/components/table/Table";

async function getData() {
  const res = await fetch("http://localhost:3000/api/notes", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default function SingleNote({ params }: { params: { note: string } }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();
  useEffect(() => {
    fetch("/api/notes")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        setTitle(data.notes.find((obj: Note) => obj.id === params.note).title);
        setDescription(
          data.notes.find((obj: Note) => obj.id === params.note).description
        );
      });
  }, []);
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const dateNow = new Date().toISOString();
    try{
      const response = await fetch(`../api/notes/edit`, {
        method: "POST",
        body: JSON.stringify({
          noteId: params.note,
          title,
          description,
          "last-updated": dateNow,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to update note");
      } else {
        router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/notes`);
        router.refresh()
      }
    } catch(error){
      error
    }

  }
  return (
    // <SingleCard noteId={params.note} />
    <Suspense fallback={"Loading..."}>
      <Note2
        notesTitle={title}
        notesDescription={description}
        setTitle={setTitle}
        setDescription={setDescription}
        handleSubmit={handleSubmit}
      />
    </Suspense>
  );
}
