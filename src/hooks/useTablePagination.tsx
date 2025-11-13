// src/components/table/hooks/useTablePagination.ts
import { useState, useEffect } from "react";

export function useTablePagination<T>(data: T[], itemsPerPage: number) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(data.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    if (currentPage > totalPages) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentPage(1);
  }, [data.length, itemsPerPage]);

  return {
    currentPage,
    setCurrentPage,
    totalPages,
    startIndex,
    paginatedData,
  };
}
