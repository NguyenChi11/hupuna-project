import { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  iconLeft?: React.ReactNode;
}

export function Input({ className, iconLeft, ...props }: InputProps) {
  return (
    <div className="relative">
      {iconLeft && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400">
          {iconLeft}
        </div>
      )}
      <input
        className={cn(
          "w-full px-3 py-2 text-sm rounded-md border border-gray-300",
          "bg-white text-gray-900 placeholder:text-gray-400",
          "focus:outline-none focus:ring-2 focus:ring-[#111164]/20 focus:border-[#111164]",
          "transition-all duration-200",
          iconLeft ? "pl-10" : "",
          className
        )}
        {...props}
      />
    </div>
  );
}
