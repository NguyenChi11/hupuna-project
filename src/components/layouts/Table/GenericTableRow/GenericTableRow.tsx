"use client";

import { TableCell } from "@/components/ui/_base/TableCell";
import { SelectRowCheckbox } from "./SelectRowCheckbox";
import { AvatarCell } from "./AvatarCell";
import { DefaultCell } from "./DefaultCell";

interface ColumnConfig<T> {
  key: keyof T | "stt" | "checkbox";
  render?: (item: T, index: number) => React.ReactNode;
}

interface GenericTableRowProps<T> {
  item: T;
  index: number;
  visibleColumns: Record<string, boolean>;
  columns: ColumnConfig<T>[];
  isSelected: boolean;
  onSelectRow: (id: string | number) => void;
  getRowId: (item: T) => string | number;
  statusColor?: string;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function GenericTableRow<T extends Record<string, any>>({
  item,
  index,
  visibleColumns,
  columns,
  isSelected,
  onSelectRow,
  getRowId,
  statusColor,
}: GenericTableRowProps<T>) {
  const rowId = getRowId(item);

  return (
    <tr
      className="border-b border-gray-200 transition-all duration-300 group"
      style={{
        borderLeft: statusColor ? `6px solid ${statusColor}` : undefined,
      }}
    >
      {/* Checkbox */}
      {visibleColumns.checkbox && (
        <SelectRowCheckbox
          checked={isSelected}
          onChange={() => onSelectRow(rowId)}
        />
      )}

      {/* STT */}
      {visibleColumns.stt && <TableCell>{index + 1}</TableCell>}

      {/* Các cột động */}
      {columns.map((col) => {
        if (!visibleColumns[String(col.key)]) return null;

        if (col.render) {
          return (
            <TableCell key={String(col.key)}>
              {col.render(item, index)}
            </TableCell>
          );
        }

        if (col.key === "name" && "name" in item && "avatar" in item) {
          return (
            <AvatarCell
              key="name"
              name={String(item.name)}
              avatar={item.avatar as string | undefined}
              href={`/customers/${rowId}`}
            />
          );
        }

        if (col.key === "stt" || col.key === "checkbox") return null;

        return (
          <DefaultCell
            key={String(col.key)}
            value={item[col.key] as string | number}
          />
        );
      })}
    </tr>
  );
}
