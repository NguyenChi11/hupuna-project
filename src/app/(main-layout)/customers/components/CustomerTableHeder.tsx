"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

interface CustomerTableHeaderProps {
  visibleColumns: Record<string, boolean>;
  allColumns: Record<string, string>;
  isAllSelected: boolean;
  onSelectAll: (checked: boolean) => void;
  startIndex: number;
}

export function CustomerTableHeader({
  visibleColumns,
  allColumns,
  isAllSelected,
  onSelectAll,
}: CustomerTableHeaderProps) {
  return (
    <thead>
      <tr className="bg-gray-50 border-b border-gray-200">
        {/* Checkbox toàn bộ */}
        {visibleColumns.checkbox && (
          <th className="px-4 py-3 text-left w-12">
            <label className="flex items-center justify-center cursor-pointer">
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={(e) => onSelectAll(e.target.checked)}
                className="peer sr-only"
              />
              <div
                className={`
                  w-5 h-5 rounded border-2 flex items-center justify-center
                  transition-all duration-200
                  ${
                    isAllSelected
                      ? "bg-[#111164] border-[#111164]"
                      : "bg-white border-gray-300 hover:border-gray-400"
                  }
                `}
              >
                {isAllSelected && (
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="text-white text-xs"
                  />
                )}
              </div>
            </label>
          </th>
        )}

        {/* STT */}
        {visibleColumns.stt && (
          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
            STT
          </th>
        )}

        {/* Các cột còn lại */}
        {Object.entries(visibleColumns).map(([key, isVisible]) => {
          if (!isVisible || key === "checkbox" || key === "stt") return null;
          return (
            <th
              key={key}
              className="px-6 py-3 text-left text-sm font-semibold text-gray-900 whitespace-nowrap"
            >
              {allColumns[key as keyof typeof allColumns]}
            </th>
          );
        })}
      </tr>
    </thead>
  );
}
