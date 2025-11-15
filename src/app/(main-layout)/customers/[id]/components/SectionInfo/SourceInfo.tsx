import { Customer } from "@/types/customers";
import { format } from "date-fns";

export default function SourceInfo({ customer }: { customer: Customer }) {
  return (
    <div className="text-sm space-y-3 border-t border-gray-200 pt-4">
      <h3 className="font-semibold text-gray-900">Nguồn thông tin</h3>
      <div className="grid grid-cols-2 gap-3 text-gray-600">
        <div>
          <span className="text-gray-500">Nguồn:</span> <strong>Website</strong>
        </div>
        <div>
          <span className="text-gray-500">Người tạo:</span>{" "}
          <strong>{customer.advisor}</strong>
        </div>
        <div>
          <span className="text-gray-500">Ngày tạo:</span>{" "}
          <strong>
            {customer.createdDate
              ? format(new Date(customer.createdDate), "dd/MM/yyyy")
              : "N/A"}
          </strong>
        </div>
        <div>
          <span className="text-gray-500">Đã mua:</span>{" "}
          <strong className="text-green-600">Có</strong>
        </div>
        <div>
          <span className="text-gray-500">Lần mua gần nhất:</span>{" "}
          <strong>15/10/2024</strong>
        </div>
      </div>
    </div>
  );
}
