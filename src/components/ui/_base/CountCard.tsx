import { ReactNode } from "react";
import { bricolageGrotesque } from "@/fonts";

interface CountCardProps {
  icon: ReactNode;
  title: string;
  count: string;
  label: string;
}

export function CountCard({ icon, title, count, label }: CountCardProps) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-amber-50/60 p-3 shadow-sm ring-1 ring-amber-200/50">
      <div className="flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-linear-to-br from-[#111164] to-[#2a2a8b] text-white">
          {icon}
        </div>
        <h1
          className={`text-2xl font-bold tracking-tight text-[#111164] ${bricolageGrotesque.className}`}
        >
          {title}
        </h1>
      </div>
      <div className="flex items-center gap-1.5 text-sm text-gray-600">
        <span className={`${bricolageGrotesque.className}`}>Tổng cộng:</span>
        <span className="inline-flex h-6 items-center rounded-full bg-gray-100 px-2.5 font-medium text-gray-700">
          {count}
        </span>
        <span>{label}</span>
      </div>
    </div>
  );
}
