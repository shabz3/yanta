import { promises as fs } from "fs";
import { Note } from "../../../components/table/Table";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic"; // defaults to auto

export async function DELETE(request: Request) {
  try {
    const fileName = process.cwd() + "/test-data.json";
    try {
      const file = await fs.readFile(fileName, "utf8");
      try {
        const fileData = JSON.parse(file);
        const notesData = fileData.notes;
        const data = await request.json();
        const indexToDelete = notesData.findIndex((obj: typeof notesData) => obj.id === data.noteId);
        if (indexToDelete !== -1){
            notesData.splice(indexToDelete, 1)
            // I dont think this works (have to refresh to see changes)
            revalidatePath("/notes");

            fs.writeFile(fileName, JSON.stringify(fileData, null, 2));
            return new Response("Success", { status: 200 });
        }

      } catch (error) {
        throw new Error("Error parsing JSON");
      }
    } catch (error) {
      throw new Error("Cannot read file");
    }
  } catch (error) {
    throw new Error("File does not exist.");
  }
}
