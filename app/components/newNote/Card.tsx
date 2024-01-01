import { Button, Input, Textarea } from "@nextui-org/react";
import { Spacer } from "@nextui-org/react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

// (newValue: string) => void means that that setTitle is a function that takes a string as an argument (called `newValue`) and returns `void`

export default function NewNote({
  title,
  description,
  setTitle,
  setDescription,
}: {
  title: string;
  description: string;
  setTitle: (newValue: string) => void;
  setDescription: (newValue: string) => void;
}) {
  const router = useRouter();
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newNoteId = uuidv4();
    const currentDate = new Date().toISOString();
    const response = await fetch(`../api/notes/new`, {
      method: "POST",
      body: JSON.stringify({
        noteId: newNoteId,
        title,
        description,
        "date-created": currentDate,
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
    <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader className="mb-6">
            <Input
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="block w-full"
            />
          </CardHeader>
          <CardBody className="mb-6">
            <Textarea
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="block w-full"
              classNames={{
                input: "resize-y min-h-[40px]",
              }}
            />
          </CardBody>
          <CardFooter className="mb-6">
            <Button
              color="danger"
              variant="ghost"
              onClick={() => router.back()}
            >
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
