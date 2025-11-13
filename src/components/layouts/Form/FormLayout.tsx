import { ReactNode } from "react";

interface FormLayoutProps {
  children: ReactNode;
  onSubmit: (e: React.FormEvent) => void;
}

export function FormLayout({ children, onSubmit }: FormLayoutProps) {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <form onSubmit={onSubmit} className="space-y-6">
          {children}
        </form>
      </div>
    </main>
  );
}
