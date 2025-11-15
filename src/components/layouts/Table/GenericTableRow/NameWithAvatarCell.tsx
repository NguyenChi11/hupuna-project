// @/components/ui/_base/NameWithAvatarCell.tsx
import { CustomerAvatar } from "@/components/layouts/CustomerAvatar";
import { TableCell } from "@/components/ui/_base/TableCell";

interface NameWithAvatarCellProps {
  name: string;
  avatar?: string | null; // ← customer.avatarUrl
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
        <CustomerAvatar
          src={avatar}
          alt={name}
          size="sm"
          className="ring-2 ring-white"
        />
        <span className="text-[#111164] font-medium group-hover:underline transition-colors">
          {name}
        </span>
      </a>
    </TableCell>
  );
}
