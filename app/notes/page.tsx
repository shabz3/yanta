// import getData from "./GetJsonData"
import Table from "../components/table/Table";
import { Note } from "../components/table/Table";

async function getData() {
  const res = await fetch("http://localhost:3000/api/notes", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Notes() {
  const data = await getData();
  // sort notes in latest created order
  data.notes.sort((a: Note, b: Note) => {
    const dateA = new Date(a["last-updated"]).getTime();
    const dateB = new Date(b["last-updated"]).getTime();

    return dateB - dateA;
  });
  // console.log(data.notes);

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
      <Table columns={columns} rows={data.notes} />
    </div>
  );
}
