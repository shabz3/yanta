"use client";

import { Textarea } from "@nextui-org/react";
import { Spacer } from "@nextui-org/react";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Button } from "@nextui-org/react";

export default function Card() {
  const [textData, setTextData] = useState("");

  let handleChange = (event: any) => {
    setTextData(event.target.value);
  };
  const debouncedHandleChange = useDebouncedCallback(handleChange, 300);

  return (
    <div className="flex grid gap-4">
      <div>
        <Spacer x={4} />
        <Textarea onChange={debouncedHandleChange}>{textData}</Textarea>
        <Spacer x={4} />
      </div>
      <div>
        <Button>Save</Button>
      </div>
    </div>
  );
}
