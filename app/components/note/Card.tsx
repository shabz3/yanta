"use client";

import {
  Textarea,
  Card,
  CardHeader,
  Spacer,
  CardBody,
  CardFooter,
} from "@nextui-org/react";
import { use, useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Button } from "@nextui-org/react";
import data from "@/test-data.json";
import { useRouter } from "next/navigation";
import { Note } from "../table/Table";

export default function SingleCard({ noteId }: { noteId: string }) {
  const notesData = data.notes;
  const singleNote =
    notesData[notesData.findIndex((object) => object.id === noteId)];
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  useEffect(() => {
    setTitle(singleNote.title);
    setDescription(singleNote.description);
  }, []);
  useEffect(() => {
    if (title !== singleNote.title || description !== singleNote.description) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [title, description]);

  const router = useRouter();

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

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader className="mb-6">
          <Textarea
            onValueChange={setTitle}
            value={title}
            variant="underlined"
          />
        </CardHeader>
        <CardBody className="mb-6">
          <Textarea
            onValueChange={setDescription}
            defaultValue={description}
            value={description}
          />
        </CardBody>
        <CardFooter className="mb-6">
          <Button color="danger" variant="ghost" onClick={() => router.back()}>
            Cancel
          </Button>
          <Spacer x={10} />
          <Button color="success" variant="ghost" type="submit">
            Save
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
