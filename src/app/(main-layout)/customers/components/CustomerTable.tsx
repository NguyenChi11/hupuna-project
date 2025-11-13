"use client";

import { useMemo, useState, useEffect } from "react";

import { ColumnConfig, Customer, FilterConfig } from "@/types/customers";
import { ALL_AVAILABLE_COLUMNS } from "@/lib/container_customers";
import { CustomerHeader } from "@/app/(main-layout)/customers/components/CustomerHerder";
import { CustomerTableEmpty } from "@/app/(main-layout)/customers/components/CustomerTableEmpty";
import { CustomerTableHeader } from "@/app/(main-layout)/customers/components/CustomerTableHeder";
import { CustomerTableRow } from "@/app/(main-layout)/customers/components/CustomerTableRow";
import { CustomerTableFooter } from "@/app/(main-layout)/customers/components/CustomerTableFooter";

interface CustomerTableProps {
  customers: Customer[];
  filters: FilterConfig;
  visibleColumns: ColumnConfig;
  onFiltersChange: (filters: FilterConfig) => void;
  onVisibleColumnsChange: (columns: ColumnConfig) => void;
}

export function CustomerTable({
  customers,
  filters,
  visibleColumns,
  onFiltersChange,
  onVisibleColumnsChange,
}: CustomerTableProps) {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [tempFilters, setTempFilters] = useState<FilterConfig>(filters);
  const [tempVisibleColumns, setTempVisibleColumns] =
    useState<ColumnConfig>(visibleColumns);
  const [searchKeyword, setSearchKeyword] = useState("");

  // -------------------------------
  // 🔍 FILTER + SEARCH
  // -------------------------------
  const filteredCustomers = useMemo(() => {
    let result = customers;

    // Filter dropdowns
    Object.entries(filters).forEach(([filterName, selectedValues]) => {
      if (!selectedValues.length) return;

      const fieldMap: Record<string, keyof Customer> = {
        region: "region",
        product_group: "productGroup",
        customer_group: "customerSegment",
        consultant: "consultant",
      };

      const field = fieldMap[filterName];
      if (field) {
        result = result.filter((customer) =>
          selectedValues.includes(String(customer[field]))
        );
      }
    });

    // Search
    if (searchKeyword.trim() !== "") {
      const keyword = searchKeyword.toLowerCase();

      const searchableFields: (keyof Customer)[] = [
        "id",
        "name",
        "email",
        "phone",
        "region",
        "customerSegment",
        "productGroup",
        "consultant",
        "address",
        "companyName",
        "note",
      ];

      const activeFields = searchableFields.filter(
        (f) => visibleColumns[f] !== false
      );

      result = result.filter((customer) =>
        activeFields.some((field) =>
          (customer[field] || "").toString().toLowerCase().includes(keyword)
        )
      );
    }

    return result;
  }, [filters, customers, searchKeyword, visibleColumns]);

  // -------------------------------
  // 🔢 Pagination
  // -------------------------------
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;

  const paginatedCustomers = filteredCustomers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // 1) Reset page khi search đổi
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentPage(1);
  }, [searchKeyword]);

  // 2) Reset page khi filters đổi
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentPage(1);
  }, [filters]);

  // 3) Nếu tổng trang giảm, đảm bảo không vượt quá
  useEffect(() => {
    if (currentPage > totalPages) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrentPage(totalPages || 1);
    }
  }, [currentPage, totalPages]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) setSelectedRows(new Set(paginatedCustomers.map((c) => c.id)));
    else setSelectedRows(new Set());
  };

  const handleSelectRow = (id: string) => {
    const updated = new Set(selectedRows);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    updated.has(id) ? updated.delete(id) : updated.add(id);
    setSelectedRows(updated);
  };

  // ----------------------------------------
  // Apply Filters
  // ----------------------------------------
  const handleApplyFilters = () => {
    onFiltersChange(tempFilters);
    onVisibleColumnsChange(tempVisibleColumns);

    // Reset về trang 1 (đúng logic)
    setCurrentPage(1);
  };

  const handleColumnToggle = (columnKey: string) => {
    setTempVisibleColumns({
      ...tempVisibleColumns,
      [columnKey]: !tempVisibleColumns[columnKey],
    });
  };

  // ----------------------------------------
  // Render
  // ----------------------------------------
  return (
    <div className="p-6 space-y-4">
      <CustomerHeader
        totalCount={filteredCustomers.length}
        onSearch={(keyword) => setSearchKeyword(keyword)}
      />

      <div className="border border-border rounded-lg overflow-hidden">
        {filteredCustomers.length === 0 ? (
          <CustomerTableEmpty />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <CustomerTableHeader
                visibleColumns={visibleColumns}
                allColumns={ALL_AVAILABLE_COLUMNS}
                isAllSelected={
                  paginatedCustomers.length > 0 &&
                  selectedRows.size === paginatedCustomers.length
                }
                onSelectAll={handleSelectAll}
                startIndex={startIndex}
              />

              <tbody>
                {paginatedCustomers.map((customer, idx) => (
                  <CustomerTableRow
                    key={customer.id}
                    customer={customer}
                    visibleColumns={visibleColumns}
                    allColumns={ALL_AVAILABLE_COLUMNS}
                    rowNumber={startIndex + idx + 1}
                    isSelected={selectedRows.has(customer.id)}
                    onSelectRow={handleSelectRow}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <CustomerTableFooter
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={setItemsPerPage}
        allColumns={ALL_AVAILABLE_COLUMNS}
        tempFilters={tempFilters}
        tempVisibleColumns={tempVisibleColumns}
        onFilterChange={(name, v) =>
          setTempFilters((prev) => ({ ...prev, [name]: v }))
        }
        onColumnToggle={handleColumnToggle}
        onApplyFilters={handleApplyFilters}
      />
    </div>
  );
}
