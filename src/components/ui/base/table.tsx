"use client";

import React, { useEffect, useMemo } from "react";
import IconTriangleLeft from "@public/icons/triangle-left.svg";
import IconTriangleRight from "@public/icons/triangle-right.svg";
import IconTriangleDoubleLeft from "@public/icons/triangle-double-left.svg";
import IconTriangleDoubleRight from "@public/icons/triangle-double-right.svg";
import IconArrowDown from "@public/icons/arrow-down.svg";
import IconArrowUp from "@public/icons/arrow-up.svg";
import IconArrowUpDown from "@public/icons/arrow-down-up.svg";
import IconFilter from "@public/icons/table/filter.svg";
import Image from "next/image";
import { Loading } from "./loading";
import dayjs from "dayjs";
import { ButtonBase } from "./button";

export type FilterType = "text" | "date" | "time" | "select";
type FilterState<T> = Partial<Record<keyof T, string | number | Date>>;

export interface Column<T> {
  title: string | React.ReactNode;
  dataIndex?: keyof T;
  render?: (
    value: T[keyof T] | undefined,
    record: T,
    index: number
  ) => React.ReactNode;
  className?: string;
  sorter?: (a: T, b: T) => number;
  width?: number | string;
  filterType?: FilterType; // Kiểu lọc
  onFilter?: (value: string | number | Date, record: T) => boolean;
}

export interface Pagination {
  current: number;
  pageSize: number;
  total: number;
  showSizeChanger?: boolean;
  onPageChange?: (page: number, pageSize: number) => void;
}

export interface RowSelection<T> {
  selectedRowKeys: (string | number)[];
  onChange: (selectedRowKeys: (string | number)[], selectedRows: T[]) => void;
}

interface BaseTableProps<T> {
  columns: Column<T>[];
  data: T[];
  rowKey: keyof T;
  className?: string;
  classNameRow?: string;
  styleRow?: React.CSSProperties | ((record: T) => React.CSSProperties);
  loading?: boolean;
  pagination?: Pagination;
  isSTT?: boolean;
  onRow?: (
    record: T,
    index: number
  ) => React.HTMLAttributes<HTMLTableRowElement>;
  sortType?: "asc" | "desc" | null;
  rowSelection?: RowSelection<T>;
  classNameHead?: string;
  renderExpandRow?: (record: T) => React.ReactNode;
}

