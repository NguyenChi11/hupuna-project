import { Avatar } from "@/components/ui/_base/Avatar";
import { TableCell } from "@/components/ui/_base/TableCell";

interface AvatarCellProps {
  name: string;
  avatar?: string;
  href?: string;
}

const AvatarFallback = () => (
  <svg className="w-full h-full" viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="16" r="16" fill="#e5e7eb" />
    <circle cx="16" cy="11" r="4" fill="#9ca3af" />
    <path d="M 16 16 Q 8 22 8 28 L 24 28 Q 24 22 16 16" fill="#9ca3af" />
  </svg>
);

export function AvatarCell({ name, avatar, href }: AvatarCellProps) {
  const content = (
    <div className="flex items-center gap-3">
      <Avatar src={avatar} alt={name} fallback={<AvatarFallback />} />
      <span className="text-[#111164] font-medium hover:underline">{name}</span>
    </div>
  );

  return (
    <TableCell>
      {href ? (
        <a href={href} className="block no-underline hover:no-underline">
          {content}
        </a>
      ) : (
        content
      )}
    </TableCell>
  );
}
