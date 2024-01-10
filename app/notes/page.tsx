import Table from "../components/table/Table";
import { Note } from "../components/table/Table";
import moment from "moment";
import getData from "../lib/data"

const formatDatesInRows = (rows: Note[]) => {
  return rows.map((row) => {
    const formattedDate = moment(row["last-updated"]).fromNow();
    return {
      ...row,
      "last-updated": formattedDate,
    };
  });
};

export default async function Notes() {
  const data = await getData();
  // sort notes in latest created order
  data.notes.sort((a: Note, b: Note) => {
    const dateA = new Date(a["last-updated"]).getTime();
    const dateB = new Date(b["last-updated"]).getTime();

    return dateB - dateA;
  });
  const notesData = formatDatesInRows(data.notes);

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
      key: "last-updated",
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
