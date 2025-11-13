import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FormGridProps {
  children: ReactNode;
  className?: string;
}

export function FormGrid({ children, className }: FormGridProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-5", className)}>
      {children}
    </div>
  );
}
