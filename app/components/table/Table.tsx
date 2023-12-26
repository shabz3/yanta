"use client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";
import { Note } from "@/app/notes/page";
import moment from "moment";
import { useRouter } from 'next/navigation';

interface Column {
  key: string;
  label: string;
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
  const formattedRows = formatDatesInRows(rows);
  const { push } = useRouter();
  const handleRowAction = (key: string | number | bigint) => {
    push(`${window.location.href}/note?${key}`);
  };

  return (
    <>
      <Table
        aria-label="Notes table"
        color="primary"
        // selectionMode="single"
        onRowAction={(key) => handleRowAction(key)}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={formattedRows}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{getKeyValue(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
