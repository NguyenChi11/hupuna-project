"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { Customer, CustomerTableRowProps } from "@/types/customers";

// Avatar fallback (SVG inline)
const AvatarFallback = () => (
  <svg className="w-full h-full" viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="16" r="16" fill="#e5e7eb" />
    <circle cx="16" cy="11" r="4" fill="#9ca3af" />
    <path d="M 16 16 Q 8 22 8 28 L 24 28 Q 24 22 16 16" fill="#9ca3af" />
  </svg>
);

export function CustomerTableRow({
  customer,
  visibleColumns,
  rowNumber,
  isSelected,
  onSelectRow,
}: CustomerTableRowProps) {
  const getColumnValue = (columnKey: string): string => {
    const key = columnKey as keyof Customer;
    return String(customer[key] || "-");
  };

  const statusColor = customer.status?.[0]?.bgColor || "#E5E7EB";

  return (
    <tr
      className="border-b border-gray-200 transition-all duration-300 group"
      style={{
        borderLeft: `6px solid ${statusColor}`,
      }}
    >
      {/* Checkbox chọn dòng */}
      {visibleColumns.checkbox && (
        <td className="px-4 py-4">
          <label className="flex items-center justify-center cursor-pointer">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => onSelectRow(customer.id)}
              className="sr-only peer"
            />
            <div
              className={`
                w-5 h-5 rounded border-2 flex items-center justify-center
                transition-all duration-200
                ${
                  isSelected
                    ? "bg-[#111164] border-[#111164]"
                    : "bg-white border-gray-300 peer-hover:border-gray-400"
                }
              `}
            >
              {isSelected && (
                <FontAwesomeIcon
                  icon={faCheck}
                  className="text-white text-xs"
                />
              )}
            </div>
          </label>
        </td>
      )}

      {/* STT */}
      {visibleColumns.stt && (
        <td className="px-6 py-4 text-sm text-gray-900">{rowNumber}</td>
      )}

      {/* Các cột khác */}
      {Object.entries(visibleColumns).map(([key, isVisible]) => {
        if (!isVisible || key === "checkbox" || key === "stt") return null;

        const value = getColumnValue(key);

        if (key === "name") {
          return (
            <td key={key} className="px-6 py-4 text-sm">
              <a
                href={`/customers/${customer.id}`}
                className="flex items-center gap-3 h-auto p-0 no-underline hover:no-underline group"
              >
                {/* Avatar */}
                <div className="relative w-8 h-8 rounded-full overflow-hidden ring-2 ring-white shadow-sm">
                  {customer.avatar ? (
                    <Image
                      src={customer.avatar}
                      alt={value}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        e.currentTarget.nextElementSibling?.classList.remove(
                          "hidden"
                        );
                      }}
                    />
                  ) : null}
                  <div className={customer.avatar ? "hidden" : ""}>
                    <AvatarFallback />
                  </div>
                </div>

                {/* Tên */}
                <span className="text-[#111164] font-medium hover:underline">
                  {value}
                </span>
              </a>
            </td>
          );
        }

        return (
          <td
            key={key}
            className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap"
          >
            {value}
          </td>
        );
      })}
    </tr>
  );
}
