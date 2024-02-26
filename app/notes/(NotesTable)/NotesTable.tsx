"use client";

import NoteCellSkeleton from "@/app/components/Table/skeleton/NoteCellSkeleton";
import React, { Suspense, useState } from "react";
import { Note } from "@/app/lib/definitions";
import NoteCell from "@/app/components/Table/NoteCell";
import { Button, Pagination } from "@nextui-org/react";
import PlusIcon from "@/app/components/icons/PlusIcon";
import Link from "next/link";

function NotesTable({
  notesData,
  noteDeletion,
  newNoteUuid,
}: {
  notesData: Note[];
  noteDeletion: (noteId: string) => void;
  newNoteUuid: string;
}) {
  const [page, setPage] = useState(1);
  const rowsPerPage = 9;
  const totalNumberofPages = Math.ceil(notesData.length / rowsPerPage);
  const notesToRender = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return notesData.slice(start, end);
  }, [page, notesData]);

  function NewNoteButton() {
    return (
      <div className="flex h-screen">
        <Button
          as={Link}
          href={`/notes/${newNoteUuid}`}
          className="m-auto dark:bg-gray-800 bg-main-color w-60"
          startContent={<PlusIcon />}
        >
          Create your first note
        </Button>
      </div>
    );
  }
  return (
    <>
      {notesData.length === 0 ? (
        <NewNoteButton />
      ) : (
        <>
          <div className="h-100 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 ">
            <Suspense
              fallback={<NoteCellSkeleton number={notesToRender.length} />}
            >
              {notesToRender.map((note) => (
                <NoteCell
                  key={note.id}
                  noteId={note.id}
                  title={note.title}
                  description={note.description}
                  dateFormatted={note.last_updated}
                  noteDeletion={noteDeletion}
                />
              ))}
            </Suspense>
          </div>
          {notesData.length > 9 && (
            <div className="flex flex-row justify-center items-center">
              <Pagination
                classNames={{
                  cursor: "bg-main-color",
                }}
                isCompact
                showControls
                showShadow
                page={page}
                total={totalNumberofPages}
                onChange={(page) => setPage(page)}
              />
            </div>
          )}
        </>
      )}
    </>
  );
}

export default NotesTable;
