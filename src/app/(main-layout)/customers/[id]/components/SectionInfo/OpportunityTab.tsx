import { Customer } from "@/types/customers";

export default function OpportunityTab({ customer }: { customer: Customer }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Cơ hội bán hàng</h3>
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-sm">
        <p className="font-medium text-green-900">Mở rộng hệ thống kho</p>
        <p className="text-green-700">Giá trị: 500.000.000 VNĐ</p>
        <p className="text-green-600 mt-1">Xác suất: 70%</p>
      </div>
      <button className="text-blue-600 text-sm font-medium hover:underline">
        + Tạo cơ hội
      </button>
    </div>
  );
}
