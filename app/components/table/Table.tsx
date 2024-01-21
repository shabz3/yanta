"use client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Pagination,
  Button,
} from "@nextui-org/react";
import { PlusIcon } from "./PlusIcon";
import { TrashIcon } from "../Table/TrashIcon";
import { Link } from "@nextui-org/react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { useState, useMemo, useEffect } from "react";

interface Column {
  key: string;
  label: string;
}
export interface Note {
  id: number;
  title: string;
  description: string;
  last_updated: string;
}

export default function App({
  columns,
  rows,
  deleteNote,
}: {
  columns: Column[];
  rows: Note[];
  deleteNote: any;
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

  const renderCell = React.useCallback((note: Note, columnKey: React.Key) => {
    const cellValue = note[columnKey as keyof Note];

    const noteId = note.id;
    const noteTitle = note.title;
    const noteDescription = note.description;
    const lastUpdated = note["last_updated"];

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
            {noteDescription &&
              (noteDescription.length > numberOfCharactersForDescription
                ? noteDescription.substring(
                    0,
                    numberOfCharactersForDescription
                  ) + "..."
                : noteDescription)}
          </p>
        );
      case "last_updated":
        return <p>{lastUpdated}</p>;
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip color="danger" content="Delete note">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <button onClick={() => deleteNote(noteId)}>
                  <TrashIcon />
                </button>
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <div className="m-8">
      <Table
        isStriped
        aria-label="Notes table"
        bottomContent={
          numberOfRows > rowsPerPage ? (
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
          ) : null
        }
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key} align="start">
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={rows}
          emptyContent={
            <Button
              onClick={() => router.push("/notes/new")}
              endContent={<PlusIcon />}
            >
              Create a note
            </Button>
          }
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