export function TableBase<T>({
  columns,
  data,
  rowKey,
  className = "",
  classNameRow,
  styleRow,
  loading = false,
  pagination,
  isSTT = true,
  onRow,
  sortType = "asc",
  rowSelection,
  classNameHead,
  renderExpandRow,
}: BaseTableProps<T>) {
  // Loc dữ liệu ============================
  const [isOpenFilter, setIsOpenFilter] = React.useState<number | null>(null);
  const [filters, setFilters] = React.useState<FilterState<T>>({});
  const [expandedRowKey, setExpandedRowKey] = React.useState<
    string | number | null
  >(null);
  const filterRef = React.useRef<HTMLDivElement>(null);
  const handleFilterChange = <K extends keyof T>(
    dataIndex: K,
    value: string | number | Date
  ) => {
    setFilters((prev) => ({ ...prev, [dataIndex]: value }));
  };

  const filteredData = useMemo(() => {
    return data.filter((record) =>
      columns.every((col) => {
        const key = col.dataIndex as keyof T;
        const value = filters[key];
        if (!value) return true;

        if (col.onFilter) return col.onFilter(value, record);

        const recordValue = record[key];
        if (col.filterType === "text")
          return String(recordValue ?? "")
            .toLowerCase()
            .includes(String(value).toLowerCase());
        if (col.filterType === "date")
          return dayjs(recordValue as string).isSame(
            dayjs(value as string),
            "day"
          );
        if (col.filterType === "time")
          return dayjs(recordValue as string).format("HH:mm") === value;
        return true;
      })
    );
  }, [data, filters, columns]);

  // Sắp xếp dữ liệu ============================
  const [sortConfig, setSortConfig] = React.useState<{
    columnIndex: number | null;
    direction: "asc" | "desc" | null;
  }>({ columnIndex: null, direction: sortType ?? null });

  //   sắp xếp dữ liệu ============================
  const handleSort = (colIndex: number) => {
    if (!columns[colIndex].sorter) return;

    setSortConfig((prev) => {
      if (prev.columnIndex === colIndex) {
        // Đảo chiều sắp xếp
        const newDirection = prev.direction === "asc" ? "desc" : "asc";
        return { columnIndex: colIndex, direction: newDirection };
      } else {
        return { columnIndex: colIndex, direction: "asc" };
      }
    });
  };

  //   sắp xếp dữ liệu ============================
  const sortedData = useMemo(() => {
    const source = filteredData; // <-- dùng dữ liệu đã lọc
    if (
      sortConfig.columnIndex !== null &&
      columns[sortConfig.columnIndex]?.sorter
    ) {
      const sorter = columns[sortConfig.columnIndex].sorter!;
      const sorted = [...source].sort((a, b) => sorter(a, b));
      return sortConfig.direction === "asc" ? sorted : sorted.reverse();
    }
    if (sortConfig.direction === "asc") return source;
    // không có sort thì đảo ngược để dữ liệu mới lên đầu
    return [...source].reverse();
  }, [filteredData, sortConfig, columns]);

  //   tính toán phân trang paging ============================
  const paginatedData = useMemo(() => {
    if (!pagination) return sortedData;
    // Nếu dữ liệu đã phân trang từ server, không slice
    if (pagination.total > sortedData.length) {
      return sortedData;
    }
    const { current, pageSize } = pagination;
    const start = (current - 1) * pageSize;
    const end = start + pageSize;
    return sortedData.slice(start, end);
  }, [sortedData, pagination]);

  useEffect(() => {
    // Hàm xử lý khi click ngoài
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setIsOpenFilter(null); // Đóng khi click ra ngoài
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  //   Tạo paging ==================================
  const renderPagination = () => {
    if (!pagination) return null;
    const { current, pageSize, total, onPageChange } = pagination;
    const totalPages = Math.ceil(total / pageSize);

    const pageNumbers: (number | "...")[] = [];

    const visiblePages = 5;
    const startPage = Math.max(1, current - Math.floor(visiblePages / 2));
    const endPage = Math.min(totalPages, startPage + visiblePages - 1);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (endPage < totalPages) {
      pageNumbers.push("...");
    }

    return (
      <div className="flex flex-wrap gap-2 justify-between items-center mt-5 text-sm text-gray-700 p-1">
        {/* Tổng số page hiển thị */}
        <div className="text-gray-600 font-bold">
          Hiển thị {(current - 1) * pageSize + 1} -{" "}
          {Math.min(current * pageSize, total)} / Tổng số: {total} bản ghi
        </div>
        <div className="flex items-center gap-1">
          {/* Về đầu */}
          <button
            onClick={() => onPageChange?.(1, pageSize)}
            className="p-2 w-7 h-7 disabled:opacity-40 hover:bg-[#f0f0f0]"
            disabled={current === 1}
          >
            <Image src={IconTriangleDoubleLeft} alt="" width={10} height={10} />
          </button>

          {/* Lùi 1 */}
          <button
            onClick={() => onPageChange?.(current - 1, pageSize)}
            className="p-2 w-7 h-7 disabled:opacity-40 hover:bg-[#f0f0f0]"
            disabled={current === 1}
          >
            <Image src={IconTriangleLeft} alt="" width={13} height={13} />
          </button>

          {/* Các trang */}
          {pageNumbers.map((page, index) =>
            page === "..." ? (
              <span key={index} className="px-2 py-1">
                ...
              </span>
            ) : (
              <button
                key={index}
                onClick={() => onPageChange?.(page, pageSize)}
                className={`px-3 py-1 rounded ${
                  current === page
                    ? "bg-green-500 text-white font-semibold"
                    : "bg-white text-gray-800"
                }`}
              >
                {page}
              </button>
            )
          )}

          {/* Tiến 1 */}
          <button
            onClick={() => onPageChange?.(current + 1, pageSize)}
            className="p-2 w-7 h-7 disabled:opacity-40 hover:bg-[#f0f0f0]"
            disabled={current === totalPages}
          >
            <Image src={IconTriangleRight} alt="" width={13} height={13} />
          </button>

          {/* Về cuối */}
          <button
            onClick={() => onPageChange?.(totalPages, pageSize)}
            className="p-2 w-7 h-7 disabled:opacity-40 hover:bg-[#f0f0f0]"
            disabled={current === totalPages}
          >
            <Image
              src={IconTriangleDoubleRight}
              alt=""
              width={10}
              height={10}
            />
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className={`overflow-auto ${className}`}>
        <table className="min-w-full text-md bg-white">
          <thead
            className={`${classNameHead} bg-[#99b4d4] text-gray-800 font-semibold text-sm`}
          >
            <tr>
              {/* Checkbox ================ */}
              {rowSelection && (
                <th className="p-2 border text-center border-gray-400">
                  <input
                    type="checkbox"
                    checked={
                      paginatedData.length > 0 &&
                      paginatedData.every((record) =>
                        rowSelection.selectedRowKeys.includes(
                          record[rowKey] as string | number
                        )
                      )
                    }
                    onChange={(e) => {
                      if (e.target.checked) {
                        const keys = paginatedData.map((r) => r[rowKey]) as (
                          | string
                          | number
                        )[];
                        rowSelection.onChange(keys, paginatedData);
                      } else {
                        rowSelection.onChange([], []);
                      }
                    }}
                    className="cursor-pointer w-[18px] h-[18px]"
                  />
                </th>
              )}
              {/* STT ================ */}
              {isSTT && (
                <th
                  className={`border border-gray-400 text-center p-1 w-[50px]`}
                >
                  STT
                </th>
              )}
              {/* Column ================= */}
              {columns.map((col, index) => {
                const key = col.dataIndex as keyof T;
                return (
                  <th
                    key={index}
                    className={`p-2 py-2 border border-gray-400
                  text-left min-w-[100px] max-w-full select-none`}
                    style={
                      col.width
                        ? {
                            width:
                              typeof col.width === "number"
                                ? `${col.width}px`
                                : col.width,
                          }
                        : undefined
                    }
                  >
                    <div className="flex items-center justify-between gap-1">
                      {/* Bộ sắp xếp ============= */}
                      <div
                        onClick={() => handleSort(index)}
                        className={`flex items-center gap-1 cursor-pointer ${col.className}`}
                      >
                        {col.title}
                        {/* Bộ sắp xếp ============= */}
                        {col.sorter &&
                          (sortConfig.columnIndex === index ? (
                            sortConfig.direction === "asc" ? (
                              <Image
                                src={IconArrowUp}
                                alt=""
                                width={10}
                                height={10}
                              />
                            ) : (
                              <Image
                                src={IconArrowDown}
                                alt=""
                                width={10}
                                height={10}
                              />
                            )
                          ) : (
                            <Image
                              src={IconArrowUpDown}
                              alt=""
                              width={10}
                              height={10}
                            />
                          ))}
                      </div>

                      {/* Bộ lọc ============= */}
                      {col.filterType && (
                        <ButtonBase
                          onClick={() => {
                            const keytoindex = columns.findIndex(
                              (item) => item.dataIndex === key
                            );
                            setIsOpenFilter((prev) =>
                              prev === keytoindex ? null : keytoindex
                            ); // toggle đúng cột
                          }}
                          className={`!p-[6px] hover:bg-[#F2F2F2] flex-none relative rounded-none
                        ${isOpenFilter === index && "bg-white"} `}
                        >
                          <Image
                            src={IconFilter}
                            alt=""
                            width={13}
                            height={13}
                          />
                          {col.filterType &&
                            (filters[key] as string) !== "" &&
                            (filters[key] as string) !== undefined && (
                              <div className="w-1 h-1 rounded-full bg-red-500 absolute top-[2px] right-[2px]" />
                            )}
                        </ButtonBase>
                      )}
                    </div>
                    {/* Bộ lọc ============= */}
                    {col.filterType && isOpenFilter === index && (
                      <div className="bg-white p-2 rounded" ref={filterRef}>
                        {col.filterType === "text" && (
                          <input
                            type="search"
                            value={(filters[key] as string) || ""}
                            onChange={(e) =>
                              handleFilterChange(key, e.target.value)
                            }
                            placeholder="Nhập từ khóa..."
                            className="w-full text-sm text-gray-500 font-normal"
                          />
                        )}
                        {col.filterType === "date" && (
                          <input
                            type="date"
                            value={(filters[key] as string) || ""}
                            onChange={(e) =>
                              handleFilterChange(key, e.target.value)
                            }
                            className="w-full text-sm text-gray-500 font-normal"
                          />
                        )}
                        {col.filterType === "time" && (
                          <input
                            type="time"
                            value={(filters[key] as string) || ""}
                            onChange={(e) =>
                              handleFilterChange(key, e.target.value)
                            }
                            className="w-full text-sm text-gray-500 font-normal"
                          />
                        )}
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="text-md text-gray-600">
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="text-center p-4">
                  <Loading />
                </td>
              </tr>
            ) : paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-center p-4">
                  Không có dữ liệu, vui lòng thử lại!
                </td>
              </tr>
            ) : (
              paginatedData.map((record, rowIndex) => {
                const key = record[rowKey] as string | number;
                // Checkbox =======================
                const isSelected = rowSelection?.selectedRowKeys.includes(key);
                // tính STT =======================
                const pageOffset =
                  pagination &&
                  typeof pagination.current === "number" &&
                  typeof pagination.pageSize === "number"
                    ? (pagination.current - 1) * pagination.pageSize
                    : 0;
                const globalIndex = pageOffset + rowIndex + 1;

                const isExpanded =
                  expandedRowKey === (record[rowKey] as string | number);

                return (
                  <React.Fragment key={key}>
                    <tr
                      key={key}
                      className={`text-md border-b border-gray-200 cursor-pointer -z-0 ${
                        isSelected ? "bg-blue-50" : ""
                      } ${classNameRow} `}
                      style={
                        typeof styleRow === "function"
                          ? styleRow(record)
                          : {
                              ...styleRow,
                              ...(onRow?.(record, rowIndex)?.style ?? {}),
                              ...(isExpanded
                                ? { backgroundColor: "#f0f8ff" }
                                : {}),
                            }
                      }
                      onClick={(e) => {
                        const target = e.target as HTMLElement;
                        // Nếu click vào button, link, input... thì không chạy onRow
                        if (
                          target.closest("button") ||
                          target.closest("a") ||
                          target.closest("input") ||
                          target.closest("textarea") ||
                          target.closest("canvas") ||
                          target.closest("select")
                        ) {
                          return;
                        }
                        if (renderExpandRow) {
                          setExpandedRowKey((prev) =>
                            prev === key ? null : key
                          );
                        }
                        onRow?.(record, rowIndex)?.onClick?.(e);
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLTableRowElement).style.filter =
                          "brightness(0.95)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLTableRowElement).style.filter =
                          "brightness(1)";
                      }}
                    >
                      {/* Checkbox ============= */}
                      {rowSelection && (
                        <td className="p-2 border text-center border-gray-400">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={(e) => {
                              if (e.target.checked) {
                                const newKeys = [
                                  ...rowSelection.selectedRowKeys,
                                  key,
                                ];
                                const newRows = data.filter((d) =>
                                  newKeys.includes(d[rowKey] as string | number)
                                );
                                rowSelection.onChange(newKeys, newRows);
                              } else {
                                const newKeys =
                                  rowSelection.selectedRowKeys.filter(
                                    (k) => k !== key
                                  );
                                const newRows = data.filter((d) =>
                                  newKeys.includes(d[rowKey] as string | number)
                                );
                                rowSelection.onChange(newKeys, newRows);
                              }
                            }}
                            className="cursor-pointer w-[18px] h-[18px]"
                          />
                        </td>
                      )}
                      {/* STT ============= */}
                      {isSTT && (
                        <td
                          className={`p-3 border border-gray-400 text-center`}
                        >
                          {globalIndex}
                        </td>
                      )}
                      {/* Colums ============= */}
                      {columns.map((col, colIndex) => (
                        <td
                          key={colIndex}
                          className={`p-3 border border-gray-400`}
                        >
                          {col.render
                            ? col.render(
                                col.dataIndex
                                  ? record[col.dataIndex]
                                  : undefined,
                                record,
                                rowIndex
                              )
                            : col.dataIndex
                            ? typeof record[col.dataIndex] === "object"
                              ? JSON.stringify(record[col.dataIndex])
                              : String(record[col.dataIndex] ?? "")
                            : ""}
                        </td>
                      ))}
                    </tr>
                    {/* expand row */}
                    {renderExpandRow && isExpanded && (
                      <tr className="bg-gray-50 border border-blue-400">
                        <td
                          colSpan={columns.length + (isSTT ? 1 : 0)}
                          className="p-4 border-t border-gray-300"
                        >
                          {renderExpandRow(record)}
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      {renderPagination()}
    </>
  );
}
