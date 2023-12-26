"use client"
import { Button } from "@nextui-org/react";
import { redirect } from "next/navigation";


export default function Home() {
  return (
    <div>
      <Button onClick={() => redirect('http://localhost:3001/notes')}>hi</Button>
    </div>
  );
}
