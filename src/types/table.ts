// src/types/table.ts
export interface ColumnConfig {
  key: string;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render?: (item: any, index: number) => React.ReactNode;
}

export interface TableFilter {
  [key: string]: string[];
}

export interface TableVisibleColumns {
  [key: string]: boolean;
}

export interface TableFooterProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (count: number) => void;
  allColumns: Record<string, string>;
  tempFilters: TableFilter;
  tempVisibleColumns: TableVisibleColumns;
  onFilterChange: (name: string, values: string[]) => void;
  onColumnToggle: (key: string) => void;
  onApplyFilters: () => void;
}
