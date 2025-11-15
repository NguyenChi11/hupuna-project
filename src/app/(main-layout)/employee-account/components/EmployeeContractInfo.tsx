// src/app/(main-layout)/employee-account/components/EmployeeContractInfo.tsx
"use client";

import { Input } from "@/components/ui/_base/Input";
import { Label } from "@/components/ui/_base/Label";
import {Employment} from "@/types/employment";

interface EmployeeContractInfoProps {
    startDate?: string;
    endDate?: string | null;
    onInputChange: (field: keyof Employment, value: string | number) => void; // ← ĐÚNG
}

export function EmployeeContractInfo({
                                         startDate,
                                         endDate,
                                         onInputChange,
                                     }: EmployeeContractInfoProps) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Hợp đồng lao động</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="startDate">Ngày bắt đầu *</Label>
                    <Input
                        id="startDate"
                        type="date"
                        value={startDate || ""}
                        onChange={(e) => onInputChange("startDate", e.target.value)}
                        required
                    />
                </div>
                <div>
                    <Label htmlFor="endDate">Ngày kết thúc</Label>
                    <Input
                        id="endDate"
                        type="date"
                        value={endDate || ""}
                        onChange={(e) => onInputChange("endDate", e.target.value )}
                        placeholder="Để trống nếu vô thời hạn"
                    />
                </div>
            </div>
        </div>
    );
}