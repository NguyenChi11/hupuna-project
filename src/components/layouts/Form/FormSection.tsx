import { ReactNode } from "react";

interface FormSectionProps {
  title: string;
  children: ReactNode;
}

export function FormSection({ title, children }: FormSectionProps) {
  return (
    <section className="space-y-5">
      <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      {children}
    </section>
  );
}
