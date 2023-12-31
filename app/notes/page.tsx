// import getData from "./GetJsonData"
import Table from "../components/table/Table"

async function getData() {
  const res = await fetch("http://localhost:3000/api/notes");
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Notes() {
  const data = await getData();

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
    {
      key: "actions",
      label: "Actions"
    }
  ];
  console.log(data.notes);
  return (
    <div>
      <Table columns={columns} rows={data.notes} />
    </div>
  );
}
