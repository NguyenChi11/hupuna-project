import { Customer } from "@/types/customers";
import {Employment} from "@/types/employment";

export default function ExchangeTab({ employee }: { employee: Employment }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Lịch sử trao đổi</h3>
      <div className="space-y-3">
        <div className="flex gap-3 text-sm">
          <div className="font-medium text-gray-700">10/11/2025</div>
          <div className="text-gray-600">Gọi điện - Tư vấn giải pháp kho</div>
        </div>
        <div className="flex gap-3 text-sm">
          <div className="font-medium text-gray-700">08/11/2025</div>
          <div className="text-gray-600">Gửi email - Báo giá chi tiết</div>
        </div>
      </div>
      <button className="text-blue-600 text-sm font-medium hover:underline">
        + Thêm trao đổi
      </button>
    </div>
  );
}
