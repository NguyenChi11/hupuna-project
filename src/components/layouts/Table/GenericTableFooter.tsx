"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faPlus } from "@fortawesome/free-solid-svg-icons";

import { TableFooterProps } from "@/types/table";
import { Pagination } from "@/components/ui/_base/Pagination";
import { Button } from "@/components/ui/_base/Button";
import { Popover } from "@/components/ui/_base/Popover";
import { Select } from "@/components/ui/_base/Select";

const itemsPerPageOptions = [
  { value: "10", label: "10 kết quả" },
  { value: "20", label: "20 kết quả" },
  { value: "50", label: "50 kết quả" },
  { value: "100", label: "100 kết quả" },
];

export function GenericTableFooter({
  currentPage,
  totalPages,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  allColumns,
  tempVisibleColumns,
  onColumnToggle,
  onApplyFilters,
}: TableFooterProps) {
  return (
    <div className="flex items-center justify-between py-4">
      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />

      <div className="flex items-center gap-4">
        {/* Add Button */}
        <Link href="/customers/add">
          <Button variant="primary">
            <FontAwesomeIcon icon={faPlus} className="h-4 w-4" />
            Thêm mới
          </Button>
        </Link>

        {/* Custom Columns Popover */}
        <Popover
          trigger={
            <Button variant="secondary">
              <FontAwesomeIcon icon={faCog} className="h-4 w-4" />
              Tuỳ chỉnh
            </Button>
          }
        >
          <div className="space-y-4 w-56">
            <div>
              <h3 className="font-medium mb-2">Cột hiển thị</h3>

              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {Object.entries(allColumns).map(([key, label]) => (
                  <label key={key} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={tempVisibleColumns[key] ?? true}
                      onChange={() => onColumnToggle(key)}
                      className="rounded cursor-pointer"
                    />
                    <span className="text-sm">{label}</span>
                  </label>
                ))}
              </div>
            </div>

            <Button
              variant="primary"
              className="w-full"
              onClick={onApplyFilters}
            >
              Áp dụng
            </Button>
          </div>
        </Popover>

        {/* Items Per Page */}
        <Select
          value={String(itemsPerPage)}
          onValueChange={(v) => {
            onItemsPerPageChange(Number(v));
            onPageChange(1);
          }}
          options={itemsPerPageOptions}
          dropdownClassName="bottom-10"
          placeholder="Số kết quả"
          className="w-36"
        />
      </div>
    </div>
  );
}
