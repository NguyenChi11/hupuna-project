import { ReactNode } from "react";

interface TableEmptyStateProps {
  message?: string;
  icon?: ReactNode;
}

export function TableEmptyState({
  message = "Không tìm thấy dữ liệu",
  icon,
}: TableEmptyStateProps) {
  return (
    <div className="text-center py-20 bg-muted/30 border border-dashed border-border rounded-lg">
      <div className="flex flex-col items-center gap-3">
        {icon || (
          <svg
            className="w-12 h-12 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )}
        <p className="text-lg font-medium text-foreground">{message}</p>
      </div>
    </div>
  );
}
