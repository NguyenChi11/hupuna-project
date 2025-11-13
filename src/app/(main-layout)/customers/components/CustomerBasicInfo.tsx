"use client";

import { useId, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

export const CUSTOMER_STATUS = [
  {
    key: "missing_info",
    label: "THIẾU THÔNG TIN",
    bgColor: "#FCD34D",
    textColor: "#92400E",
  },
  {
    key: "completed",
    label: "HOÀN THÀNH",
    bgColor: "#EF4444",
    textColor: "#FFFFFF",
  },
  {
    key: "new_lead",
    label: "LEAD MỚI",
    bgColor: "#EF4444",
    textColor: "#FFFFFF",
  },
  {
    key: "cannot_finalize",
    label: "KHÔNG CHỐT ĐƯỢC THÔNG SỐ",
    bgColor: "#1E3A8A",
    textColor: "#FFFFFF",
  },
  {
    key: "consulting",
    label: "ĐANG TƯ VẤN",
    bgColor: "#0E7490",
    textColor: "#FFFFFF",
  },
  {
    key: "waiting_quote",
    label: "ĐỢI KÈ TOÀN BẢO GIÁ",
    bgColor: "#2563EB",
    textColor: "#FFFFFF",
  },
  {
    key: "sent_quote",
    label: "ĐÃ GỬI BẢO GIÁ KHÁCH",
    bgColor: "#22C55E",
    textColor: "#FFFFFF",
  },
  {
    key: "order_closed",
    label: "CHỐT ĐƠN",
    bgColor: "#DC2626",
    textColor: "#FFFFFF",
  },
  {
    key: "not_closed",
    label: "KHÔNG CHỐT",
    bgColor: "#FCD34D",
    textColor: "#92400E",
  },
  {
    key: "cannot_contact",
    label: "KHÔNG LIÊN HỆ ĐƯỢC KHÁCH",
    bgColor: "#15803D",
    textColor: "#FFFFFF",
  },
];

interface CustomerBasicInfoProps {
  customerId: string;
  name: string;
  phone: string;
  email: string;
  customerStatus: string;
  onInputChange: (field: string, value: unknown) => void;
}

// === Tự xây Select ===
const CustomSelect = ({
  value,
  onValueChange,
  placeholder,
  options,
}: {
  value: string;
  onValueChange: (value: string) => void;
  placeholder: string;
  options: typeof CUSTOMER_STATUS;
}) => {
  const [open, setOpen] = useState(false);
  const selected = options.find((opt) => opt.label === value);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`
          flex h-10 w-full items-center justify-between rounded-md border border-gray-300
          bg-white px-3 py-2 text-sm text-left text-gray-900
          hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#111164]/20 focus:border-[#111164]
          transition-all duration-200
        `}
      >
        <span className={value ? "" : "text-gray-400"}>
          {selected ? (
            <div className="flex items-center gap-2">
              <span
                className="inline-block w-3.5 h-3.5 rounded-full"
                style={{
                  backgroundColor: selected.bgColor,
                  border: `1px solid ${selected.textColor}`,
                }}
              />
              <span>{selected.label}</span>
            </div>
          ) : (
            placeholder
          )}
        </span>
        <FontAwesomeIcon
          icon={faChevronDown}
          className={`h-4 w-4 text-gray-400 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg border border-gray-200 max-h-60 overflow-y-auto">
          {options.map((option) => (
            <button
              key={option.key}
              onClick={() => {
                onValueChange(option.label);
                setOpen(false);
              }}
              className={`
                flex w-full items-center gap-2 px-3 py-2 text-left text-sm
                hover:bg-gray-100 transition-colors
                ${value === option.label ? "bg-gray-50" : ""}
              `}
            >
              <span
                className="inline-block w-3.5 h-3.5 rounded-full"
                style={{
                  backgroundColor: option.bgColor,
                  border: `1px solid ${option.textColor}`,
                }}
              />
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export function CustomerBasicInfo({
  customerId,
  name,
  phone,
  email,
  customerStatus,
  onInputChange,
}: CustomerBasicInfoProps) {
  const inputIds = {
    customerId: useId(),
    name: useId(),
    phone: useId(),
    email: useId(),
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-5 shadow-sm">
      {/* Title */}
      <h2 className="text-lg font-semibold text-gray-900">Thông tin cơ bản</h2>

      {/* Grid Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Mã KH */}
        <div>
          <label
            htmlFor={inputIds.customerId}
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            Mã khách hàng
          </label>
          <input
            id={inputIds.customerId}
            type="text"
            placeholder="Ví dụ: KH001"
            value={customerId}
            onChange={(e) => onInputChange("customerId", e.target.value)}
            className={`
              w-full h-10 px-3 py-2 rounded-md border border-gray-300
              bg-white text-sm text-gray-900 placeholder:text-gray-400
              focus:outline-none focus:ring-2 focus:ring-[#111164]/20 focus:border-[#111164]
              transition-all duration-200
            `}
          />
        </div>

        {/* Tên KH */}
        <div>
          <label
            htmlFor={inputIds.name}
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            Tên khách hàng <span className="text-red-500">*</span>
          </label>
          <input
            id={inputIds.name}
            type="text"
            placeholder="Nhập tên khách hàng"
            value={name}
            onChange={(e) => onInputChange("name", e.target.value)}
            required
            className={`
              w-full h-10 px-3 py-2 rounded-md border border-gray-300
              bg-white text-sm text-gray-900 placeholder:text-gray-400
              focus:outline-none focus:ring-2 focus:ring-[#111164]/20 focus:border-[#111164]
              transition-all duration-200
            `}
          />
        </div>

        {/* Điện thoại */}
        <div>
          <label
            htmlFor={inputIds.phone}
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            Điện thoại <span className="text-red-500">*</span>
          </label>
          <input
            id={inputIds.phone}
            type="tel"
            placeholder="Ví dụ: 0912345678"
            value={phone}
            onChange={(e) => onInputChange("phone", e.target.value)}
            required
            className={`
              w-full h-10 px-3 py-2 rounded-md border border-gray-300
              bg-white text-sm text-gray-900 placeholder:text-gray-400
              focus:outline-none focus:ring-2 focus:ring-[#111164]/20 focus:border-[#111164]
              transition-all duration-200
            `}
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor={inputIds.email}
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            Email
          </label>
          <input
            id={inputIds.email}
            type="email"
            placeholder="Ví dụ: customer@email.com"
            value={email}
            onChange={(e) => onInputChange("email", e.target.value)}
            className={`
              w-full h-10 px-3 py-2 rounded-md border border-gray-300
              bg-white text-sm text-gray-900 placeholder:text-gray-400
              focus:outline-none focus:ring-2 focus:ring-[#111164]/20 focus:border-[#111164]
              transition-all duration-200
            `}
          />
        </div>

        {/* Trạng thái */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Tình trạng khách hàng
          </label>
          <CustomSelect
            value={customerStatus}
            onValueChange={(value) => {
              const selected = CUSTOMER_STATUS.find((s) => s.label === value);
              if (selected) {
                onInputChange("customerStatus", selected.label);
                onInputChange("status", [selected]);
              }
            }}
            placeholder="Chọn tình trạng"
            options={CUSTOMER_STATUS}
          />
        </div>
      </div>
    </div>
  );
}
