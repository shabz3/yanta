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
  Pagination,
} from "@nextui-org/react";
import { EditIcon } from "./EditIcon";
import { DeleteIcon } from "./DeleteIcon";
import { Link } from "@nextui-org/react";

import { useRouter } from "next/navigation";
import { useState, useMemo } from "react";

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

export default function App({
  columns,
  rows,
}: {
  columns: Column[];
  rows: Note[];
}) {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const pages = Math.ceil(rows.length / rowsPerPage);

  rows = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return rows.slice(start, end);
  }, [page, rows]);

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
    <Table
      aria-label="Notes table"
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="primary"
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />
        </div>
      }
    >
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
      <TableBody items={rows}>
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
