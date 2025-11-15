import { STATUS_CONFIG } from "@/lib/data_customers";

export default function StatusBadge({ status }: { status: string }) {
  const config = STATUS_CONFIG[status as keyof typeof STATUS_CONFIG] || {
    label: status,
    bgColor: "#6B7280",
    textColor: "#FFFFFF",
  };

  return (
    <span
      className="px-3 py-1 rounded-full text-xs font-medium"
      style={{ backgroundColor: config.bgColor, color: config.textColor }}
    >
      {config.label}
    </span>
  );
}
