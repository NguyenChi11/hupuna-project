/* eslint-disable @next/next/no-img-element */
// @/components/ui/CustomerAvatar.tsx
import React from "react";

interface CustomerAvatarProps {
  src?: string | null;
  alt: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-12 h-12",
};

export function CustomerAvatar({
  src,
  alt,
  size = "sm",
  className = "",
}: CustomerAvatarProps) {
  const hasImage = src && src.trim() !== "";

  return (
    <div
      className={`
        ${sizeClasses[size]} 
        rounded-full overflow-hidden 
        bg-gray-100 border-2 border-dashed border-gray-300
        flex items-center justify-center
        ring-2 ring-white shadow-sm
        ${className}
      `}
    >
      {hasImage ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Khi ảnh lỗi → ẩn ảnh, hiện placeholder
            e.currentTarget.style.display = "none";
            e.currentTarget.parentElement?.classList.add("bg-gray-100");
          }}
        />
      ) : (
        // Placeholder khi không có ảnh
        <svg
          className="w-4 h-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      )}
    </div>
  );
}
