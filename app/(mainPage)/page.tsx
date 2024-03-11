import { v4 as uuidv4 } from "uuid";
import MainContent from "./mainContent";

export default async function App() {
  const newId = uuidv4();

  return (
    <>
      <MainContent newNoteUuid={newId} />
    </>
  );
}
