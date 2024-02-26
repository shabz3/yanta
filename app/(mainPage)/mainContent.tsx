import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
} from "@nextui-org/react";
import NextImage from "next/image";
import PencilSquareIcon from "../components/icons/PencilSquareIcon";
import AllNotesIcon from "../components/icons/AllNotesIcon20x20";
import TrashIcon from "../components/icons/TrashIcon20x20";
import Link from "next/link";

export default function MainContent({ newNoteUuid }: { newNoteUuid: string }) {
  return (
    <>
      <div className="grid gap-y-14 mt-20 mx-10">
        <div className="mb-24">
          <h1 className="text-center text-4xl md:text-6xl lg:text-7xl font-medium tracking-normal leading-snug mb-16">
            One place for all your impromptu notes.
          </h1>
          <h3 className="text-center text-xl md:text-3xl lg:text-4xl font-medium tracking-normal leading-snug">
            Use yanta to quickly jot any note down, and access it from anywhere.
          </h3>
        </div>
        <div className="grid gap-4 grid-cols-1 lg:grid-cols-3 md:grid-cols-2 mx-10">
          <Card className="p-5">
            <CardHeader className="mb-2 flex justify-center">
              <PencilSquareIcon />
            </CardHeader>
            <CardBody>
              <h5 className="mb-2 text-xl font-medium tracking-tight text-gray-900 dark:text-white text-center ">
                Have last minute thoughts on that project? Jot it down quick
                here.
              </h5>
            </CardBody>
            <CardFooter className="flex justify-center">
              <Button
                as={Link}
                href={`/notes/${newNoteUuid}`}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-400 rounded-lg focus:ring-2 focus:outline-none hover:bg-blue-500"
              >
                Write note
              </Button>
            </CardFooter>
          </Card>
          <Card className="p-5">
            <CardHeader className="mb-2 flex justify-center">
              <AllNotesIcon />
            </CardHeader>
            <CardBody>
              <h5 className="mb-2 text-xl font-medium tracking-tight text-gray-900 dark:text-white text-center">
                Forgot what you just wrote down in that all important note? View
                it here.
              </h5>
              <CardFooter className="flex justify-center">
                <Button
                  as={Link}
                  href="/notes"
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-amber-500 rounded-lg focus:ring-2 focus:ring-amber-700 focus:outline-none hover:bg-amber-600"
                >
                  View all notes
                </Button>
              </CardFooter>
            </CardBody>
          </Card>
          <Card className="p-5">
            <CardHeader className="mb-2 flex justify-center">
              <TrashIcon />
            </CardHeader>
            <CardBody>
              <h5 className="mb-2 text-xl font-medium tracking-tight text-gray-900 dark:text-white text-center">
                Need to redo the entire idea from scratch? Edit all your notes
                here.
              </h5>
              <CardFooter className="flex justify-center">
                <Button
                  as={Link}
                  href="/notes"
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-lime-700 rounded-lg focus:ring-2 focus:ring-lime-900 focus:outline-none hover:bg-lime-800"
                >
                  Edit notes
                </Button>
              </CardFooter>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
}
