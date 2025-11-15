import {Employment} from "@/types/employment";

export default function MainInfo({ employee }: { employee: Employment }) {
  const fields = [
    { label: "Tên nhân viên", value: employee.fullName },
    { label: "Email", value: employee.email || "-" },
    { label: "Điện thoại", value: employee.phone },
    { label: "Mã số thuế", value: employee.taxCode || "-" },
    { label: "Địa chỉ cụ thể", value: employee.address },
    { label: "Phòng ban", value: employee.department },
    { label: "Vị trí", value: employee.position },
    { label: "Loại nhân viên", value: employee.employmentType || "-" },
    { label: "Zalo quản lý", value: employee.zaloManager },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Thông tin chính
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        {fields.map((f) => (
          <div key={f.label}>
            <p className="text-gray-500">{f.label}</p>
            <p className="font-medium text-gray-900">{f.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
