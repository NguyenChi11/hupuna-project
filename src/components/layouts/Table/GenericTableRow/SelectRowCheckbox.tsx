import { Checkbox } from "@/components/ui/_base/Checkbox";

interface SelectRowCheckboxProps {
  checked: boolean;
  onChange: () => void;
}

export function SelectRowCheckbox({
  checked,
  onChange,
}: SelectRowCheckboxProps) {
  return (
    <td className="px-4 py-4">
      <Checkbox checked={checked} onChange={onChange} />
    </td>
  );
}
