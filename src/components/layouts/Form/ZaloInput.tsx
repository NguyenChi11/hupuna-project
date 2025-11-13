import { Input } from "@/components/ui/_base/Input";
import { Label } from "@/components/ui/_base/Label";

interface ZaloInputProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
}

export function ZaloInput({ id, value, onChange }: ZaloInputProps) {
  return (
    <div>
      <Label htmlFor={id}>Zalo tư vấn</Label>
      <Input
        id={id}
        type="text"
        placeholder="Ví dụ: 0912345678"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
