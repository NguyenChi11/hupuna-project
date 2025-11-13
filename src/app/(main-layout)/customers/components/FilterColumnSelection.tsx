"use client";

import { useState, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faSearch } from "@fortawesome/free-solid-svg-icons";

interface FilterColumnSelectionProps {
  visibleColumns: Record<string, boolean>;
  allColumns: Record<string, string>;
  onColumnToggle: (columnKey: string) => void;
}

export function FilterColumnSelection({
  visibleColumns,
  allColumns,
  onColumnToggle,
}: FilterColumnSelectionProps) {
  const [columnSearch, setColumnSearch] = useState("");

  const selectedCount = Object.values(visibleColumns).filter(Boolean).length;
  const totalCount = Object.keys(allColumns).length;

  const filteredColumns = useMemo(() => {
    const query = columnSearch.toLowerCase();
    return Object.entries(allColumns).filter(([_, label]) =>
      label.toLowerCase().includes(query)
    );
  }, [columnSearch, allColumns]);

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900">
          Lựa chọn cột hiển thị
        </h3>
        <span className="text-xs text-gray-500">
          Đã chọn {selectedCount}/{totalCount}
        </span>
      </div>

      {/* Search Input */}
      <div className="relative">
        <FontAwesomeIcon
          icon={faSearch}
          className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
        />
        <input
          type="text"
          placeholder="Tìm kiếm cột hiển thị"
          value={columnSearch}
          onChange={(e) => setColumnSearch(e.target.value)}
          className={`
            w-full pl-10 pr-3 py-2 text-sm rounded-md border border-gray-300
            bg-white text-gray-900 placeholder:text-gray-400
            focus:outline-none focus:ring-2 focus:ring-[#111164]/20 focus:border-[#111164]
            transition-all duration-200
          `}
        />
      </div>

      {/* Danh sách cột */}
      <div className="space-y-2 max-h-48 overflow-y-auto border border-gray-200 rounded-lg p-3 bg-gray-50">
        {filteredColumns.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-2">
            Không tìm thấy cột nào
          </p>
        ) : (
          filteredColumns.map(([columnKey, label]) => (
            <label
              key={columnKey}
              htmlFor={`col-${columnKey}`}
              className="flex items-center gap-3 cursor-pointer group"
            >
              {/* Checkbox tự build */}
              <input
                type="checkbox"
                id={`col-${columnKey}`}
                checked={visibleColumns[columnKey] || false}
                onChange={() => onColumnToggle(columnKey)}
                className="sr-only peer"
              />
              <div
                className={`
                  w-5 h-5 rounded border-2 flex items-center justify-center
                  transition-all duration-200
                  ${
                    visibleColumns[columnKey]
                      ? "bg-[#111164] border-[#111164]"
                      : "bg-white border-gray-300 group-hover:border-gray-400"
                  }
                `}
              >
                {visibleColumns[columnKey] && (
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="text-white text-xs"
                  />
                )}
              </div>

              {/* Label */}
              <span className="text-sm font-medium text-gray-700 flex-1 group-hover:text-gray-900">
                {label}
              </span>
            </label>
          ))
        )}
      </div>
    </div>
  );
}
