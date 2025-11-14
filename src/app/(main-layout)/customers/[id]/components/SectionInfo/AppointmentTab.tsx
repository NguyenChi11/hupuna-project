import { Customer } from "@/types/customers";

export default function AppointmentTab({ customer }: { customer: Customer }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Lịch hẹn</h3>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm">
        <p className="font-medium text-blue-900">Gặp mặt tư vấn</p>
        <p className="text-blue-700">15/11/2025 - 14:00</p>
        <p className="text-blue-600 mt-1">Địa điểm: Văn phòng ABC</p>
      </div>
      <button className="text-blue-600 text-sm font-medium hover:underline">
        + Đặt lịch hẹn
      </button>
    </div>
  );
}
