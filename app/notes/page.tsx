import Table from "../components/table/Table";
import moment from "moment";
import notes from "@/test-data.json";

export interface Note {
  id: number;
  title: string;
  description: string;
  "date-created": string;
}

export default function Notes() {
  let formatted_data: Note[] = notes.notes;

  const columns = [
    {
      key: "title",
      label: "Title",
    },
    {
      key: "description",
      label: "Brief Description",
    },
    {
      key: "date-created",
      label: "Creation Date",
    },
  ];
  return (
    <div>
      <Table columns={columns} rows={formatted_data} />
    </div>
  );
}
