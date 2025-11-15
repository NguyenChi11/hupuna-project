"use client";

import { ALL_COLUMNS } from "@/lib/employment/columns";
import { DEFAULT_EMPLOYEES } from "@/lib/employment/data_employment";
import { Popover } from "@/components/ui/_base/Popover";
import { Button } from "@/components/ui/_base/Button";
import { Input } from "@/components/ui/_base/Input";
import { Employment, FilterConfig } from "@/types/employment";
import { useState, useEffect, useMemo } from "react";
import {FilterType} from "@/components/ui/base/table";


// Interface riêng cho filter – chỉ chứa những gì cần
interface FilterColumn {
    title?: React.ReactNode;
    filterType?: FilterType;
    filterable?: boolean;
}

// Props cho renderFilterInput
interface FilterInputProps {
    col: FilterColumn;
    fieldKey: string;
    value: string;
    onChange: (key: string, value: string) => void;
    options?: string[];
}

// Component con: render input theo loại filter
function FilterInput({ col, fieldKey, value, onChange, options = [] }: FilterInputProps) {
    const filterType = col.filterType;

    if (filterType === "text") {
        return (
            <Input
                type="text"
                placeholder={`Tìm ${typeof col.title === "string" ? col.title.toLowerCase() : "thông tin"}...`}
                value={value}
                onChange={(e) => onChange(fieldKey, e.target.value)}
                className="w-full"
            />
        );
    }

    if (filterType === "date") {
        return (
            <Input
                type="date"
                value={value}
                onChange={(e) => onChange(fieldKey, e.target.value)}
                className="w-full"
            />
        );
    }

    if (filterType === "select") {
        return (
            <select
                value={value}
                onChange={(e) => onChange(fieldKey, e.target.value)}
                className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="">Tất cả</option>
                {options.map((opt) => (
                    <option key={opt} value={opt}>
                        {opt}
                    </option>
                ))}
            </select>
        );
    }

    return null;
}

// Main Component
interface FilterPopoverProps {
    onApply: (filters: FilterConfig) => void;
    onClear: () => void;
    currentFilters: FilterConfig;
}

export function FilterPopover({ onApply, onClear, currentFilters }: FilterPopoverProps) {
    // Chuyển FilterConfig (string[]) → Record<string, string> để hiển thị
    const initialFilters = useMemo(() => {
        const result: Record<string, string> = {};
        Object.entries(currentFilters).forEach(([key, values]) => {
            result[key] = values[0] ?? "";
        });
        return result;
    }, [currentFilters]);

    const [tempFilters, setTempFilters] = useState<Record<string, string>>(initialFilters);

    // Đồng bộ khi currentFilters thay đổi từ bên ngoài
    useEffect(() => {
        setTempFilters(initialFilters);
    }, [initialFilters]);

    const handleChange = (key: string, value: string) => {
        setTempFilters((prev) => ({ ...prev, [key]: value }));
    };

    const handleApply = () => {
        const converted: FilterConfig = {};
        Object.entries(tempFilters).forEach(([key, value]) => {
            if (value) {
                converted[key] = [value];
            }
        });
        onApply(converted);
    };

    const handleClear = () => {
        setTempFilters({});
        onClear();
    };

    // Lấy danh sách options cho select filter
    const getOptions = (key: keyof Employment): string[] => {
        return [...new Set(
            DEFAULT_EMPLOYEES
                .map((e) => e[key])
                .filter((val): val is string | number => val != null && (typeof val === "string" || typeof val === "number"))
                .map(String)
        )].sort();
    };

    return (
        <Popover
            trigger={
                <Button variant="secondary" className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V20a1 1 0 01-1.555.832l-4-2.5A1 1 0 019 17.5v-3.793a1 1 0 00-.293-.707L2.293 6.707A1 1 0 012 6V4z"
                        />
                    </svg>
                    Lọc
                    {Object.keys(currentFilters).length > 0 && (
                        <span className="ml-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {Object.keys(currentFilters).length}
            </span>
                    )}
                </Button>
            }
            align="left"
            direction="top"
        >
            <div className="w-full h-screen ">
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    <h3 className="font-semibold text-sm overflow-y-auto">Bộ lọc</h3>

                    {Object.entries(ALL_COLUMNS)
                        .filter(([_, col]) => col.filterable ?? false)
                        .map(([key, col]) => {
                            const options = col.filterType === "select" ? getOptions(key as keyof Employment) : [];

                            // Tạo object nhỏ chỉ chứa field cần cho filter
                            const filterCol: FilterColumn = {
                                title: col.title,
                                filterType: col.filterType,
                                filterable: col.filterable,
                            };

                            return (
                                <div key={key}>
                                    <label className="text-xs font-medium text-gray-600 block mb-1">
                                        {typeof col.title === "string" ? col.title : key}
                                    </label>
                                    <FilterInput
                                        col={filterCol}
                                        fieldKey={key}
                                        value={tempFilters[key] ?? ""}
                                        onChange={handleChange}
                                        options={options}
                                    />
                                </div>
                            );
                        })}


                </div>
                <div className="sticky bottom-0 left-0 bg-white pt-2 border-t flex gap-2">
                    <Button variant="primary" className="flex-1" onClick={handleApply}>
                        Áp dụng
                    </Button>
                    <Button variant="secondary" className="flex-1" onClick={handleClear}>
                        Xóa
                    </Button>
                </div>
            </div>

        </Popover>
    );
}