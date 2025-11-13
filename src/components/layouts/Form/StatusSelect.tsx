"use client";

import { SelectRich } from "@/components/ui/_base/SelectRich";
import { StatusBadge } from "@/components/ui/_base/StatusBadge";
import { CUSTOMER_STATUS } from "@/types/constants";

interface StatusSelectProps {
  value: string; // phải là key, ví dụ: "missing_info"
  onChange: (value: string) => void;
}

export function StatusSelect({ value, onChange }: StatusSelectProps) {
  const options = CUSTOMER_STATUS.map((status) => {
    const { key, ...props } = status;
    return {
      value: key,
      label: status.label,
      render: <StatusBadge {...props} />, // Không dùng key ở đây (tránh re-render sai)
    };
  });

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        Tình trạng khách hàng
      </label>

      <SelectRich
        value={value}
        onChange={onChange}
        placeholder="Chọn tình trạng"
        options={options}
      />
    </div>
  );
}
