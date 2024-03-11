"use client";

import { Button, Input, Spinner, Textarea } from "@nextui-org/react";
import { Spacer } from "@nextui-org/react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import BackIcon from "../icons/BackIcon";
import { useDebouncedCallback } from "use-debounce";

export default function Note({
  noteId,
  notesTitle,
  notesDescription,
  changeTitle,
  changeDescription,
}: {
  noteId: string;
  notesTitle: string | null;
  notesDescription: string | null;
  changeTitle: (title: string, noteId: string) => Promise<string>;
  changeDescription: (
    title: string,
    description: string,
    noteId: string
  ) => Promise<string>;
}) {
  const router = useRouter();
  const [title, setTitle] = useState(notesTitle ? notesTitle : "");
  const [description, setDescription] = useState(
    notesDescription ? notesDescription : ""
  );
  const [noTitleText, setNoTitleText] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  useEffect(() => {
    if (title === "") {
      setNoTitleText("Your note must have a title");
    } else {
      setNoTitleText("");
    }
  }, [title]);


  const debouncedTitle = useDebouncedCallback(async () => {
    if (title !== "") {
      await changeTitle(title, noteId);
    }
    setIsSaving(false)
  }, 3000);
  const debouncedDescription = useDebouncedCallback(async () => {
    console.log("i am being printed");
    if (title !== "") {
      await changeDescription(title, description, noteId);
    }
    setIsSaving(false)
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
        {isSaving ? "Saving..." : "Back to notes"}
      </Button>
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
          </CardBody>
        </div>
      </div>
      <CardFooter className="mt-5">
        <GoBackButton />
      </CardFooter>
    </Card>
  );
}
