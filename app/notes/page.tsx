import Table from "../components/table/Table";
import { Note } from "../components/table/Table";
import moment from "moment";
import getNotes from "../lib/data";

const formatDatesInRows = (rows: Note[]) => {
  return rows.map((row) => {
    const formattedDate = moment(row["last_updated"]).fromNow();
    return {
      ...row,
      "last_updated": formattedDate,
    };
  });
};

const sortNotesInLatestCreated = (data: Note[]) => {
  data!.sort((a: Note, b: Note) => {
    const dateA = new Date(a["last_updated"]).getTime();
    const dateB = new Date(b["last_updated"]).getTime();

    return dateB - dateA;
  });
};

export default async function Notes() {
  const { data } = await getNotes();
  sortNotesInLatestCreated(data!)
  const notesData = formatDatesInRows(data!);

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
      key: "last_updated",
      label: "Last Updated",
    },
    {
      key: "actions",
      label: "Actions",
    },
  ];
  return (
    <div>
      <Table columns={columns} rows={notesData} />
    </div>
  );
}
