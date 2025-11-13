import { ScrollArea } from "@/components/ui/_base/ScrollArea";
import { ColumnItem } from "./ColumnItem";

interface ColumnListProps {
  filteredColumns: [string, string][];
  visibleColumns: Record<string, boolean>;
  onColumnToggle: (columnKey: string) => void;
}

export function ColumnList({
  filteredColumns,
  visibleColumns,
  onColumnToggle,
}: ColumnListProps) {
  if (filteredColumns.length === 0) {
    return (
      <p className="text-sm text-gray-500 text-center py-2">
        Không tìm thấy cột nào
      </p>
    );
  }

  return (
    <ScrollArea>
      {filteredColumns.map(([columnKey, label]) => (
        <ColumnItem
          key={columnKey}
          columnKey={columnKey}
          label={label}
          checked={visibleColumns[columnKey] || false}
          onToggle={() => onColumnToggle(columnKey)}
        />
      ))}
    </ScrollArea>
  );
}
