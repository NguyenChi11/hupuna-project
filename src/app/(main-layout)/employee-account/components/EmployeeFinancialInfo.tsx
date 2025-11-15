// src/app/(main-layout)/employee-account/components/EmployeeFinancialInfo.tsx
"use client";

import { Input } from "@/components/ui/_base/Input";
import { Label } from "@/components/ui/_base/Label";
import {Employment} from "@/types/employment";

interface EmployeeFinancialInfoProps {
    salary?: number;
    bankAccount?: string;
    taxCode?: string;
    insuranceNumber?: string;
    onInputChange: (field: keyof Employment, value: string | number) => void; // ← ĐÚNG
}

export function EmployeeFinancialInfo({
                                          salary,
                                          bankAccount,
                                          taxCode,
                                          insuranceNumber,
                                          onInputChange,
                                      }: EmployeeFinancialInfoProps) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Thông tin tài chính</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="salary">Lương cơ bản (VND)</Label>
                    <Input
                        id="salary"
                        type="number"
                        value={salary || ""}
                        onChange={(e) => onInputChange("salary", Number(e.target.value))}
                        placeholder="15,000,000"
                    />
                </div>
                <div>
                    <Label htmlFor="bankAccount">Số tài khoản ngân hàng</Label>
                    <Input
                        id="bankAccount"
                        value={bankAccount || ""}
                        onChange={(e) => onInputChange("bankAccount", e.target.value)}
                        placeholder="0123456789"
                    />
                </div>
                <div>
                    <Label htmlFor="taxCode">Mã số thuế</Label>
                    <Input
                        id="taxCode"
                        value={taxCode || ""}
                        onChange={(e) => onInputChange("taxCode", e.target.value)}
                        placeholder="1234567890"
                    />
                </div>
                <div>
                    <Label htmlFor="insuranceNumber">Số BHXH</Label>
                    <Input
                        id="insuranceNumber"
                        value={insuranceNumber || ""}
                        onChange={(e) => onInputChange("insuranceNumber", e.target.value)}
                        placeholder="123456789"
                    />
                </div>
            </div>
        </div>
    );
}