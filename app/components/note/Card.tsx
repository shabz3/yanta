"use client";

import { Button, Input, Spinner, Textarea } from "@nextui-org/react";
import { Spacer } from "@nextui-org/react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import BackIcon from "../icons/BackIcon";
import { useDebouncedCallback } from "use-debounce";
import Link from "next/link";

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
  const [isSaving, setIsSaving] = useState(false);
  // TODO: figure out pending and replace isSaving with pending
  const { pending } = useFormStatus();
  console.log(pending)
  useEffect(() => {
    if (title === "") {
      setNoTitleText("Your note must have a title");
    } else {
      setNoTitleText("");
    }
  }, [title]);

  const debouncedTitle = useDebouncedCallback(async () => {
    if (title !== "") {
      const newId = await changeTitle(title, updatedNoteId);
      if (updatedNoteId === 0) {
        setUpdatedNoteId(newId);
      }
    }
    setIsSaving(false);
  }, 3000);
  const debouncedDescription = useDebouncedCallback(async () => {
    if (title !== "") {
      const newId = await changeDescription(description, updatedNoteId);
      if (updatedNoteId === 0) {
        setUpdatedNoteId(newId);
      }
    }
    setIsSaving(false);
  }, 3000);

  function GoBackButton() {
    return (
      <Button
        className="dark:bg-gray-800 bg-main-color w-full"
        radius="lg"
        variant="flat"
        isDisabled={isSaving}
        startContent={
          isSaving ? <Spinner color="white" size="sm" /> : <BackIcon />
        }
        onClick={() => router.push("/notes")}
      >
        Back to notes
      </Button>
    );
  }

  function SavingText() {
    return (
      <>
        {isSaving ? (
          <span className="italic text-gray-600 mt-2 mr-1">
            Saving... &nbsp;
            <Spinner color="default" size="sm" />
          </span>
        ) : null}
      </>
    );
  }

  return (
    <Card className="my-20 mx-14 p-4" radius="lg">
      <div className="space-y-20">
        <div className="h-14">
          <CardHeader>
            <Input
              label="Title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setIsSaving(true);
                debouncedTitle();
              }}
              className="block w-full"
              name="name"
            />
          </CardHeader>
          <p className="ml-3 mt-1 italic text-red-700">
            {noTitleText ? noTitleText : " "}
          </p>
        </div>
        <div className="h-56">
          <CardBody>
            <Textarea
              label="Description"
              minRows={40}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                setIsSaving(true);
                debouncedDescription();
              }}
              className="block w-full"
              name="description"
            />
            <div className="flex justify-end">{<SavingText />}</div>
          </CardBody>
        </div>
      </div>
      <CardFooter className="mt-5">
        <GoBackButton />
      </CardFooter>
    </Card>
  );
}
