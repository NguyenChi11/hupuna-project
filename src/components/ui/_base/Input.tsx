import { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode; // Đổi từ iconLeft thành icon (phù hợp với tên gọi trong usage)
}

export function Input({ className, icon, ...props }: InputProps) {
  return (
    <div className="relative">
      {icon && (
        <div className="pointer-events-none absolute left-3 top-2/5 -translate-y-1/2 h-4 w-4 text-gray-400">
          {icon}
        </div>
      )}
      <input
        className={cn(
          "w-full px-3 py-2 text-sm rounded-md border border-gray-300",
          "bg-white text-gray-900 placeholder:text-gray-400",
          "focus:outline-none focus:ring-2 focus:ring-[#111164]/20 focus:border-[#111164]",
          "transition-all duration-200",
          icon ? "pl-10" : "pl-3",
          className
        )}
        {...props}
      />
    </div>
  );
}
