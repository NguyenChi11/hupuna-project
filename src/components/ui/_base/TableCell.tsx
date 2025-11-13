import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TableCellProps {
  children: ReactNode;
  className?: string;
  align?: "left" | "center" | "right";
}

export function TableCell({
  children,
  className,
  align = "left",
}: TableCellProps) {
  return (
    <td
      className={cn(
        "px-6 py-4 text-sm text-gray-900 whitespace-nowrap",
        align === "center" && "text-center",
        align === "right" && "text-right",
        className
      )}
    >
      {children}
    </td>
  );
}
