import { Image } from "@nextui-org/react";
import NextImage from "next/image";

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
    </>
  );
}
