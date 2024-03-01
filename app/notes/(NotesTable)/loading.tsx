import React from "react";
import NoteCellSkeleton from "@/app/components/Table/skeleton/NoteCellSkeleton";
import getNotes from "../../lib/data";

async function loading() {
    let { data } = await getNotes();
    const numberOfNotes = data?.length
  return (
    <div className="h-100 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 ">
      <NoteCellSkeleton number={numberOfNotes} />
    </div>
  );
}

export default loading;
