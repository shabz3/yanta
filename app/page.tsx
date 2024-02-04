import { Button, Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import NextImage from "next/image";
import { NewNoteIcon } from "./components/icons/NewNoteIcon";

export default async function App() {
  return (
    <>
      <div className="grid gap-y-14 mt-20 mx-14 place-content-center">
        <div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-normal leading-snug">
            One place for all your impromptu notes.
          </h1>
        </div>
        <div>
          <Image
            // className="mx-40"
            as={NextImage}
            width={600}
            height={600}
            alt="NextUI hero Image"
            src="https://eoimages.gsfc.nasa.gov/images/imagerecords/99000/99676/Alps.A2002273.1015_th.jpg"
          />
        </div>
      </div>
      <div className="max-w-[900px] gap-2 grid grid-cols-12 grid-rows-2 px-8">
        <Card className="col-span-12 sm:col-span-4 h-[300px]">
          <CardHeader className="absolute z-10 top-1 flex-col !items-start">
            <h4 className="text-white font-medium text-large">
              Stream the Acme event
            </h4>
          </CardHeader>
          <CardBody className="place-content-center">
            <div className="place-self-center">
              <Button isIconOnly>
                <NewNoteIcon />
              </Button>
            </div>
          </CardBody>
        </Card>
        <Card className="col-span-12 sm:col-span-4 h-[300px]">
          <CardHeader className="absolute z-10 top-1 flex-col !items-start">
            <p className="text-tiny text-white/60 uppercase font-bold">
              Plant a tree
            </p>
            <h4 className="text-white font-medium text-large">
              Contribute to the planet
            </h4>
          </CardHeader>
        </Card>
        <Card className="col-span-12 sm:col-span-4 h-[300px]">
          <CardHeader className="absolute z-10 top-1 flex-col !items-start">
            <p className="text-tiny text-white/60 uppercase font-bold">
              Supercharged
            </p>
            <h4 className="text-white font-medium text-large">
              Creates beauty like a beast
            </h4>
          </CardHeader>
        </Card>
      </div>
    </>
  );
}
