import { cn } from "@/lib/utils";

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
  const initials = fallback || alt.charAt(0).toUpperCase() || "?";

  return (
    <div
      className={cn(
        "relative rounded-full overflow-hidden ring-4 ring-white shadow-md",
        sizeMap[size],
        className
      )}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <div className="flex items-center justify-center w-full h-full bg-linear-to-br from-gray-200 to-gray-300">
          <span
            className={`font-bold text-gray-600 ${sizeMap[size].split(" ")[2]}`}
          >
            {initials}
          </span>
        </div>
      )}
    </div>
  );
}
