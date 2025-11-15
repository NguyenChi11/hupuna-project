import { Checkbox } from "@/components/ui/_base/Checkbox";

interface RowCheckboxProps {
  checked: boolean;
  onChange: () => void;
  /** ID duy nhất cho mỗi dòng (bắt buộc do Checkbox yêu cầu) */
  rowId: string;
}

export function RowCheckbox({ checked, onChange, rowId }: RowCheckboxProps) {
  return (
    <td className="px-4 py-4 w-12">
      <Checkbox
        id={`row-checkbox-${rowId}`} // BẮT BUỘC: truyền id
        checked={checked}
        onChange={onChange} // () => void → đúng type
      />
    </td>
  );
}
