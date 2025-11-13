"use client";

import { CustomerTable } from "@/app/(main-layout)/customers/components/CustomerTable";
import { DEFAULT_VISIBLE_COLUMNS } from "@/lib/container_customers";
import { DEFAULT_CUSTOMERS } from "@/lib/data_customers";
import { ColumnConfig, Customer, FilterConfig } from "@/types/customers";
import { useState, useEffect } from "react";

export default function Home() {
  const [customers, setCustomers] = useState<Customer[]>(DEFAULT_CUSTOMERS);
  const [filters, setFilters] = useState<FilterConfig>({});
  const [visibleColumns, setVisibleColumns] = useState<ColumnConfig>(
    DEFAULT_VISIBLE_COLUMNS
  );

  useEffect(() => {
    const newCustomerData = sessionStorage.getItem("newCustomer");
    if (newCustomerData) {
      const newCustomer = JSON.parse(newCustomerData);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCustomers((prev) => [...prev, newCustomer]);
      sessionStorage.removeItem("newCustomer");
    }
  }, []);

  const handleAddCustomer = (newCustomer: Customer) => {
    setCustomers((prev) => [newCustomer, ...prev]);
  };

  return (
    <section className="flex bg-background">
      {/* Main Content */}
      <div className="flex-1 overflow-auto ">
        <CustomerTable
          customers={customers}
          filters={filters}
          visibleColumns={visibleColumns}
          onFiltersChange={setFilters}
          onVisibleColumnsChange={setVisibleColumns}
        />
      </div>
    </section>
  );
}
