import { SimpleSelect } from "@/components/ui/_base/SimpleSelect";
import { Label } from "@/components/ui/_base/Label";
import { REGIONS } from "@/lib/container_customers";

interface RegionSelectProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
}

export function RegionSelect({ id, value, onChange }: RegionSelectProps) {
  return (
    <div>
      <Label htmlFor={id} required>
        Khu vực
      </Label>

      <SimpleSelect
        value={value}
        onChange={onChange}
        options={[...REGIONS]}
        placeholder="Chọn khu vực"
      />
    </div>
  );
}
