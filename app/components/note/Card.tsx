"use client";

import { Textarea } from "@nextui-org/react";
import { Spacer } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Button } from "@nextui-org/react";
import data from "@/test-data.json";
import { useRouter } from "next/navigation";

export default function Card({ note }: { note: number }) {
  const [title, setTitle] = useState(data.notes[note - 1].title);
  const [description, setDescription] = useState(
    data.notes[note - 1].description
  );
  const router = useRouter();
  let handleTitleChange = (event: any) => {
    setTitle(event.target.value);
  };

  let handleDescriptionChange = (event: any) => {
    setDescription(event.target.value);
  };

  const debouncedHandleTitleChange = useDebouncedCallback(
    handleTitleChange,
    300
  );

  const debouncedHandleDescriptionChange = useDebouncedCallback(
    handleDescriptionChange,
    300
  );

  async function handleSubmit(e: any) {
    e.preventDefault();
    const response = await fetch(`../api/notes/edit`, {
      method: "POST",
      body: JSON.stringify({
        noteId: note,
        title,
        description,
      }),
    });
    if (!response.ok) {
      throw new Error("Failed to update note");
    } else {
      router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/notes`);
      router.refresh();
    }
  }

  return (
    <div className="flex grid gap-4">
      <form onSubmit={handleSubmit}>
        <div>
          <Spacer x={4} />
          <Textarea
            onChange={debouncedHandleTitleChange}
            defaultValue={title}
            variant="underlined"
          >
            {title}
          </Textarea>
          <Spacer x={4} />
          <Textarea
            onChange={debouncedHandleDescriptionChange}
            defaultValue={description}
          >
            {description}
          </Textarea>
          <Spacer x={4} />
        </div>
        <div>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </div>
  );
}
