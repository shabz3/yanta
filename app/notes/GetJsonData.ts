import { promises as fs } from "fs";

export const dynamic = "force-dynamic"; // defaults to auto
export default async function getData() {
  const file = await fs.readFile(process.cwd() + "/test-data.json", "utf8");
  const data = JSON.parse(file);
  const notesData = data.notes;
  return notesData;
}
