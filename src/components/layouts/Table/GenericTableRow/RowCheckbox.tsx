import { Checkbox } from "@/components/ui/_base/Checkbox";

interface RowCheckboxProps {
  checked: boolean;
  onChange: () => void;
}

export function RowCheckbox({ checked, onChange }: RowCheckboxProps) {
  return (
    <td className="px-4 py-4">
      <Checkbox checked={checked} onChange={onChange} />
    </td>
  );
}
