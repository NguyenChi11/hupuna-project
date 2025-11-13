"use client";

import { DynamicColumns } from "@/components/layouts/Table/GenericTableHeader/DynamicColumns";
import { SelectAllCheckbox } from "@/components/layouts/Table/GenericTableHeader/SelectAllCheckbox";
import { TableCell } from "@/components/ui/_base/TableCell";
import { TableHeader } from "@/components/ui/_base/TableHeader";

interface CustomerTableHeaderProps {
  visibleColumns: Record<string, boolean>;
  allColumns: Record<string, string>;
  isAllSelected: boolean;
  onSelectAll: (checked: boolean) => void;
  startIndex: number;
}

export function CustomerTableHeader({
  visibleColumns,
  allColumns,
  isAllSelected,
  onSelectAll,
}: CustomerTableHeaderProps) {
  return (
    <TableHeader>
      {/* Checkbox chọn tất cả */}
      {visibleColumns.checkbox && (
        <SelectAllCheckbox checked={isAllSelected} onChange={onSelectAll} />
      )}

      {/* Cột STT */}
      {visibleColumns.stt && <TableCell>STT</TableCell>}

      {/* Các cột động */}
      <DynamicColumns
        visibleColumns={visibleColumns}
        allColumns={allColumns}
        skipKeys={["checkbox", "stt"]}
      />
    </TableHeader>
  );
}
