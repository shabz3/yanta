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

  const debouncedTitle = useDebouncedCallback(async () => {
    if (title === "") {
      setNoTitleText("Your note must have a title");
    } else {
      setNoTitleText("");
      const newId = await changeTitle(title, updatedNoteId);
      setUpdatedNoteId(newId);
    }
  }, 300);
  const debouncedDescription = useDebouncedCallback(async () => {
    const newId = await changeDescription(description, updatedNoteId);
    if (updatedNoteId === 0) {
      setUpdatedNoteId(newId);
    }
  }, 300);

  function GoBackButton() {
    const { pending } = useFormStatus();
    return (
      <Button
        className="dark:bg-gray-800 bg-main-color w-full"
        radius="lg"
        variant="flat"
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
    <Card className="mt-20 mx-20 p-4" radius="lg">
      <div className="space-y-20">
        <div className="h-14">
          <CardHeader>
            <Input
              label="Title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                debouncedTitle();
              }}
              className="block w-full"
              name="name"
            />
            <p className="ml-1 mt-1 italic text-red-700">
              {noTitleText ? noTitleText : " "}
            </p>
          </CardHeader>
        </div>
        <div className="h-56">
          <CardBody>
            <Textarea
              label="Description"
              minRows={40}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                debouncedDescription();
              }}
              className="block w-full"
              name="description"
            />
          </CardBody>
        </div>
      </div>
      <div className="mt-5">
        <CardFooter>
          <GoBackButton />
        </CardFooter>
      </div>
    </Card>
  );
}
