import { TableCell } from "@/components/ui/_base/TableCell";

interface DefaultCellProps {
  value: string | number | null | undefined;
}

export function DefaultCell({ value }: DefaultCellProps) {
  return <TableCell>{value || "-"}</TableCell>;
}
