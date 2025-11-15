import { Customer } from "@/types/customers";

export default function FeedbackTab({ customer }: { customer: Customer }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">
        Phản hồi khách hàng
      </h3>
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm">
        <p className="font-medium text-yellow-900">Cần giảm giá 10%</p>
        <p className="text-yellow-700 mt-1">Ngày: 05/11/2025</p>
      </div>
      <button className="text-blue-600 text-sm font-medium hover:underline">
        + Ghi nhận phản hồi
      </button>
    </div>
  );
}
