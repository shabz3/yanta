"use client";
import React, { useEffect } from "react";
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
import { useState } from "react";

interface Column {
  key: string;
  label: string;
}

export interface Note {
  id: string;
  title: string;
  description: string;
  "last-updated": string;
}

const formatDatesInRows = (rows: Note[]) => {
  return rows.map((row) => {
    const formattedDate = moment(row["last-updated"]).fromNow();
    return {
      ...row,
      "last-updated": formattedDate,
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
  const [formattedRows, setFormattedRows] = useState([
    {
      id: "",
      title: "",
      description: "",
      "last-updated": "",
    },
  ]);
  useEffect(() => {
    setFormattedRows(formatDatesInRows(rows));
  }, [rows]);

  async function deleteNote(noteId: string) {
    const response = await fetch(`../api/notes/delete`, {
      method: "DELETE",
      body: JSON.stringify({
        noteId,
      }),
    });
    if (!response.ok) {
      throw new Error("Failed to update note");
    }
    router.refresh();
  }

  const renderCell = React.useCallback((note: Note, columnKey: React.Key) => {
    const cellValue = note[columnKey as keyof Note];

    const noteId = note.id;
    const noteTitle = note.title;
    const noteDescription = note.description;
    const lastUpdated = note["last-updated"];

    switch (columnKey) {
      case "title":
        return (
          <Link href={`/notes/${noteId}`} color="foreground" underline="hover">
            {noteTitle}
          </Link>
        );
      case "description":
        return <p>{noteDescription}</p>;
      case "last-updated":
        return <p>{lastUpdated}</p>;
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
