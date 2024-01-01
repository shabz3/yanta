"use client";
import NewNote from "../../components/newNote/Card";
import { useState, useEffect } from "react";


export default function Page() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <NewNote title={title} description={description} setTitle={setTitle} setDescription={setDescription}/>
  );
}
