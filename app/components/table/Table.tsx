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
import { useAuth } from "@clerk/nextjs";
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
  const { getToken } = useAuth();
  const rowsPerPage = 20;
  const numberOfRows = rows.length;

  const numberOfCharactersForTitle = 20;
  const numberOfCharactersForDescription = 20;

  const numberOfPages = Math.ceil(numberOfRows / rowsPerPage);

  rows = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return rows.slice(start, end);
  }, [page, rows]);

  async function deleteNote(noteId: string) {
    const response = await fetch(`../api/notes/delete`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${await getToken()}` },
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
            {noteTitle.length > numberOfCharactersForTitle
              ? noteTitle.substring(0, numberOfCharactersForTitle) + "..."
              : noteTitle}
          </Link>
        );
      case "description":
        return (
          <p>
            {noteDescription.length > numberOfCharactersForDescription
              ? noteDescription.substring(0, numberOfCharactersForDescription) +
                "..."
              : noteDescription}
          </p>
        );
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
      isStriped
      aria-label="Notes table"
      bottomContent={
        rowsPerPage === numberOfRows ? null : (
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              color="primary"
              page={page}
              total={numberOfPages}
              onChange={(page) => setPage(page)}
            />
          </div>
        )
      }
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.key} align="start">
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={rows} emptyContent={"No notes to display."}>
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
