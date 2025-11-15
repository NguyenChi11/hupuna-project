export interface Customer {
  website: string;
  taxCode: string;
  lastPurchase: string;
  avatarUrl: string | undefined;
  id: string;
  customerId: string;
  name: string;
  phone: string;
  address: string;
  region: string;
  productGroup: string;
  requirements: string;
  consultant: string;
  zaloConsultant: string;
  advisor: string;
  customerSegment: string;
  customerStatus: string;
  avatar?: string;
  logo?: string;
  email?: string;
  createdDate?: string;
  lastContact?: string;
  birthday?: string;
  companyName?: string;
  note?: string;
  status: {
    key: string;
    label: string;
    bgColor: string;
    textColor: string;
  }[];
}

export interface ColumnConfig {
  [key: string]: boolean;
}

export interface FilterConfig {
  [key: string]: string[];
}

export type CustomerStatusType =
  | "missing_info"
  | "completed"
  | "new_lead"
  | "cannot_finalize"
  | "consulting"
  | "waiting_quote"
  | "sent_quote"
  | "order_closed"
  | "not_closed"
  | "cannot_contact";

export interface CustomerTableRowProps {
  customer: Customer;
  visibleColumns: Record<string, boolean>;
  allColumns: Record<string, string>;
  rowNumber: number;
  isSelected: boolean;
  onSelectRow: (id: string) => void;
}

// src/types/table.ts hoặc src/types/customers.ts
export interface CustomerTableFooterProps {
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
