import { Customer } from "@/types/customers";

export default function ReferralTab({ customer }: { customer: Customer }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Giới thiệu</h3>
      <div className="text-sm text-gray-500 italic">
        Chưa có khách hàng nào được giới thiệu
      </div>
      <button className="text-blue-600 text-sm font-medium hover:underline">
        + Gửi yêu cầu giới thiệu
      </button>
    </div>
  );
}
