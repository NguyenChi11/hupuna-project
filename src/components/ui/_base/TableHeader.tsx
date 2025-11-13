import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TableHeaderProps {
  children: ReactNode;
  className?: string;
}

export function TableHeader({ children, className }: TableHeaderProps) {
  return (
    <thead>
      <tr className={cn("bg-gray-50 border-b border-gray-200", className)}>
        {children}
      </tr>
    </thead>
  );
}
