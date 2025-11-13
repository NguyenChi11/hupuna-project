import { Button } from "@/components/ui/_base/Button";
import { EmptyState } from "@/components/ui/_base/EmptyState";
import { Plus } from "lucide-react"; // hoặc dùng FontAwesome

const defaultIcon = (
  <svg
    className="w-12 h-12"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

export function CustomerTableEmpty() {
  return (
    <EmptyState
      icon={defaultIcon}
      title="Không tìm thấy khách hàng"
      description="Không có khách hàng phù hợp với bộ lọc của bạn. Hãy thử điều chỉnh bộ lọc hoặc thêm khách hàng mới."
      action={
        <Button
          onClick={() => (window.location.href = "/customers/add")}
          className="mt-2 w-56"
          variant="primary"
        >
          <Plus className="w-4 h-4 mr-2" />
          Thêm khách hàng
        </Button>
      }
    />
  );
}
