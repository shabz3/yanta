"use client"
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
import EllipsisVerticalIcon from "./EllipsisVerticalIcon";
import { DeleteIcon } from "../table/DeleteIcon";
import { ListboxWrapper } from "./ListBoxWrapper";

export default function NoteCell({
  title,
  description,
  dateFormatted,
}: {
  title: string;
  description: string;
  dateFormatted: string;
}) {
  return (
    <div className="align-middle mx-5">
      <Card className="py-4 px-2 mx-3 mt-4 mb-1">
        <CardHeader className="py-2 h-8 flex-col items-start">
          <h4 className="text-default-500 font-bold text-large ">{title}</h4>
        </CardHeader>
        <CardBody className="py-2">
          <p className="h-32 text-tiny break-words text-wrap overflow-ellipsis overflow-hidden">
            {description}
          </p>
        </CardBody>
      </Card>
      <div className="items-stretch">
        <p className="py-2 text-center text-sm text-slate-500 font-semibold">
          Edited {dateFormatted}{" "}
          <Popover showArrow={true}>
            <PopoverTrigger>
              <Link className="align-middle ml-1" color="foreground">
                <EllipsisVerticalIcon />
              </Link>
            </PopoverTrigger>
            <PopoverContent className="w-[240px]">
              {(titleProps) => (
                <div className="px-1 py-2 w-full">
                  <p
                    className="text-small font-bold text-foreground"
                    {...titleProps}
                  >
                    Dimensions
                  </p>
                  <div className="mt-2 flex flex-col gap-2 w-full">
                    <Input
                      defaultValue="100%"
                      label="Width"
                      size="sm"
                      variant="bordered"
                    />
                    <Input
                      defaultValue="300px"
                      label="Max. width"
                      size="sm"
                      variant="bordered"
                    />
                    <Input
                      defaultValue="24px"
                      label="Height"
                      size="sm"
                      variant="bordered"
                    />
                    <Input
                      defaultValue="30px"
                      label="Max. height"
                      size="sm"
                      variant="bordered"
                    />
                  </div>
                </div>
              )}
            </PopoverContent>
          </Popover>
        </p>
      </div>
    </div>
  );
}
