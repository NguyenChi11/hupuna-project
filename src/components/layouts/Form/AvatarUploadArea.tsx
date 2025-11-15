// @/components/layouts/Form/AvatarUploadArea.tsx
"use client";

import { useId } from "react";
import { Avatar } from "@/components/ui/_base/Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

interface AvatarUploadAreaProps {
  avatarPreview: string;
  customerName: string;
  onUploaded: (file: File | null, previewUrl: string) => void;
  isEditMode?: boolean;
}

export function AvatarUploadArea({
  avatarPreview,
  customerName,
  onUploaded,
  isEditMode = false,
}: AvatarUploadAreaProps) {
  const inputId = useId();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      onUploaded(null, "");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Ảnh không được vượt quá 5MB");
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    onUploaded(file, previewUrl); // ← chỉ trả file + preview
  };

  return (
    <div className="flex items-center gap-6">
      <Avatar src={avatarPreview} alt={customerName} size="xl" />

      <div className="flex-1 space-y-2">
        <label htmlFor={inputId} className="cursor-pointer inline-block">
          <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#111164]/20 focus:border-[#111164] active:scale-[0.98] transition-all duration-200">
            <FontAwesomeIcon icon={faUpload} className="h-4 w-4" />
            <span>
              {isEditMode ? "Thay đổi ảnh đại diện" : "Tải lên ảnh đại diện"}
            </span>
          </div>
        </label>

        <input
          id={inputId}
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="sr-only"
        />

        <p className="text-xs text-gray-500">
          Hỗ trợ JPG, PNG, GIF (Tối đa 5MB)
        </p>
      </div>
    </div>
  );
}
