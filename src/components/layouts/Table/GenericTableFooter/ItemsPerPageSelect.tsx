// src/components/ui/select/ItemsPerPageSelect.tsx
"use client";

import { Select } from "@/components/ui/_base/Select";

const options = [
  { value: "10", label: "10 / trang" },
  { value: "20", label: "20 / trang" },
  { value: "50", label: "50 / trang" },
];

interface Props {
  value: string;
  onChange: (value: string) => void;
}
export function ItemsPerPageSelect({ value, onChange }: Props) {
  return (
    <Select
      value={value}
      onValueChange={onChange}
      options={options}
      placeholder="Số dòng"
      className="w-32"
    />
  );
}
