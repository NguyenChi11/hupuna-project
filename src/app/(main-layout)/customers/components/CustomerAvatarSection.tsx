// @/app/(main-layout)/customers/components/CustomerAvatarSection.tsx
"use client";

import { Card } from "@/components/ui/_base/Card";
import { AvatarUploadArea } from "@/components/layouts/Form/AvatarUploadArea";

interface CustomerAvatarSectionProps {
  avatarPreview: string;
  customerName: string;
  onUploaded: (file: File | null, previewUrl: string) => void;
  isEditMode?: boolean;
}

export function CustomerAvatarSection({
  avatarPreview,
  customerName,
  onUploaded,
  isEditMode = false,
}: CustomerAvatarSectionProps) {
  return (
    <Card>
      <h2 className="text-lg font-semibold text-gray-900 mb-5">
        Avatar khách hàng
      </h2>
      <AvatarUploadArea
        avatarPreview={avatarPreview}
        customerName={customerName}
        onUploaded={onUploaded}
        isEditMode={isEditMode}
      />
    </Card>
  );
}
