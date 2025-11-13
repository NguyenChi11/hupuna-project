// components/empty/OrderTableEmpty.tsx

import { EmptyState } from "@/components/ui/_base/EmptyState";
import { Package } from "lucide-react";

export function OrderTableEmpty() {
  return (
    <EmptyState
      icon={<Package className="w-12 h-12" />}
      title="Chưa có đơn hàng nào"
      description="Bắt đầu nhận đơn hàng đầu tiên của bạn ngay hôm nay!"
    />
  );
}
