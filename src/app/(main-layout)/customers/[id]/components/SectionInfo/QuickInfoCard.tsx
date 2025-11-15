import { Customer } from "@/types/customers";
import { format } from "date-fns";

const fields = [
  { label: "Tên", value: (c: Customer) => c.name },
  { label: "Điện thoại", value: (c: Customer) => c.phone },
  {
    label: "Sinh nhật",
    value: (c: Customer) =>
      c.birthday ? format(new Date(c.birthday), "dd/MM/yyyy") : "-",
  },
  { label: "Địa chỉ", value: (c: Customer) => c.address },
  { label: "Email", value: (c: Customer) => c.email || "-" },
  { label: "Giới tính", value: () => "Nam" }, // Cập nhật sau
];

export default function QuickInfoCard({ customer }: { customer: Customer }) {
  return (
    <div className="grid grid-cols-2 gap-3 p-4 bg-gray-50 rounded-lg text-sm">
      {fields.map((field) => (
        <div key={field.label}>
          <p className="text-gray-500">{field.label}</p>
          <p className="font-medium text-gray-900 truncate">
            {field.value(customer)}
          </p>
        </div>
      ))}
    </div>
  );
}
