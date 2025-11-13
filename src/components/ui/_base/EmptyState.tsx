import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "text-center py-20 bg-muted/30 border border-dashed border-border rounded-lg",
        className
      )}
    >
      <div className="flex flex-col items-center gap-4 max-w-sm mx-auto">
        {icon && <div className="text-muted-foreground">{icon}</div>}

        <div className="space-y-1">
          <p className="text-lg font-medium text-foreground">{title}</p>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>

        {action && <div className="mt-2">{action}</div>}
      </div>
    </div>
  );
}
