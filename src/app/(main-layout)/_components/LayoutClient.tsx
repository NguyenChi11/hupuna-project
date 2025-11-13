"use client";

import Sidebar from "./Sidebar";
import { useSidebar } from "./SidebarContext";
import { cn } from "@/lib/utils";
export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const { collapsed } = useSidebar();

  return (
    <>
      <Sidebar />
      <main
        className={cn(
          "min-h-screen transition-all duration-300 ease-in-out bg-gray-50 sm:p-6 p-0 overflow-y-auto",
          collapsed ? "ml-16" : "ml-64"
        )}
      >
        {children}
      </main>
    </>
  );
}
