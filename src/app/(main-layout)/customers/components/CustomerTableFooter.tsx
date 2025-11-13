"use client";

import { AddButton } from "@/components/layouts/Table/GenericTableFooter/AddButton";
import { CustomizePopover } from "@/components/layouts/Table/GenericTableFooter/CustomizePopover";
import { ItemsPerPageSelect } from "@/components/layouts/Table/GenericTableFooter/ItemsPerPageSelect";
import { PaginationControls } from "@/components/layouts/Table/GenericTableFooter/PaginationControls";
import { CustomerTableFooterProps } from "@/types/customers";

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
  return (
    <div className="flex items-center justify-between py-4">
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />

      <div className="flex items-center gap-4">
        <AddButton href="/customers/add" label="Thêm khách hàng" />

        <CustomizePopover
          allColumns={allColumns}
          tempFilters={tempFilters}
          tempVisibleColumns={tempVisibleColumns}
          onFilterChange={onFilterChange}
          onColumnToggle={onColumnToggle}
          onApplyFilters={onApplyFilters}
        />

        <ItemsPerPageSelect
          value={itemsPerPage}
          onChange={(count) => {
            onItemsPerPageChange(count);
            onPageChange(1);
          }}
        />
      </div>
    </div>
  );
}
