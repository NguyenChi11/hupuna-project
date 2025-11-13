"use client";

import { useId } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

interface CustomerAvatarSectionProps {
  avatarPreview: string;
  customerName: string;
  onAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isEditMode?: boolean;
}

export function CustomerAvatarSection({
  avatarPreview,
  customerName,
  onAvatarChange,
  isEditMode = false,
}: CustomerAvatarSectionProps) {
  const inputId = useId();

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-5 shadow-sm">
      {/* Title */}
      <h2 className="text-lg font-semibold text-gray-900">Avatar khách hàng</h2>

      {/* Avatar + Upload */}
      <div className="flex items-center gap-6">
        {/* Avatar */}
        <div className="relative w-24 h-24 rounded-full overflow-hidden ring-4 ring-white shadow-md">
          {avatarPreview ? (
            <img
              src={avatarPreview}
              alt={customerName}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-gray-200 to-gray-300">
              <span className="text-3xl font-bold text-gray-600">
                {customerName.charAt(0).toUpperCase() || "?"}
              </span>
            </div>
          )}
        </div>

        {/* Upload Button */}
        <div className="flex-1">
          <label htmlFor={inputId} className="cursor-pointer block">
            <div
              className={`
                inline-flex items-center gap-2 px-4 py-2.5 rounded-lg
                border border-gray-300 bg-white text-sm font-medium text-gray-700
                hover:bg-gray-50 hover:border-gray-400
                focus:outline-none focus:ring-2 focus:ring-[#111164]/20 focus:border-[#111164]
                active:scale-[0.98] transition-all duration-200
              `}
            >
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
            onChange={onAvatarChange}
            className="sr-only"
          />

          <p className="mt-2 text-xs text-gray-500">
            Hỗ trợ JPG, PNG, GIF (Max 5MB)
          </p>
        </div>
      </div>
    </div>
  );
}
