"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface SelectRichOption {
  value: string;
  label: string;
  render: React.ReactNode;
}

interface SelectRichProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectRichOption[];
  placeholder?: string;
  className?: string;
}

export function SelectRich({
  value,
  onChange,
  options,
  placeholder = "Chọn một mục",
  className,
}: SelectRichProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);

  const display = selected ? (
    <div className="flex items-center gap-2">{selected.render}</div>
  ) : (
    <span className="text-gray-400">{placeholder}</span>
  );

  // click outside
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
      <button
        ref={triggerRef}
        onClick={() => setOpen(!open)}
        type="button"
        className="flex h-9 w-full items-center justify-between rounded-md border bg-white px-3 py-2 text-sm hover:bg-gray-50"
      >
        {display}

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

      {open && (
        <div
          ref={dropdownRef}
          className="absolute z-50 mt-1 w-full rounded-md border bg-white shadow-lg max-h-60 overflow-y-auto"
        >
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={cn(
                "flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-gray-100",
                value === opt.value &&
                  "bg-[#111164]/5 font-medium text-[#111164]"
              )}
            >
              {opt.render}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
