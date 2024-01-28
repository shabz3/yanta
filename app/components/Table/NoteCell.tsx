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
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import EllipsisVerticalIcon from "../icons/EllipsisVerticalIcon";
import { TrashIcon } from "../icons/TrashIcon";
import PencilIcon from "../icons/PencilIcon";

export default function NoteCell({
  noteId,
  title,
  description,
  dateFormatted,
  noteDeletion,
}: {
  noteId: number;
  title: string;
  description: string;
  dateFormatted: string;
  noteDeletion: (noteId: number) => void;
}) {
  const router = useRouter();
  return (
    <div className="mb-5 pt-4">
      <Card className="align-middle py-4 px-2 mx-10">
        <CardHeader>
          <div className="w-full text-center py-2 h-12 mb-4 flex-col rounded-lg bg-stone-200 dark:bg-zinc-800">
            <h4 className="px-1 truncate dark:text-gray-300 text-main-color font-bold text-xl">
              {title}
            </h4>
          </div>
        </CardHeader>

        <CardBody>
          <div className="block h-32  overflow-hidden rounded-lg p-4 bg-stone-200 dark:bg-zinc-800">
            <p className="line-clamp-5 text-sm dark:text-gray-300 text-gray-800">
              {description}
            </p>
          </div>
        </CardBody>
      </Card>
      <div className="items-stretch">
        <p className="pt-4 pb-2 text-center text-sm text-main-color font-semibold">
          Edited {dateFormatted}{" "}
          <Popover showArrow={true}>
            <PopoverTrigger>
              <Link className="align-middle ml-1" color="foreground">
                <EllipsisVerticalIcon />
              </Link>
            </PopoverTrigger>
            <PopoverContent className=" dark:bg-neutral-700">
              <div className=" px-1 py-2 w-full">
                <div className="mt-2 flex flex-col gap-2 w-full">
                  <Button
                    className="w-full dark:bg-zinc-800"
                    onClick={() => router.push(`/notes/${noteId}`)}
                  >
                    Edit Note <PencilIcon />
                  </Button>

                  <Button
                    className="w-full text-danger cursor-pointer active:opacity-50 dark:bg-zinc-800"
                    onClick={() => noteDeletion(noteId)}
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
