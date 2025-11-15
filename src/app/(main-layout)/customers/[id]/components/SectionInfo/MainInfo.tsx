import { Customer } from "@/types/customers";

export default function MainInfo({ customer }: { customer: Customer }) {
  const fields = [
    { label: "Tên khách hàng", value: customer.name },
    { label: "Email", value: customer.email || "-" },
    { label: "Điện thoại", value: customer.phone },
    { label: "Mã số thuế", value: customer.taxCode || "-" },
    { label: "Địa chỉ cụ thể", value: customer.address },
    { label: "Nhóm sản phẩm", value: customer.productGroup },
    { label: "Nhóm khách hàng", value: customer.customerSegment },
    { label: "Website", value: customer.website || "-" },
    { label: "Yêu cầu của khách hàng", value: customer.requirements },
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
