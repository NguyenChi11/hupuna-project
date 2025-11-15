import { GenericTable } from "@/components/layouts/GenericTable";
import { Employment } from "@/types/employment";
import { EmployeeTableRow } from "@/app/(main-layout)/employee-account/components/EmployeeTableRow";
import { ALL_AVAILABLE_COLUMNS } from "@/lib/employment/container_employ";

const columns = Object.entries(ALL_AVAILABLE_COLUMNS).map(([key, label]) => ({
  key,
  label,
}));

const searchableFields: (keyof Employment)[] = [
  "id",
  "fullName",
  "email",
  "phone",
  "address",
  "position",
  "department",
  "employeeSegment",
  "birthday",
  "note",
];

export function EmployeeTable({
  employee,
  filters,
  visibleColumns,
  onFiltersChange,
  onVisibleColumnsChange,
}: {
  employee: Employment[];
  filters: Record<string, string[]>;
  visibleColumns: Record<string, boolean>;
  onFiltersChange: (f: Record<string, string[]>) => void;
  onVisibleColumnsChange: (c: Record<string, boolean>) => void;
}) {
  return (
    <GenericTable
      data={employee}
      columns={columns}
      searchableFields={searchableFields}
      initialFilters={filters}
      initialVisibleColumns={visibleColumns}
      onFiltersChange={onFiltersChange}
      onVisibleColumnsChange={onVisibleColumnsChange}
      renderHeader={() => <div></div>}
      renderRow={(employee, rowNumber, isSelected, onSelect) => (
        <EmployeeTableRow
          key={employee.id}
          employee={employee}
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
