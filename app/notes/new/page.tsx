"use client";

import NewNote from "../../../components/newNote/Card";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import Note from "../../../components/note/Card2";

export default function Page() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const newNoteId = uuidv4();
    const currentDate = new Date().toISOString();
    const response = await fetch(`../api/notes/new`, {
      method: "POST",
      body: JSON.stringify({
        noteId: newNoteId,
        title,
        description,
        "last-updated": currentDate,
      }),
    });
    if (!response.ok) {
      throw new Error("Failed to create note");
    } else {
      router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/notes`);
      // need refresh with push to update new note
      router.refresh();
    }
  }

  return (
    // <NewNote title={title} description={description} setTitle={setTitle} setDescription={setDescription} handleSubmit={handleSubmit}/>
    <Note
      notesTitle={title}
      notesDescription={description}
      setTitle={setTitle}
      setDescription={setDescription}
      handleSubmit={handleSubmit}
    />
  );
}
