"use client";
import {
  Card,
  CardHeader,
  CardBody,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Link,
  Listbox,
  ListboxItem,
  Input,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import EllipsisVerticalIcon from "./EllipsisVerticalIcon";
import { TrashIcon } from "./TrashIcon";
import PencilIcon from "./PencilIcon";

export default function NoteCell({
  noteId,
  title,
  description,
  dateFormatted,
  deleteNote,
}: {
  noteId: number;
  title: string;
  description: string;
  dateFormatted: string;
  deleteNote: (noteId: number) => void;
}) {
  const router = useRouter();
  return (
    <div className="align-middle mx-10">
      <Card className="py-4 px-2 mx-3 mt-4 mb-1">
        <CardHeader className="py-2 h-8 flex-col items-start">
          <h4 className="dark:text-gray-300 text-main-color font-bold text-xl ">
            {title}
          </h4>
        </CardHeader>

        <CardBody className="py-2">
          <p className="h-32 text-sm break-words text-wrap overflow-ellipsis overflow-hidden dark:text-gray-300 text-gray-800">
            {description}
          </p>
        </CardBody>
      </Card>
      <div className="items-stretch">
        <p className="py-2 text-center text-sm text-main-color font-semibold">
          Edited {dateFormatted}{" "}
          <Popover showArrow={true}>
            <PopoverTrigger>
              <Link className="align-middle ml-1" color="foreground">
                <EllipsisVerticalIcon />
              </Link>
            </PopoverTrigger>
            <PopoverContent className=" bg-gray-800">
              <div className=" px-1 py-2 w-full">
                <div className="mt-2 flex flex-col gap-2 w-full">
                  <Button
                    className="w-full"
                    onClick={() => router.push(`/notes/${noteId}`)}
                  >
                    Edit Note <PencilIcon />
                  </Button>

                  <Button
                    className="w-full text-danger cursor-pointer active:opacity-50"
                    onClick={() => deleteNote(noteId)}
                  >
                    Delete Note <TrashIcon />
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </p>
      </div>
    </div>
  );
}
