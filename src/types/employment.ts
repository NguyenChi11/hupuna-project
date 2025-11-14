// src/types/employment.ts

import {ALL_AVAILABLE_COLUMNS} from "@/lib/employment/container_employ";

export interface Employment {
  id: string;
  employeeId: string;
  fullName: string;
  phone: string;
  address: string;
  department: string;
  position: string;
  employmentType: string; // e.g. "full_time" | "part_time" | "contract" | "intern"
  manager: string;
  zaloManager?: string;
  advisor?: string;
  employeeSegment?: string;
  employeeStatus?: string;
  avatar?: string;
  email: string;
  password: string;
  hireDate?: string;      // createdDate tương tự
  lastContact?: string;   // lastContact có thể là last review/contact
  birthday?: string;
  note?: string;
  salary?: number;
  bankAccount?: string;
  taxCode?: string;
  insuranceNumber?: string;
  startDate?: string;
  endDate?: string | null;
  status: {
    key: string;
    label: string;
    bgColor: string;
    textColor: string;
  }[];
}
export type ColumnKey = keyof typeof ALL_AVAILABLE_COLUMNS;

export interface ColumnConfig {
  [key: string]: boolean;
}

export interface FilterConfig {
  [key: string]: string[];
}

export type EmployeeStatusType =
  | "active"
  | "probation"
  | "on_leave"
  | "terminated"
  | "resigned"
  | "retired"
  | "suspended"
  | "inactive";

export interface EmployeeTableRowProps {
  employee: Employment;
  visibleColumns: Record<string, boolean>;
  allColumns: Record<string, string>;
  rowNumber: number;
  isSelected: boolean;
  onSelectRow: (id: string) => void;
}

// src/types/table.ts hoặc src/types/employment.ts
export interface EmployeeTableFooterProps {
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
