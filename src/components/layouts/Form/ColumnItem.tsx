import { Checkbox } from "@/components/ui/_base/Checkbox";

interface ColumnItemProps {
  columnKey: string;
  label: string;
  checked: boolean;
  onToggle: () => void;
}

export function ColumnItem({
  columnKey,
  label,
  checked,
  onToggle,
}: ColumnItemProps) {
  return (
    <Checkbox
      id={`col-${columnKey}`}
      checked={checked}
      onChange={onToggle}
      label={label}
    />
  );
}
