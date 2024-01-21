import { promises as fs } from "fs";
import { NextResponse } from "next/server";
import supabaseClient from "../../lib/supabaseClient";
import { useAuth } from "@clerk/nextjs";

export const dynamic = "force-dynamic"; // defaults to auto

export async function GET() {
  const supabaseAccessToken = await getToken({ template: "supabase" });
  const supabase = await supabaseClient(supabaseAccessToken);

  // TODO #2: Replace with your database table name

  const { data, error } = await supabase.from("Notes").select("*");
  return NextResponse.json({ notes: data, error });
}
