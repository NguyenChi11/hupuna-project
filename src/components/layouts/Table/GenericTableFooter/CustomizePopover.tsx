import { Popover } from "@/components/ui/_base/Popover";
import { Button } from "@/components/ui/_base/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { FilterDataFilters } from "@/app/(main-layout)/customers/components/FilterDataFilters";
import { FilterColumnSelection } from "@/app/(main-layout)/customers/components/FilterColumnSelection";

interface CustomizePopoverProps {
  allColumns: Record<string, string>;
  tempFilters: Record<string, string[]>;
  tempVisibleColumns: Record<string, boolean>;
  onFilterChange: (filterName: string, values: string[]) => void;
  onColumnToggle: (columnKey: string) => void;
  onApplyFilters: () => void;
}

export function CustomizePopover({
  allColumns,
  tempFilters,
  tempVisibleColumns,
  onFilterChange,
  onColumnToggle,
  onApplyFilters,
}: CustomizePopoverProps) {
  return (
    <Popover
      trigger={
        <Button variant="secondary">
          <FontAwesomeIcon icon={faCog} className="h-4 w-4" />
          Tuỳ chỉnh
        </Button>
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
          <Button
            variant="primary"
            className="w-full bg-blue-600 hover:bg-blue-700"
            onClick={onApplyFilters}
          >
            Áp dụng
          </Button>
        </div>
      </div>
    </Popover>
  );
}
