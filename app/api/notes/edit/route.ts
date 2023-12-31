import { promises as fs } from "fs";
import { Note } from "../../../components/table/Table";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic"; // defaults to auto

export async function POST(request: Request) {
  const fileName = process.cwd() + "/test-data.json";
  const file = await fs.readFile(fileName, "utf8");
  const fileData = JSON.parse(file);
  const notesData = fileData.notes;
  const data = await request.json();

  const updatedData = {
    notes: notesData.map((element: Note) => {
      if (element.id === data.noteId) {
        return {
          ...element,
          title: data.title,
          description: data.description,
        };
      }
      return element;
    }),
  };
  if (updatedData !== notesData) {
    console.log("revalidating...")
    // I dont think this works (have to refresh to see changes)
    revalidatePath('/notes')
  }
  fs.writeFile(fileName, JSON.stringify(updatedData, null, 2));
  return new Response("Success", { status: 200 });
}
