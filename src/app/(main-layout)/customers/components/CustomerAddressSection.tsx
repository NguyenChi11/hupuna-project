"use client";

import { useId, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { REGIONS } from "@/lib/container_customers";

interface CustomerAddressSectionProps {
  address: string;
  region: string;
  birthday: string;
  onInputChange: (field: string, value: string) => void;
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

export function CustomerAddressSection({
  address,
  region,
  birthday,
  onInputChange,
}: CustomerAddressSectionProps) {
  const inputIds = {
    address: useId(),
    region: useId(),
    birthday: useId(),
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-5 shadow-sm">
      {/* Title */}
      <h2 className="text-lg font-semibold text-gray-900">Địa chỉ</h2>

      {/* Grid Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Địa chỉ cụ thể */}
        <div className="md:col-span-2">
          <label
            htmlFor={inputIds.address}
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            Địa chỉ cụ thể <span className="text-red-500">*</span>
          </label>
          <input
            id={inputIds.address}
            type="text"
            placeholder="Nhập địa chỉ đầy đủ"
            value={address}
            onChange={(e) => onInputChange("address", e.target.value)}
            required
            className={`
              w-full h-10 px-3 py-2 rounded-md border border-gray-300
              bg-white text-sm text-gray-900 placeholder:text-gray-400
              focus:outline-none focus:ring-2 focus:ring-[#111164]/20 focus:border-[#111164]
              transition-all duration-200
            `}
          />
        </div>

        {/* Khu vực */}
        <div>
          <label
            htmlFor={inputIds.region}
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            Khu vực <span className="text-red-500">*</span>
          </label>
          <CustomSelect
            value={region}
            onValueChange={(value) => onInputChange("region", value)}
            placeholder="Chọn khu vực"
            options={REGIONS}
          />
        </div>

        {/* Sinh nhật */}
        <div>
          <label
            htmlFor={inputIds.birthday}
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            Sinh nhật
          </label>
          <input
            id={inputIds.birthday}
            type="date"
            value={birthday}
            onChange={(e) => onInputChange("birthday", e.target.value)}
            className={`
              w-full h-10 px-3 py-2 rounded-md border border-gray-300
              bg-white text-sm text-gray-900
              focus:outline-none focus:ring-2 focus:ring-[#111164]/20 focus:border-[#111164]
              transition-all duration-200
              [&::-webkit-calendar-picker-indicator]:opacity-60
            `}
          />
        </div>
      </div>
    </div>
  );
}
