"use client";

import React from "react";
import { Avatar } from "@/components/ui/_base/Avatar";
import { FileInput } from "@/components/ui/_base/FileInput";
import { Button } from "@/components/ui/_base/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

interface AvatarUploadAreaProps {
  avatarPreview: string;
  customerName: string;
  onUploaded: (url: string) => void; // gửi preview ra ngoài
  isEditMode?: boolean;
  inputId: string;
}

export function AvatarUploadArea({
  avatarPreview,
  customerName,
  onUploaded,
  isEditMode = false,
  inputId,
}: AvatarUploadAreaProps) {
  const handleLocalImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file); // preview local
    onUploaded(previewUrl);

    // Nếu bạn muốn base64:
    // const reader = new FileReader();
    // reader.onloadend = () => onUploaded(reader.result as string);
    // reader.readAsDataURL(file);
  };

  return (
    <div className="flex items-center gap-6">
      <Avatar src={avatarPreview} alt={customerName} size="xl" />

      <div className="flex-1">
        <FileInput
          id={inputId}
          accept="image/*"
          onChange={handleLocalImage}
          label={
            <Button
              type="button" // KHÔNG SUBMIT FORM
              variant="secondary"
              icon={<FontAwesomeIcon icon={faUpload} className="h-4 w-4" />}
            >
              {isEditMode ? "Thay đổi ảnh đại diện" : "Tải lên ảnh đại diện"}
            </Button>
          }
          helperText="Hỗ trợ JPG, PNG, GIF (Max 5MB)"
        />
      </div>
    </div>
  );
}
