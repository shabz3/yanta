"use client";

import { Button, Input, Textarea } from "@nextui-org/react";
import { Spacer } from "@nextui-org/react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { useRouter } from "next/navigation";

// (newValue: string) => void means that that setTitle is a function that takes a string as an argument (called `newValue`) and returns `void`

export default function Note({
  notesTitle,
  notesDescription,
  setTitle,
  setDescription,
  handleSubmit,
}: {
  notesTitle: string;
  notesDescription: string;
  setTitle: (newValue: string) => void;
  setDescription: (newValue: string) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}) {
  const router = useRouter();
  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader className="mb-6">
          <Input
            label="Title"
            value={notesTitle}
            onChange={(e) => setTitle(e.target.value)}
            className="block w-full"
          />
        </CardHeader>
        <CardBody className="mb-6">
          <Textarea
            label="Description"
            value={notesDescription}
            onChange={(e) => setDescription(e.target.value)}
            className="block w-full"
            classNames={{
              input: "resize-y min-h-[40px]",
            }}
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
