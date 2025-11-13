"use client";

import { Label } from "@/components/ui/_base/Label";
import { CONSULTANTS } from "@/lib/container_customers";
import { SimpleSelect } from "@/components/ui/_base/SimpleSelect";

interface ConsultantSelectProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
}

export function ConsultantSelect({
  id,
  value,
  onChange,
}: ConsultantSelectProps) {
  return (
    <div>
      <Label htmlFor={id} required>
        Nhân viên tư vấn
      </Label>
      <SimpleSelect
        value={value}
        onChange={onChange}
        placeholder="Chọn nhân viên tư vấn"
        options={CONSULTANTS}
      />
    </div>
  );
}
