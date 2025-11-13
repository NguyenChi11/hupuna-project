// src/components/table/hooks/useTableSelection.ts
import { useState } from "react";

export function useTableSelection<T extends { id: string }>(data: T[]) {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

  const isAllSelected = data.length > 0 && selectedRows.size === data.length;

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(new Set(data.map((d) => d.id)));
    } else {
      setSelectedRows(new Set());
    }
  };

  const handleSelectRow = (id: string) => {
    setSelectedRows((prev) => {
      const updated = new Set(prev);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      updated.has(id) ? updated.delete(id) : updated.add(id);
      return updated;
    });
  };

  return {
    selectedRows,
    isAllSelected,
    handleSelectAll,
    handleSelectRow,
    resetSelection: () => setSelectedRows(new Set()),
  };
}
