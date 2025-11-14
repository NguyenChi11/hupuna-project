import { Customer } from "@/types/customers";

export default function OtherInfo({ customer }: { customer: Customer }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Thông tin khác
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-gray-500">Zalo tư vấn</p>
          <p className="font-medium">{customer.zaloConsultant}</p>
        </div>
        <div>
          <p className="text-gray-500">Tư vấn viên</p>
          <p className="font-medium">{customer.consultant}</p>
        </div>
        <div>
          <p className="text-gray-500">Khu vực</p>
          <p className="font-medium">{customer.region}</p>
        </div>
        <div>
          <p className="text-gray-500">Tình trạng</p>
          <p className="font-medium">{customer.customerStatus}</p>
        </div>
      </div>
    </div>
  );
}
