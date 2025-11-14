/* eslint-disable @next/next/no-img-element */
// @/components/ui/_base/Avatar.tsx
import { cn } from "@/lib/utils";
import Image from "next/image";

interface AvatarProps {
  src?: string | null;
  alt: string;
  fallback?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeMap = {
  sm: "w-10 h-10 text-lg",
  md: "w-16 h-16 text-2xl",
  lg: "w-20 h-20 text-3xl",
  xl: "w-24 h-24 text-4xl",
};

export function Avatar({
  src,
  alt,
  fallback,
  size = "md",
  className,
}: AvatarProps) {
  const initials = fallback || (alt ? alt.charAt(0).toUpperCase() : "?");

  // Dùng <img> nếu là /uploads/* hoặc blob:
  const isLocalOrFake =
    src?.startsWith("/uploads/") ||
    src?.startsWith("blob:") ||
    src?.startsWith("data:");

  return (
    <div
      className={cn(
        "relative rounded-full overflow-hidden ring-4 ring-white shadow-md",
        sizeMap[size],
        className
      )}
    >
      {src ? (
        isLocalOrFake ? (
          // Dùng <img> → không lỗi 400
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = "none";
              e.currentTarget.nextElementSibling?.classList.remove("hidden");
            }}
          />
        ) : (
          // Dùng next/image cho ảnh thật
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            onError={(e) => {
              e.currentTarget.style.display = "none";
              e.currentTarget.nextElementSibling?.classList.remove("hidden");
            }}
          />
        )
      ) : null}

      <div
        className={cn(
          "flex items-center justify-center w-full h-full bg-linear-to-br from-gray-200 to-gray-300",
          src && "hidden"
        )}
      >
        <span
          className={`font-bold text-gray-600 ${sizeMap[size].split(" ")[2]}`}
        >
          {initials}
        </span>
      </div>
    </div>
  );
}
