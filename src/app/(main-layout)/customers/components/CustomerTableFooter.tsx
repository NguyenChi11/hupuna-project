"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faPlus,
  faCog,
} from "@fortawesome/free-solid-svg-icons";
import { FilterColumnSelection } from "@/app/(main-layout)/customers/components/FilterColumnSelection";
import { FilterDataFilters } from "@/app/(main-layout)/customers/components/FilterDataFilters";

interface CustomerTableFooterProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (count: number) => void;
  allColumns: Record<string, string>;
  tempFilters: Record<string, string[]>;
  tempVisibleColumns: Record<string, boolean>;
  onFilterChange: (filterName: string, values: string[]) => void;
  onColumnToggle: (columnKey: string) => void;
  onApplyFilters: () => void;
}

// === Tự xây Select ===
const CustomSelect = ({
  value,
  onValueChange,
  options,
}: {
  value: string;
  onValueChange: (value: string) => void;
  options: { value: string; label: string }[];
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-40">
      <button
        onClick={() => setOpen(!open)}
        className={`
          flex h-9 w-full items-center justify-between rounded-md border border-gray-300
          bg-white px-3 py-2 text-sm text-gray-900 shadow-sm
          hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#111164]/20
          transition-all duration-200
        `}
      >
        <span>{options.find((o) => o.value === value)?.label}</span>
        <svg
          className={`h-4 w-4 transition-transform ${open ? "" : "rotate-180"}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg border border-gray-200 bottom-10">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onValueChange(option.value);
                setOpen(false);
              }}
              className={`
                block w-full px-3 py-2 text-left text-sm text-gray-700
                hover:bg-gray-100 transition-colors
                ${value === option.value ? "bg-gray-50 font-medium" : ""}
              `}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// === Tự xây Popover ===
const CustomPopover = ({
  children,
  trigger,
}: {
  children: React.ReactNode;
  trigger: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <div onClick={() => setOpen(!open)}>{trigger}</div>

      {open && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />

          {/* Popover Content */}
          <div className="absolute right-0 bottom-full mb-2 z-50 w-96 max-h-96 overflow-y-auto rounded-lg bg-white p-4 shadow-xl border border-gray-200">
            {children}
          </div>
        </>
      )}
    </div>
  );
};

export function CustomerTableFooter({
  currentPage,
  totalPages,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  allColumns,
  tempFilters,
  tempVisibleColumns,
  onFilterChange,
  onColumnToggle,
  onApplyFilters,
}: CustomerTableFooterProps) {
  const selectOptions = [
    { value: "10", label: "Hiển thị 10 kết quả" },
    { value: "20", label: "Hiển thị 20 kết quả" },
    { value: "50", label: "Hiển thị 50 kết quả" },
    { value: "100", label: "Hiển thị 100 kết quả" },
  ];

  return (
    <div className="flex items-center justify-between py-4">
      {/* Pagination */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className={`
            flex h-9 w-9 items-center justify-center rounded-md border
            ${
              currentPage === 1
                ? "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
                : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
            }
            transition-all duration-200
          `}
        >
          <FontAwesomeIcon icon={faChevronLeft} className="h-4 w-4" />
        </button>

        <span className="text-sm text-gray-600">
          Trang <strong>{currentPage}</strong> / <strong>{totalPages}</strong>
        </span>

        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className={`
            flex h-9 w-9 items-center justify-center rounded-md border
            ${
              currentPage === totalPages
                ? "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
                : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
            }
            transition-all duration-200
          `}
        >
          <FontAwesomeIcon icon={faChevronRight} className="h-4 w-4" />
        </button>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        {/* Thêm khách hàng */}
        <button
          onClick={() => (window.location.href = "/customers/add")}
          className={`
            flex h-9 items-center gap-2 rounded-md bg-[#111164] px-4 text-sm font-medium text-white
            hover:bg-[#2b2cd8] active:scale-95 transition-all duration-200
          `}
        >
          <FontAwesomeIcon icon={faPlus} className="h-4 w-4" />
          Thêm khách hàng
        </button>

        {/* Tuỳ chỉnh (Popover) */}
        <CustomPopover
          trigger={
            <button className="flex h-9 items-center gap-2 rounded-md border border-gray-300 bg-white px-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all">
              <FontAwesomeIcon icon={faCog} className="h-4 w-4" />
              Tuỳ chỉnh
            </button>
          }
        >
          <div className="space-y-6">
            <FilterDataFilters
              tempFilters={tempFilters}
              onFilterChange={onFilterChange}
            />
            <FilterColumnSelection
              visibleColumns={tempVisibleColumns}
              allColumns={allColumns}
              onColumnToggle={onColumnToggle}
            />
            <div className="space-y-2 border-t border-gray-200 pt-3">
              <button
                onClick={onApplyFilters}
                className="w-full h-9 rounded-md bg-blue-600 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
              >
                Áp dụng
              </button>
            </div>
          </div>
        </CustomPopover>

        {/* Items per page */}
        <CustomSelect
          value={String(itemsPerPage)}
          onValueChange={(value) => {
            onItemsPerPageChange(Number(value));
            onPageChange(1);
          }}
          options={selectOptions}
        />
      </div>
    </div>
  );
}
