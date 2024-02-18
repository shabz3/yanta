import { Button, Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import NextImage from "next/image";
import PencilSquareIcon from "./components/icons/PencilSquareIcon";

export default async function App() {
  return (
    <>
      <div className="grid gap-y-14 mt-20 mx-10">
        <h1 className="text-center text-4xl md:text-6xl lg:text-7xl font-medium tracking-normal leading-snug">
          One place for all your impromptu notes.
        </h1>
        <h3 className="text-center text-lg md:text-3xl lg:text-4xl font-medium tracking-normal leading-snug">
          Use yanta notes to quickly jot anything down, and access them from
          anywhere.
        </h3>
        <div className="flex justify-center">
          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-zinc-800 dark:border-zinc-700">
            <div className="p-5">
              <div className="mb-2 flex justify-center ">
                <PencilSquareIcon />
              </div>
              <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                Have last minute thoughts on that project? Jot it down quick here.
              </h5>
              <div className="flex justify-center">
                <Button
                  href="/notes/new"
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-main-color rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-gray-800"
                >
                  Write note
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
