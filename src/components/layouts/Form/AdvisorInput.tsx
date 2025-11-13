import { Input } from "@/components/ui/_base/Input";
import { Label } from "@/components/ui/_base/Label";

interface AdvisorInputProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
}

export function AdvisorInput({ id, value, onChange }: AdvisorInputProps) {
  return (
    <div>
      <Label htmlFor={id}>Người tư vấn</Label>
      <Input
        id={id}
        type="text"
        placeholder="Nhập tên người tư vấn"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
