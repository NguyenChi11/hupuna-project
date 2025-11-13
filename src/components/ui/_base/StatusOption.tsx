import { CUSTOMER_STATUS } from "@/types/constants";
import { StatusBadge } from "./StatusBadge";

interface StatusOptionProps {
  status: (typeof CUSTOMER_STATUS)[number];
  isSelected?: boolean;
}

export function StatusOption({ status, isSelected }: StatusOptionProps) {
  const { key, ...badgeProps } = status;
  return (
    <div
      key={key}
      className={`flex items-center gap-2 px-3 py-2 text-sm transition-colors ${
        isSelected
          ? "bg-[#111164]/5 font-medium text-[#111164]"
          : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      <StatusBadge {...badgeProps} />
    </div>
  );
}
