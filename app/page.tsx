import getData from "./lib/data";

export default async function App() {
  const { data, error } = await getData();
  console.log(data);
  // setDatabaseData(data[0].title);

  return <div className="app">hello</div>;
}
