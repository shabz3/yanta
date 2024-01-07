import { auth } from '@clerk/nextjs';

export default async function getData() {
    const { userId, getToken } = auth();
    const res = await fetch("http://localhost:3000/api/notes", {
      headers: { Authorization: `Bearer ${await getToken()}` },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  }