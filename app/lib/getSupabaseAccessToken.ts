import { auth } from "@clerk/nextjs";

export default async function getSupabaseAccessToken() {
    const { getToken } = auth();
    const supabaseAccessToken = await getToken({
      template: "supabase",
    });
    return supabaseAccessToken
  }