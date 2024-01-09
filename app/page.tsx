"use client"

import { useAuth } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";
import { useState } from "react";

const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey: string = process.env.NEXT_PUBLIC_SUPABASE_KEY || "";

const supabaseClient = async (supabaseAccessToken: string | null) => {
  const supabase = createClient(supabaseUrl, supabaseKey, {
    global: { headers: { Authorization: `Bearer ${supabaseAccessToken}` } },
  });
  // set Supabase JWT on the client object,
  // so it is sent up with all Supabase requests
  return supabase;
};

export default function App() {
  const [databaseData, setDatabaseData] = useState("")
  const { getToken, userId } = useAuth();
  console.log(userId)

  const fetchData = async () => {
    // TODO #1: Replace with your JWT template name
    const supabaseAccessToken = await getToken({ template: "supabase" });

    const supabase = await supabaseClient(supabaseAccessToken);

    // TODO #2: Replace with your database table name

    const { data , error } = await supabase.from("Notes").select("*");
    console.log(data[0].title)

    // TODO #3: Handle the response
    setDatabaseData(data[0].title)
  };

  return (
    <div className="app">
      <button onClick={fetchData}>Fetch data</button>
      <p>{databaseData}</p>
    </div>
  );
}
