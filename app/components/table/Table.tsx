"use client";
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
} from "@nextui-org/react";
import { EditIcon } from "./EditIcon";
import { DeleteIcon } from "./DeleteIcon";
import { Link } from "@nextui-org/react";
import moment from "moment";
import { useRouter } from "next/navigation";

interface Column {
  key: string;
  label: string;
}

export interface Note {
  id: number;
  title: string;
  description: string;
  "date-created": string;
}

const formatDatesInRows = (rows: Note[]) => {
  return rows.map((row) => {
    // Format the "date-created" field using Moment.js
    const formattedDate = moment(row["date-created"], "YYYYMMDD").fromNow();

    // Return the row object with updated date
    return {
      ...row,
      "date-created": formattedDate,
    };
  });
};

export default function App({
  columns,
  rows,
}: {
  columns: Column[];
  rows: Note[];
}) {
  const router = useRouter();
  const formattedRows = formatDatesInRows(rows);

  async function deleteNote(noteId: number) {
    const response = await fetch(`../api/notes/delete`, {
      method: "DELETE",
      body: JSON.stringify({
        noteId,
      }),
    });
    if (!response.ok) {
      throw new Error("Failed to update note");
    }
    router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/notes`);
    router.refresh();
  }

  const renderCell = React.useCallback((note: Note, columnKey: React.Key) => {
    const cellValue = note[columnKey as keyof Note];

    const noteId = note.id;
    const noteTitle = note.title;
    const noteDescription = note.description;
    const noteCreated = note["date-created"];

    switch (columnKey) {
      case "title":
        return (
          <Link href={`/note/${noteId}`} color="foreground" underline="hover">
            {noteTitle}
          </Link>
        );
      case "description":
        return <p>{noteDescription}</p>;
      case "date-created":
        return <p>{noteCreated}</p>;
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Edit note">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete note">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <div onClick={() => deleteNote(noteId)}>
                  <DeleteIcon />
                </div>
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <Table aria-label="Notes table">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.key}
            align={column.key === "actions" ? "center" : "start"}
          >
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={formattedRows}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
