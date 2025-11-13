"use client";

import { Button } from "@/components/ui/_base/Button";
import { useRouter } from "next/navigation";

interface FormActionsProps {
  onCancel: () => void;
  submitLabel?: string;
}

export function FormActions({
  onCancel,
  submitLabel = "Lưu",
}: FormActionsProps) {
  return (
    <div className="flex gap-4 justify-end pt-4">
      <Button type="button" variant="secondary" onClick={onCancel}>
        Hủy
      </Button>
      <Button type="submit" variant="primary">
        {submitLabel}
      </Button>
    </div>
  );
}
