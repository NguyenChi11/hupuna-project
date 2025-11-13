"use client";

import { useId } from "react";
import { Card } from "@/components/ui/_base/Card";
import { AvatarUploadArea } from "@/components/layouts/Form/AvatarUploadArea";

interface CustomerAvatarSectionProps {
  avatarPreview: string;
  customerName: string;
  onUploaded: (url: string) => void;
  isEditMode?: boolean;
}

export function CustomerAvatarSection({
  avatarPreview,
  customerName,
  onUploaded,
  isEditMode = false,
}: CustomerAvatarSectionProps) {
  const inputId = useId();

  return (
    <Card>
      <h2 className="text-lg font-semibold text-gray-900 mb-5">
        Avatar khách hàng
      </h2>

      <AvatarUploadArea
        avatarPreview={avatarPreview}
        customerName={customerName}
        onUploaded={onUploaded} // ✔ ĐÚNG
        isEditMode={isEditMode}
        inputId={inputId}
      />
    </Card>
  );
}
