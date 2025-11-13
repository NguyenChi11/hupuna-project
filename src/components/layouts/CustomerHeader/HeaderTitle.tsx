import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { CountCard } from "@/components/ui/_base/CountCard";

interface HeaderTitleProps {
  totalCount: number;
}

export function HeaderTitle({ totalCount }: HeaderTitleProps) {
  const formattedCount = totalCount.toLocaleString("vi-VN");

  return (
    <CountCard
      icon={<FontAwesomeIcon icon={faUsers} className="h-5 w-5" />}
      title="Danh sách khách hàng"
      count={formattedCount}
      label="khách hàng"
    />
  );
}
