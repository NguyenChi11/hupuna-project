import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  label: string;
  bgColor: string;
  textColor: string;
}

export function StatusBadge({ label, bgColor, textColor }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
      )}
      style={{
        backgroundColor: bgColor,
        color: textColor,
      }}
    >
      {label}
    </span>
  );
}
