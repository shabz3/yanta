"use client";

import { Button, Input, Textarea } from "@nextui-org/react";
import { Spacer } from "@nextui-org/react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import BackIcon from "./BackIcon";
import { useDebouncedCallback } from "use-debounce";

// (newValue: string) => void means that that setTitle is a function that takes a string as an argument (called `newValue`) and returns `void`

export default function Note({
  noteId,
  notesTitle,
  notesDescription,
  changeTitle,
  changeDescription,
}: {
  noteId: number;
  notesTitle: string;
  notesDescription: string;
  changeTitle: (title: string, noteId: number) => Promise<number>;
  changeDescription: (description: string, noteId: number) => Promise<number>;
}) {
  const router = useRouter();
  const [title, setTitle] = useState(notesTitle);
  const [description, setDescription] = useState(notesDescription);
  const [noTitleText, setNoTitleText] = useState("");
  const [updatedNoteId, setUpdatedNoteId] = useState(noteId);
  useEffect(() => {
    if (title === "") {
      setNoTitleText("Your note must have a title");
    }
  }, []);

  const debouncedTitle = useDebouncedCallback(async (newTitle) => {
    if (newTitle === "") {
      setNoTitleText("Your note must have a title");
    } else {
      setNoTitleText("");
      const newId = await changeTitle(newTitle, updatedNoteId);
      setUpdatedNoteId(newId);
    }
  }, 600);
  const debouncedDescription = useDebouncedCallback(async (newDescription) => {
    const newId = await changeDescription(newDescription, updatedNoteId);
    if (updatedNoteId === 0) {
      setUpdatedNoteId(newId);
    }
  }, 1000);

  function GoBackButton() {
    const { pending } = useFormStatus();
    return (
      <Button
        color="success"
        variant="ghost"
        isDisabled={pending}
        isLoading={pending}
        startContent={<BackIcon />}
        onClick={() => router.back()}
      >
        Go Back
      </Button>
    );
  }

  return (
    <div className="m-8">
      <Card>
        <CardHeader className="mb-6">
          <Input
            label="Title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              debouncedTitle(e.target.value);
            }}
            className="block w-full"
            name="name"
          />
        </CardHeader>
        <CardBody className="mb-6">
          <Textarea
            label="Description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              debouncedDescription(e.target.value);
            }}
            className="block w-full"
            classNames={{
              input: "resize-y min-h-[40px]",
            }}
            name="description"
            disableAutosize
          />
          <p>{noTitleText}</p>
        </CardBody>
        <CardFooter className="mb-5">
          <GoBackButton />
        </CardFooter>
      </Card>
    </div>
  );
}
