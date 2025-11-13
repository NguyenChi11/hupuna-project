import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  children: ReactNode;
  icon?: ReactNode;
}

export function Button({
  variant = "secondary",
  children,
  icon,
  className,
  ...props
}: ButtonProps) {
  const variants = {
    primary: "bg-[#111164] text-white hover:bg-[#2b2cd8]",
    secondary:
      "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium",
        "focus:outline-none focus:ring-2 focus:ring-[#111164]/20 focus:border-[#111164]",
        "active:scale-[0.98] transition-all duration-200",
        variants[variant],
        className
      )}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}
