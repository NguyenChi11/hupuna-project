"use client";

import { Label } from "@/components/ui/_base/Label";
import { PRODUCT_GROUPS } from "@/lib/container_customers";
import { SimpleSelect } from "@/components/ui/_base/SimpleSelect";

interface ProductGroupSelectProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
}

export function ProductGroupSelect({
  id,
  value,
  onChange,
}: ProductGroupSelectProps) {
  return (
    <div>
      <Label htmlFor={id} required>
        Nhóm sản phẩm
      </Label>
      <SimpleSelect
        value={value}
        onChange={onChange}
        placeholder="Chọn nhóm sản phẩm"
        options={PRODUCT_GROUPS}
      />
    </div>
  );
}
