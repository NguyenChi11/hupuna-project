import { TableCell } from "@/components/ui/_base/TableCell";

interface DynamicColumnsProps {
  visibleColumns: Record<string, boolean>;
  allColumns: Record<string, string>;
  skipKeys?: string[];
}

export function DynamicColumns({
  visibleColumns,
  allColumns,
  skipKeys = [],
}: DynamicColumnsProps) {
  return (
    <>
      {Object.entries(visibleColumns).map(([key, isVisible]) => {
        if (!isVisible || skipKeys.includes(key)) return null;
        return (
          <TableCell key={key}>
            {allColumns[key as keyof typeof allColumns]}
          </TableCell>
        );
      })}
    </>
  );
}
