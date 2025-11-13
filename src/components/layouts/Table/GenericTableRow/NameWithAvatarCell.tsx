import { TableCell } from "@/components/ui/_base/TableCell";
import { Avatar } from "@/components/ui/_base/Avatar";

const AvatarFallback = () => (
  <svg className="w-full h-full" viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="16" r="16" fill="#e5e7eb" />
    <circle cx="16" cy="11" r="4" fill="#9ca3af" />
    <path d="M 16 16 Q 8 22 8 28 L 24 28 Q 24 22 16 16" fill="#9ca3af" />
  </svg>
);

interface NameWithAvatarCellProps {
  name: string;
  avatar?: string | null;
  href: string;
}

export function NameWithAvatarCell({
  name,
  avatar,
  href,
}: NameWithAvatarCellProps) {
  return (
    <TableCell>
      <a
        href={href}
        className="flex items-center gap-3 no-underline hover:no-underline group"
      >
        <Avatar src={avatar} alt={name} fallback={<AvatarFallback />} />
        <span className="text-[#111164] font-medium group-hover:underline">
          {name}
        </span>
      </a>
    </TableCell>
  );
}
