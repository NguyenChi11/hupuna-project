export interface Customer {
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
