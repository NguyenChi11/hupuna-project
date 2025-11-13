import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: ReactNode;
  className?: string;
}

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex h-6 items-center rounded-full bg-gray-100 px-2.5 font-medium text-gray-700 text-sm",
        className
      )}
    >
      {children}
    </span>
  );
}
