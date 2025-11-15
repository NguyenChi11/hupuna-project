import { Input } from "@/components/ui/_base/Input";
import { Label } from "@/components/ui/_base/Label";

interface InputFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  hasError?: boolean;
}

export function InputField({
  id,
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required,
  hasError,
}: InputFieldProps) {
  return (
    <div>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={hasError ? "border-red-500" : ""}
      />
    </div>
  );
}
