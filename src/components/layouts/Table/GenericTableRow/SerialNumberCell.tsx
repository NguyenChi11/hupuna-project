import { TableCell } from "@/components/ui/_base/TableCell";

interface SerialNumberCellProps {
  number: number;
}

export function SerialNumberCell({ number }: SerialNumberCellProps) {
  return <TableCell>{number}</TableCell>;
}
