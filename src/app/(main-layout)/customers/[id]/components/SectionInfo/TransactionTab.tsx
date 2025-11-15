import { Customer } from "@/types/customers";

export default function TransactionTab({ customer }: { customer: Customer }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Lịch sử giao dịch</h3>
      <div className="text-sm text-gray-500 italic">Chưa có giao dịch nào</div>
      <button className="text-blue-600 text-sm font-medium hover:underline">
        + Tạo giao dịch
      </button>
    </div>
  );
}
