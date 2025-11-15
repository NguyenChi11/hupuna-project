// src/app/(main-layout)/employee-account/components/EmployeeWorkInfo.tsx
"use client";

import { Input } from "@/components/ui/_base/Input";
import { Label } from "@/components/ui/_base/Label";
import { Employment } from "@/types/employment";
import {Select} from "@/components/ui/_base/Select";

interface EmployeeWorkInfoProps {
    department?: string;
    position?: string;
    employmentType?: string;
    manager?: string;
    zaloManager?: string;
    advisor?: string;
    employeeSegment?: string;
    employeeStatus?: string;
    hireDate?: string;
    lastContact?: string;
    status?: Employment["status"];
    onInputChange: (field: keyof Employment, value: any) => void;
}

const employmentTypeOptions = [
    { value: "full_time", label: "Chính thức" },
    { value: "part_time", label: "Bán thời gian" },
    { value: "contract", label: "Hợp đồng" },
    { value: "intern", label: "Thực tập" },
];

const departmentOptions = [
    "Kinh doanh",
    "Kỹ thuật",
    "Marketing",
    "Nhân sự",
    "Tài chính",
    "Hành chính",
    "IT",
];

export function EmployeeWorkInfo({
                                     department,
                                     position,
                                     employmentType,
                                     manager,
                                     zaloManager,
                                     advisor,
                                     employeeSegment,
                                     employeeStatus,
                                     hireDate,
                                     lastContact,
                                     status = [],
                                     onInputChange,
                                 }: EmployeeWorkInfoProps) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Thông tin công việc</h3>

            {/* Dòng 1: Phòng ban, Chức vụ */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="department">Phòng ban *</Label>
                    <div>
                        <Label htmlFor="department">Phòng ban *</Label>
                        <select
                            id="department"
                            value={department || ""}
                            onChange={(e) => onInputChange("department", e.target.value)}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Chọn phòng ban</option>
                            {departmentOptions.map((dept) => (
                                <option key={dept} value={dept}>
                                    {dept}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div>
                    <Label htmlFor="position">Chức vụ</Label>
                    <Input
                        id="position"
                        value={position || ""}
                        onChange={(e) => onInputChange("position", e.target.value)}
                        placeholder="VD: Nhân viên kinh doanh"
                    />
                </div>
            </div>

            {/* Dòng 2: Loại hợp đồng, Quản lý */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="employmentType">Loại hợp đồng</Label>
                    <div>
                        <Label htmlFor="employmentType">Phòng ban *</Label>
                        <select
                            id="employmentType"
                            value={employmentType || ""}
                            onChange={(e) => onInputChange("employmentType", e.target.value)}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Chọn phòng ban</option>
                            {employmentTypeOptions.map((item) => (
                                <option key={item.value} value={item.value}>
                                    {item.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div>
                    <Label htmlFor="manager">Quản lý trực tiếp</Label>
                    <Input
                        id="manager"
                        value={manager || ""}
                        onChange={(e) => onInputChange("manager", e.target.value)}
                        placeholder="Tên quản lý"
                    />
                </div>
            </div>

            {/* Dòng 3: Zalo quản lý, Cố vấn */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="zaloManager">Zalo quản lý</Label>
                    <Input
                        id="zaloManager"
                        value={zaloManager || ""}
                        onChange={(e) => onInputChange("zaloManager", e.target.value)}
                        placeholder="Link Zalo"
                    />
                </div>

                <div>
                    <Label htmlFor="advisor">Cố vấn</Label>
                    <Input
                        id="advisor"
                        value={advisor || ""}
                        onChange={(e) => onInputChange("advisor", e.target.value)}
                        placeholder="Tên cố vấn"
                    />
                </div>
            </div>

            {/* Dòng 4: Phân khúc, Trạng thái nhân viên */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="employeeSegment">Phân khúc nhân viên</Label>
                    <Input
                        id="employeeSegment"
                        value={employeeSegment || ""}
                        onChange={(e) => onInputChange("employeeSegment", e.target.value)}
                        placeholder="VD: Core, Support"
                    />
                </div>

                <div>
                    <Label htmlFor="employeeStatus">Trạng thái nhân viên</Label>
                    <Input
                        id="employeeStatus"
                        value={employeeStatus || ""}
                        onChange={(e) => onInputChange("employeeStatus", e.target.value)}
                        placeholder="VD: Đang làm việc, Nghỉ phép"
                    />
                </div>
            </div>

            {/* Dòng 5: Ngày vào làm, Liên hệ cuối */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="hireDate">Ngày vào làm</Label>
                    <Input
                        id="hireDate"
                        type="date"
                        value={hireDate || ""}
                        onChange={(e) => onInputChange("hireDate", e.target.value)}
                    />
                </div>

                <div>
                    <Label htmlFor="lastContact">Liên hệ cuối</Label>
                    <Input
                        id="lastContact"
                        type="date"
                        value={lastContact || ""}
                        onChange={(e) => onInputChange("lastContact", e.target.value)}
                    />
                </div>
            </div>

            {/* Trạng thái (chips) */}
            <div>
                <Label>Trạng thái hiện tại</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                    {status.length > 0 ? (
                        status.map((s) => (
                            <span
                                key={s.key}
                                className="px-3 py-1 rounded-full text-xs font-medium"
                                style={{
                                    backgroundColor: s.bgColor || "#E5E7EB",
                                    color: s.textColor || "#374151",
                                }}
                            >
                {s.label}
              </span>
                        ))
                    ) : (
                        <span className="text-sm text-gray-500 italic">Chưa có trạng thái</span>
                    )}
                </div>
                {/* Gợi ý: Có thể thêm nút "Thêm trạng thái" */}
            </div>
        </div>
    );
}