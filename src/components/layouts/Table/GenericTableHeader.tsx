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
  const handleSelectAll = () => {
    onSelectAll(!isAllSelected);
  };

  return (
    <thead>
      <tr className="bg-gray-50 border-b border-gray-200">
        {/* Checkbox cột chọn tất cả */}
        {visibleColumns.checkbox && (
          <th className="px-4 py-3 text-left w-12">
            <Checkbox
              id="select-all"
              checked={isAllSelected}
              onChange={handleSelectAll}
            />
          </th>
        )}

        {/* Cột STT */}
        {visibleColumns.stt && (
          <TableCell className="font-medium text-gray-900">STT</TableCell>
        )}

        {/* Các cột còn lại */}
        {Object.entries(allColumns).map(([key, label]) => {
          const isVisible = visibleColumns[key];
          const isSpecial = key === "checkbox" || key === "stt";

          if (!isVisible || isSpecial) return null;

          return (
            <TableCell key={key} className="font-medium text-gray-900">
              {label}
            </TableCell>
          );
        })}
      </tr>
    </thead>
  );
}
