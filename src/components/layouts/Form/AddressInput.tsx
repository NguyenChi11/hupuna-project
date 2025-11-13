import { Input } from "@/components/ui/_base/Input";
import { Label } from "@/components/ui/_base/Label";

interface AddressInputProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
}

export function AddressInput({ id, value, onChange }: AddressInputProps) {
  return (
    <div className="md:col-span-2">
      <Label htmlFor={id} required>
        Địa chỉ cụ thể
      </Label>
      <Input
        id={id}
        type="text"
        placeholder="Nhập địa chỉ đầy đủ"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
      />
    </div>
  );
}
