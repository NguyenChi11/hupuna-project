import React from "react";
import { Checkbox } from "@/components/ui/_base/Checkbox";
import { TableCell } from "@/components/ui/_base/TableCell";

interface GenericTableBodyProps<T> {
  data: T[];
  visibleColumns: Record<string, boolean>;
  columns: {
    key: string;
    render?: (item: T, index: number) => React.ReactNode;
  }[];
  startIndex: number;
  selectedRows: Set<string>;
  onSelectRow: (id: string) => void;
  renderRow?: (
    item: T,
    index: number,
    isSelected: boolean,
    onSelect: () => void
  ) => React.ReactNode;
}

export function GenericTableBody<T extends { id: string }>({
  data,
  visibleColumns,
  columns,
  startIndex,
  selectedRows,
  onSelectRow,
  renderRow,
}: GenericTableBodyProps<T>) {
  return (
    <tbody>
      {data.map((item, idx) => {
        const id = item.id;
        const isSelected = selectedRows.has(id);
        const rowNumber = startIndex + idx + 1;

        if (renderRow) {
          return renderRow(item, rowNumber, isSelected, () => onSelectRow(id));
        }

        return (
          <tr key={id} className="border-b border-gray-200">
            {visibleColumns.checkbox && (
              <td className="px-4 py-4">
                <Checkbox
                  checked={isSelected}
                  onChange={() => onSelectRow(id)}
                />
              </td>
            )}
            {visibleColumns.stt && <TableCell>{rowNumber}</TableCell>}
            {columns.map((col) => {
              if (!visibleColumns[col.key]) return null;
              if (col.render) {
                return (
                  <TableCell key={col.key}>{col.render(item, idx)}</TableCell>
                );
              }
              return (
                <TableCell key={col.key}>
                  {String(item[col.key as keyof T] || "-")}
                </TableCell>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
}
