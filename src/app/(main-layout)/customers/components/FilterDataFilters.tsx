"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

interface FilterDataFiltersProps {
  tempFilters: Record<string, string[]>;
  onFilterChange: (filterName: string, values: string[]) => void;
}

export function FilterDataFilters({
  tempFilters,
  onFilterChange,
}: FilterDataFiltersProps) {
  const filterOptions = {
    region: {
      label: "Khu vực",
      options: ["TP.HCM", "Hà Nội", "Hải Phòng"],
    },
    product_group: {
      label: "Nhóm sản phẩm",
      options: ["Điện tử", "Thời trang", "Thực phẩm", "Nội thất", "Công nghệ"],
    },
    customer_group: {
      label: "Phân khúc khách hàng",
      options: ["VIP", "Thường xuyên", "Mới", "Tiềm năng"],
    },
    consultant: {
      label: "Nhân viên tư vấn",
      options: ["Nguyễn Văn A", "Trần Thị B", "Phạm Văn C", "Hoàng Thị D"],
    },
  };

  return (
    <div className="space-y-4 border-b border-gray-200 pb-4">
      <h3 className="text-sm font-semibold text-gray-900">Bộ lọc dữ liệu</h3>

      {Object.entries(filterOptions).map(([filterName, { label, options }]) => (
        <div key={filterName} className="space-y-2">
          <label className="text-xs font-medium text-gray-700 block">
            {label}
          </label>

          <div className="space-y-1.5 max-h-24 overflow-y-auto border border-gray-200 rounded-lg p-2 bg-gray-50">
            {options.map((option) => {
              const isChecked =
                tempFilters[filterName]?.includes(option) || false;
              const inputId = `${filterName}-${option}`;

              return (
                <label
                  key={option}
                  htmlFor={inputId}
                  className="flex items-center gap-2.5 cursor-pointer group"
                >
                  {/* Checkbox tự build */}
                  <input
                    type="checkbox"
                    id={inputId}
                    checked={isChecked}
                    onChange={(e) => {
                      const current = tempFilters[filterName] || [];
                      const updated = e.target.checked
                        ? [...current, option]
                        : current.filter((v) => v !== option);
                      onFilterChange(filterName, updated);
                    }}
                    className="sr-only peer"
                  />

                  <div
                    className={`
                      w-4.5 h-4.5 rounded border-2 flex items-center justify-center
                      transition-all duration-200 shrink-0
                      ${
                        isChecked
                          ? "bg-[#111164] border-[#111164]"
                          : "bg-white border-gray-300 group-hover:border-gray-400"
                      }
                    `}
                  >
                    {isChecked && (
                      <FontAwesomeIcon
                        icon={faCheck}
                        className="text-white text-xs"
                      />
                    )}
                  </div>

                  {/* Label */}
                  <span className="text-sm text-gray-700 group-hover:text-gray-900 select-none">
                    {option}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
