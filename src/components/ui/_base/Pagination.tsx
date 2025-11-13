import { IconButton } from "./IconButton";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="flex items-center gap-2">
      <IconButton
        icon={faChevronLeft}
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        aria-label="Trang trước"
      />
      <span className="text-sm text-gray-600">
        Trang <strong>{currentPage}</strong> / <strong>{totalPages}</strong>
      </span>
      <IconButton
        icon={faChevronRight}
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        aria-label="Trang sau"
      />
    </div>
  );
}
