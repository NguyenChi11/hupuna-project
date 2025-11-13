"use client";

import { useId, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { CONSULTANTS, PRODUCT_GROUPS } from "@/lib/container_customers";

interface CustomerProductInfoProps {
  productGroup: string;
  consultant: string;
  zaloConsultant: string;
  advisor: string;
  requirements: string;
  onInputChange: (field: string, value: string) => void;
}

// === Tự xây Select (dùng chung) ===
const CustomSelect = ({
  value,
  onValueChange,
  placeholder,
  options,
}: {
  value: string;
  onValueChange: (value: string) => void;
  placeholder: string;
  options: readonly string[];
}) => {
  const [open, setOpen] = useState(false);

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
          {value || placeholder}
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
              key={option}
              onClick={() => {
                onValueChange(option);
                setOpen(false);
              }}
              className={`
                block w-full px-3 py-2 text-left text-sm
                hover:bg-gray-100 transition-colors
                ${value === option ? "bg-gray-50" : ""}
              `}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export function CustomerProductInfo({
  productGroup,
  consultant,
  zaloConsultant,
  advisor,
  requirements,
  onInputChange,
}: CustomerProductInfoProps) {
  const inputIds = {
    productGroup: useId(),
    consultant: useId(),
    zaloConsultant: useId(),
    advisor: useId(),
    requirements: useId(),
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-5 shadow-sm">
      {/* Title */}
      <h2 className="text-lg font-semibold text-gray-900">
        Thông tin sản phẩm và tư vấn
      </h2>

      {/* Grid Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Nhóm sản phẩm */}
        <div>
          <label
            htmlFor={inputIds.productGroup}
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            Nhóm sản phẩm <span className="text-red-500">*</span>
          </label>
          <CustomSelect
            value={productGroup}
            onValueChange={(value) => onInputChange("productGroup", value)}
            placeholder="Chọn nhóm sản phẩm"
            options={PRODUCT_GROUPS}
          />
        </div>

        {/* Nhân viên tư vấn */}
        <div>
          <label
            htmlFor={inputIds.consultant}
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            Nhân viên tư vấn <span className="text-red-500">*</span>
          </label>
          <CustomSelect
            value={consultant}
            onValueChange={(value) => onInputChange("consultant", value)}
            placeholder="Chọn nhân viên tư vấn"
            options={CONSULTANTS}
          />
        </div>

        {/* Zalo tư vấn */}
        <div>
          <label
            htmlFor={inputIds.zaloConsultant}
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            Zalo tư vấn
          </label>
          <input
            id={inputIds.zaloConsultant}
            type="text"
            placeholder="Ví dụ: 0912345678"
            value={zaloConsultant}
            onChange={(e) => onInputChange("zaloConsultant", e.target.value)}
            className={`
              w-full h-10 px-3 py-2 rounded-md border border-gray-300
              bg-white text-sm text-gray-900 placeholder:text-gray-400
              focus:outline-none focus:ring-2 focus:ring-[#111164]/20 focus:border-[#111164]
              transition-all duration-200
            `}
          />
        </div>

        {/* Người tư vấn */}
        <div>
          <label
            htmlFor={inputIds.advisor}
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            Người tư vấn
          </label>
          <input
            id={inputIds.advisor}
            type="text"
            placeholder="Nhập tên người tư vấn"
            value={advisor}
            onChange={(e) => onInputChange("advisor", e.target.value)}
            className={`
              w-full h-10 px-3 py-2 rounded-md border border-gray-300
              bg-white text-sm text-gray-900 placeholder:text-gray-400
              focus:outline-none focus:ring-2 focus:ring-[#111164]/20 focus:border-[#111164]
              transition-all duration-200
            `}
          />
        </div>
      </div>

      {/* Yêu cầu khách hàng */}
      <div>
        <label
          htmlFor={inputIds.requirements}
          className="block text-sm font-medium text-gray-700 mb-1.5"
        >
          Yêu cầu của khách hàng
        </label>
        <input
          id={inputIds.requirements}
          type="text"
          placeholder="Nhập yêu cầu của khách hàng"
          value={requirements}
          onChange={(e) => onInputChange("requirements", e.target.value)}
          className={`
            w-full h-10 px-3 py-2 rounded-md border border-gray-300
            bg-white text-sm text-gray-900 placeholder:text-gray-400
            focus:outline-none focus:ring-2 focus:ring-[#111164]/20 focus:border-[#111164]
            transition-all duration-200
          `}
        />
      </div>
    </div>
  );
}
