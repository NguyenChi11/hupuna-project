import { Input } from "@/components/ui/_base/Input";
import { Label } from "@/components/ui/_base/Label";

interface RequirementsInputProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
}

export function RequirementsInput({
  id,
  value,
  onChange,
}: RequirementsInputProps) {
  return (
    <div>
      <Label htmlFor={id}>Yêu cầu của khách hàng</Label>
      <Input
        id={id}
        type="text"
        placeholder="Nhập yêu cầu của khách hàng"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
