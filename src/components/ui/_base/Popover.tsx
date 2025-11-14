import { useState, ReactNode } from "react";

interface PopoverProps {
  trigger: ReactNode;
  children: ReactNode;
  align?: "left" | "right";
  direction?: "top" | "bottom";
}

export function Popover({ trigger, children, align = "right", direction = "bottom" }: PopoverProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <div onClick={() => setOpen(!open)} className="cursor-pointer">
        {trigger}
      </div>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div
            className={`
              absolute z-50 w-96 max-h-96 overflow-y-auto rounded-lg bg-white p-4 shadow-xl border border-gray-200
              ${align === "right" ? "right-0" : "left-0"}
               ${direction === "bottom" ? "bottom-full mb-2" : "top-full mt-2"}
            `}
          >
            {children}
          </div>
        </>
      )}
    </div>
  );
}
