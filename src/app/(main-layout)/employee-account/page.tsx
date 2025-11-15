"use client";

import React, {useState, useMemo, useEffect, useRef} from "react";
import { CountCard } from "@/components/ui/_base/CountCard";
import { DEFAULT_EMPLOYEES } from "@/lib/employment/data_employment";
import { Employment, FilterConfig } from "@/types/employment";
import { faPlus,faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ALL_COLUMNS } from "@/lib/employment/columns";
import { Input } from "@/components/ui/_base/Input";
import { FilterPopover } from "@/components/ui/base/FilterPopover";
import { EmployeeTable } from "@/app/(main-layout)/employee-account/components/EmployeeTable";
import dayjs from "dayjs";
import Link from "next/link";
import {Button} from "@/components/ui/_base/Button";

const EmployeeAccountPage = () => {
    const [employees, setEmployee] = useState<Employment[]>(DEFAULT_EMPLOYEES);

    // === STATE ===
    const [selectedRowKeys, setSelectedRowKeys] = useState<(string | number)[]>([]);
    const [globalSearch, setGlobalSearch] = useState("");
    const [filters, setFilters] = useState<FilterConfig>({}); // ✅ string[]
    const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>(() => {
        const init: Record<string, boolean> = { checkbox: true, stt: true };
        ["employeeId", "fullName", "department", "position", "hireDate"].forEach(
            (k) => (init[k] = true)
        );
        return init;
    });

    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
    });

    useEffect(() => {
        const newEmployeeData = sessionStorage.getItem("newEmployee");
        if (newEmployeeData) {
            const newEmployee = JSON.parse(newEmployeeData);

            // Dùng setTimeout để "thoát" synchronous update
            sessionStorage.removeItem("newEmployee");
            setTimeout(() => {
                setEmployee((prev) => [...prev, newEmployee]);
            }, 0);
        }
    }, []);

    // === DỮ LIỆU SAU LỌC ===
    const filteredData = useMemo(() => {
        return employees.filter((emp) => {
            // Global search
            if (globalSearch) {
                const s = globalSearch.toLowerCase();
                if (!Object.values(emp).join(" ").toLowerCase().includes(s)) return false;
            }

            // Filters - ✅ XỬ LÝ ARRAY
            for (const [k, values] of Object.entries(filters)) {
                if (!values || values.length === 0) continue; // ✅ Check array rỗng

                const val = emp[k as keyof Employment];
                const col = ALL_COLUMNS[k];

                // ✅ TEXT: check nếu value chứa bất kỳ string nào trong array
                if (col?.filterType === "text") {
                    const matched = values.some((v) =>
                        String(val ?? "").toLowerCase().includes(v.toLowerCase())
                    );
                    if (!matched) return false;
                }

                // ✅ DATE: check nếu value match bất kỳ date nào trong array
                if (col?.filterType === "date") {
                    const matched = values.some((v) =>
                        dayjs(val as string).isSame(dayjs(v), "day")
                    );
                    if (!matched) return false;
                }

                // ✅ SELECT: check nếu value nằm trong array
                if (col?.filterType === "select") {
                    if (!values.includes(String(val))) return false;
                }
            }

            return true;
        });
    }, [employees, globalSearch, filters]);



    return (
        <div className="p-4 bg-white rounded-md space-y-4">
            {/* HEADER */}
            <div className="flex items-center justify-between">
                <CountCard
                    icon={<FontAwesomeIcon icon={faUsers} className="h-5 w-5" />}
                    title="Danh sách nhân viên"
                    count={String(filteredData.length)}
                    label="nhân viên"
                />

                <div className="space-y-6">
                    <div className="flex gap-2 items-center">
                        <FilterPopover
                            currentFilters={filters}
                            onApply={setFilters}
                            onClear={() => setFilters({})}
                        />
                        <Input
                            placeholder="Tìm kiếm nhân viên..."
                            value={globalSearch}
                            onChange={(e) => setGlobalSearch(e.target.value)}
                            className="w-64"
                        />

                    </div>
                    <div className="flex w-full">
                        <div></div>
                        <Button variant="primary">
                            <FontAwesomeIcon icon={faPlus} className="h-4 w-4" />
                            <Link href='/employee-account/add'>Thêm nhân viên</Link>
                        </Button>
                    </div>


                </div>


            </div>

            <div className="h-px bg-gray-200" />

            {/* BẢNG */}
            <div className="flex-1 overflow-auto">
                <EmployeeTable
                    employee={filteredData}
                    filters={filters}
                    visibleColumns={visibleColumns}
                    onFiltersChange={setFilters}
                    onVisibleColumnsChange={setVisibleColumns}
                />
            </div>
        </div>
    );
};

export default EmployeeAccountPage;