import { Checkbox } from "@/components/ui/_base/Checkbox";

interface SelectAllCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function SelectAllCheckbox({
  checked,
  onChange,
}: SelectAllCheckboxProps) {
  return (
    <th className="px-4 py-3 text-left w-12">
      <Checkbox
        id="select-all"
        checked={checked}
        onChange={(val) => onChange(val)}
      />
    </th>
  );
}
