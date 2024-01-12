import getNotes from "./lib/data";

export default async function App() {
  const { data, error } = await getNotes();
  console.log(data);
  // setDatabaseData(data[0].title);

  return <div className="app">hello</div>;
}
