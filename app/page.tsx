import { Image } from "@nextui-org/react";
import NextImage from "next/image";

export default async function App() {
  return (
    <>
      <div className="grid w-full py-20 px-20 place-content-center">
        <h1 className="w-full text-7xl leading-normal">
          Jotting notes,
          <br />
          but quicker
        </h1>
        <div className="mt-20">
          <Image
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
