import { Customer } from "@/types/customers";
import { format } from "date-fns";
import {Employment} from "@/types/employment";

export default function SourceInfo({ employee }: { employee: Employment }) {
  return (
    <div className="text-sm space-y-3 border-t border-gray-200 pt-4">
      <h3 className="font-semibold text-gray-900">Nguồn thông tin</h3>
      <div className="grid grid-cols-2 gap-3 text-gray-600">
        <div>
          <span className="text-gray-500">Ngày làm việc:</span>{" "}
          <strong>
            {employee.hireDate
              ? format(new Date(employee.hireDate), "dd/MM/yyyy")
              : "N/A"}
          </strong>
        </div>

        <div>
          <span className="text-gray-500">Liên hệ lần cuối:</span>{" "}
          <strong>{employee.lastContact}</strong>
        </div>
      </div>
    </div>
  );
}
