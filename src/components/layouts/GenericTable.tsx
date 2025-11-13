"use client";

import { useState } from "react";
import { CustomerHeader } from "@/app/(main-layout)/customers/components/CustomerHerder";
import { GenericTableHeader } from "@/components/layouts/Table/GenericTableHeader";
import { GenericTableBody } from "@/components/layouts/Table/GenericTableBody";
import { GenericTableFooter } from "@/components/layouts/Table/GenericTableFooter";
import { ColumnConfig } from "@/types/table";
import { useTableSearchAndFilter } from "@/hooks/useTableSearchAndFilter";
import { useTablePagination } from "@/hooks/useTablePagination";
import { useTableSelection } from "@/hooks/useTableSelection";
import { TableEmptyState } from "@/components/layouts/Table/TableEmptyState";

interface GenericTableProps<T extends { id: string }> {
  data: T[];
  columns: ColumnConfig[];
  searchableFields: (keyof T)[];
  initialFilters: Record<string, string[]>;
  initialVisibleColumns: Record<string, boolean>;
  onFiltersChange: (filters: Record<string, string[]>) => void;
  onVisibleColumnsChange: (columns: Record<string, boolean>) => void;
  renderHeader?: () => React.ReactNode;
  renderRow?: (
    item: T,
    index: number,
    isSelected: boolean,
    onSelect: () => void
  ) => React.ReactNode;
  emptyMessage?: string;
}

export function GenericTable<T extends { id: string }>({
  data,
  columns,
  searchableFields,
  initialFilters,
  initialVisibleColumns,
  onFiltersChange,
  onVisibleColumnsChange,
  renderHeader,
  renderRow,
  emptyMessage,
}: GenericTableProps<T>) {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [tempFilters, setTempFilters] = useState(initialFilters);
  const [tempVisibleColumns, setTempVisibleColumns] = useState(
    initialVisibleColumns
  );
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const filteredData = useTableSearchAndFilter(
    data,
    initialFilters,
    searchKeyword,
    initialVisibleColumns,
    searchableFields
  );

  const { currentPage, setCurrentPage, totalPages, startIndex, paginatedData } =
    useTablePagination(filteredData, itemsPerPage);

  const { selectedRows, isAllSelected, handleSelectAll, handleSelectRow } =
    useTableSelection(paginatedData);

  const handleApplyFilters = () => {
    onFiltersChange(tempFilters);
    onVisibleColumnsChange(tempVisibleColumns);
    setCurrentPage(1);
  };

  const allColumnsMap = Object.fromEntries(
    columns.map((c) => [c.key, c.label])
  );

  return (
    <div className="p-6 space-y-4">
      {renderHeader ? (
        renderHeader()
      ) : (
        <CustomerHeader
          totalCount={filteredData.length}
          onSearch={setSearchKeyword}
        />
      )}

      <div className="border border-border rounded-lg overflow-hidden">
        {filteredData.length === 0 ? (
          <TableEmptyState message={emptyMessage} />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <GenericTableHeader
                visibleColumns={initialVisibleColumns}
                allColumns={allColumnsMap}
                isAllSelected={isAllSelected}
                onSelectAll={handleSelectAll}
              />
              <GenericTableBody
                data={paginatedData}
                visibleColumns={initialVisibleColumns}
                columns={columns}
                startIndex={startIndex}
                selectedRows={selectedRows}
                onSelectRow={handleSelectRow}
                renderRow={renderRow}
              />
            </table>
          </div>
        )}
      </div>

      <GenericTableFooter
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={setItemsPerPage}
        allColumns={allColumnsMap}
        tempFilters={tempFilters}
        tempVisibleColumns={tempVisibleColumns}
        onFilterChange={(name, values) =>
          setTempFilters((prev) => ({ ...prev, [name]: values }))
        }
        onColumnToggle={(key) =>
          setTempVisibleColumns((prev) => ({ ...prev, [key]: !prev[key] }))
        }
        onApplyFilters={handleApplyFilters}
      />
    </div>
  );
}
