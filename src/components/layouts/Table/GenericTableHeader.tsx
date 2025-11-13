import { Checkbox } from "@/components/ui/_base/Checkbox";
import { TableCell } from "@/components/ui/_base/TableCell";

interface GenericTableHeaderProps {
  visibleColumns: Record<string, boolean>;
  allColumns: Record<string, string>;
  isAllSelected: boolean;
  onSelectAll: (checked: boolean) => void;
}

export function GenericTableHeader({
  visibleColumns,
  allColumns,
  isAllSelected,
  onSelectAll,
}: GenericTableHeaderProps) {
  return (
    <thead>
      <tr className="bg-gray-50 border-b border-gray-200">
        {visibleColumns.checkbox && (
          <th className="px-4 py-3 text-left w-12">
            <Checkbox
              checked={isAllSelected}
              onChange={(e) => onSelectAll(e.target.checked)}
            />
          </th>
        )}
        {visibleColumns.stt && <TableCell>STT</TableCell>}
        {Object.entries(visibleColumns).map(([key, visible]) => {
          if (!visible || key === "checkbox" || key === "stt") return null;
          return <TableCell key={key}>{allColumns[key]}</TableCell>;
        })}
      </tr>
    </thead>
  );
}
