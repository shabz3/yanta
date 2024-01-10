import { createClient } from "@supabase/supabase-js";
import { useAuth } from "@clerk/nextjs";

const supabaseClient = async (
  supabaseAccessToken: string | null | undefined
) => {
  const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseKey: string = process.env.NEXT_PUBLIC_SUPABASE_KEY || "";

  const supabase = createClient(supabaseUrl, supabaseKey, {
    global: { headers: { Authorization: `Bearer ${supabaseAccessToken}` } },
  });
  // set Supabase JWT on the client object,
  // so it is sent up with all Supabase requests
  return supabase;
};

export default supabaseClient;
