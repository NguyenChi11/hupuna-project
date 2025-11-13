import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ScrollAreaProps {
  children: ReactNode;
  className?: string;
}

export function ScrollArea({ children, className }: ScrollAreaProps) {
  return (
    <div
      className={cn(
        "max-h-48 overflow-y-auto border border-gray-200 rounded-lg p-3 bg-gray-50",
        className
      )}
    >
      {children}
    </div>
  );
}
