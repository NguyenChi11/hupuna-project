import { format } from "date-fns";
import {Employment} from "@/types/employment";

const fields = [
  { label: "Tên", value: (c: Employment) => c.fullName },
  { label: "Điện thoại", value: (c: Employment) => c.phone },
  {
    label: "Sinh nhật",
    value: (c: Employment) =>
      c.birthday ? format(new Date(c.birthday), "dd/MM/yyyy") : "-",
  },
  { label: "Địa chỉ", value: (c: Employment) => c.address },
  { label: "Email", value: (c: Employment) => c.email || "-" },
  { label: "Giới tính", value: () => "Nam" }, // Cập nhật sau
];

export default function QuickInfoCard({ employee }: { employee: Employment }) {
  return (
    <div className="grid grid-cols-2 gap-3 p-4 bg-gray-50 rounded-lg text-sm">
      {fields.map((field) => (
        <div key={field.label}>
          <p className="text-gray-500">{field.label}</p>
          <p className="font-medium text-gray-900 truncate">
            {field.value(employee)}
          </p>
        </div>
      ))}
    </div>
  );
}
