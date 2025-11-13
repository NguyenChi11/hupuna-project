import { Input } from "@/components/ui/_base/Input";
import { Label } from "@/components/ui/_base/Label";

interface BirthdayInputProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
}

export function BirthdayInput({ id, value, onChange }: BirthdayInputProps) {
  return (
    <div>
      <Label htmlFor={id}>Sinh nhật</Label>
      <Input
        id={id}
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="[&::-webkit-calendar-picker-indicator]:opacity-60"
      />
    </div>
  );
}
