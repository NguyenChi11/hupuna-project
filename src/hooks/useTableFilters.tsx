// src/components/table/hooks/useTableFilters.ts
import { useState, useMemo } from "react";

export function useTableFilters<T>(
  initialFilters: Record<string, string[]>,
  data: T[],
  searchKeyword: string,
  visibleColumns: Record<string, boolean>,
  searchableFields: (keyof T)[]
) {
  const [tempFilters, setTempFilters] = useState(initialFilters);

  const filteredData = useMemo(() => {
    let result = data;

    // Filter dropdowns
    Object.entries(initialFilters).forEach(([key, values]) => {
      if (!values.length) return;
      result = result.filter((item) =>
        values.includes(String(item[key as keyof T]))
      );
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
  }, [data, initialFilters, searchKeyword, visibleColumns, searchableFields]);

  return {
    tempFilters,
    setTempFilters,
    filteredData,
  };
}
