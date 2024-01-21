import getNotes from "./lib/data";
import { Image } from "@nextui-org/react";

export default async function App() {
  return (
    <>
      <div className="grid w-full py-20 px-20 place-content-center">
        <h1 className="w-full text-7xl leading-normal">Jotting notes,<br />but quicker</h1>
        <div className="mt-20">
          <Image
            width={600}
            height={600}
            alt="NextUI hero Image"
            src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
          />
        </div>
      </div>
    </>
  );
}
