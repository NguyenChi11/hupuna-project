"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface SelectOption {
  value: string;
  label: string;
  render?: React.ReactNode;
}

interface SelectProps {
  value: string;
  onValueChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
  dropdownClassName?: string;
  disabled?: boolean;
}

export function Select({
  value,
  onValueChange,
  options = [],
  placeholder = "Chọn một mục",
  className,
  dropdownClassName,
  disabled = false,
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);

  // Hiển thị label
  const displayLabel = selected ? (
    <span className="flex items-center gap-2">
      {selected.render ?? selected.label}
    </span>
  ) : (
    <span className="text-gray-400">{placeholder}</span>
  );

  // Click outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        triggerRef.current &&
        dropdownRef.current &&
        !triggerRef.current.contains(e.target as Node) &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className={cn("relative", className)}>
      {/* Trigger */}
      <button
        ref={triggerRef}
        type="button"
        disabled={disabled}
        onClick={() => setOpen(!open)}
        className={cn(
          "flex h-9 w-full items-center justify-between rounded-md border px-3 py-2 text-sm bg-white hover:bg-gray-50",
          disabled && "cursor-not-allowed opacity-50"
        )}
      >
        {displayLabel}

        <svg
          className={cn(
            "h-4 w-4 text-gray-500 transition-transform",
            open && "rotate-180"
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div
          ref={dropdownRef}
          className={cn(
            "absolute z-50 mt-1 w-full rounded-md border bg-white shadow-lg max-h-60 overflow-y-auto",
            dropdownClassName // ← Dùng class từ ngoài, override nếu cần
          )}
        >
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                onValueChange(opt.value);
                setOpen(false);
              }}
              className={cn(
                "flex w-full px-3 py-2 text-left text-sm hover:bg-gray-100",
                value === opt.value && "bg-[#111164]/5 font-medium"
              )}
            >
              {opt.render ?? opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
