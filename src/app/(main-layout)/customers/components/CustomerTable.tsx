// src/app/(main-layout)/customers/components/CustomerTable.tsx
import { GenericTable } from "@/components/layouts/GenericTable";
import { Customer } from "@/types/customers";
import { ALL_AVAILABLE_COLUMNS } from "@/lib/container_customers";
import { CustomerTableRow } from "./CustomerTableRow";

const columns = Object.entries(ALL_AVAILABLE_COLUMNS).map(([key, label]) => ({
  key,
  label,
}));

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

export function CustomerTable({
  customers,
  filters,
  visibleColumns,
  onFiltersChange,
  onVisibleColumnsChange,
}: {
  customers: Customer[];
  filters: Record<string, string[]>;
  visibleColumns: Record<string, boolean>;
  onFiltersChange: (f: Record<string, string[]>) => void;
  onVisibleColumnsChange: (c: Record<string, boolean>) => void;
}) {
  return (
    <GenericTable
      data={customers}
      columns={columns}
      searchableFields={searchableFields}
      initialFilters={filters}
      initialVisibleColumns={visibleColumns}
      onFiltersChange={onFiltersChange}
      onVisibleColumnsChange={onVisibleColumnsChange}
      renderRow={(customer, rowNumber, isSelected, onSelect) => (
        <CustomerTableRow
          key={customer.id}
          customer={customer}
          visibleColumns={visibleColumns}
          allColumns={ALL_AVAILABLE_COLUMNS}
          rowNumber={rowNumber}
          isSelected={isSelected}
          onSelectRow={onSelect}
        />
      )}
    />
  );
}
