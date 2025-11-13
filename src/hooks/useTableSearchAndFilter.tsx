// src/components/table/hooks/useTableSearchAndFilter.ts
import { useMemo } from "react";

export function useTableSearchAndFilter<T>(
  data: T[],
  filters: Record<string, string[]>,
  searchKeyword: string,
  visibleColumns: Record<string, boolean>,
  searchableFields: (keyof T)[]
) {
  return useMemo(() => {
    let result = data;

    // Filter dropdowns
    Object.entries(filters).forEach(([filterName, selectedValues]) => {
      if (!selectedValues.length) return;

      const fieldMap: Record<string, keyof T> = {
        region: "region",
        product_group: "productGroup",
        customer_group: "customerSegment",
        consultant: "consultant",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any;

      const field = fieldMap[filterName];
      if (field) {
        result = result.filter((item) =>
          selectedValues.includes(String(item[field]))
        );
      }
    });

    // Search
    if (searchKeyword.trim()) {
      const keyword = searchKeyword.toLowerCase();
      const activeFields = searchableFields.filter(
        (f) => visibleColumns[String(f)] !== false
      );

      result = result.filter((item) =>
        activeFields.some((field) =>
          String(item[field] || "")
            .toLowerCase()
            .includes(keyword)
        )
      );
    }

    return result;
  }, [data, filters, searchKeyword, visibleColumns, searchableFields]);
}
