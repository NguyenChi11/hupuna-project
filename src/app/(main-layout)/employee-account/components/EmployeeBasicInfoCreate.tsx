// src/app/(main-layout)/employee-account/components/EmployeeBasicInfo.tsx
"use client";

import { Input } from "@/components/ui/_base/Input";
import { Label } from "@/components/ui/_base/Label";
import {Employment} from "@/types/employment";

interface EmployeeBasicInfoProps {
    employeeId?: string;
    fullName?: string;
    phone?: string;
    email?: string;
    password?: string;
    onInputChange: (field: keyof Employment, value: string | number) => void; // ← ĐÚNG
}

export function EmployeeBasicInfoCreate({
                                      employeeId,
                                      fullName,
                                      phone,
                                      email,
                                      password,
                                      onInputChange,
                                  }: EmployeeBasicInfoProps) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Thông tin cơ bản</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="employeeId">Mã nhân viên</Label>
                    <Input
                        id="employeeId"
                        value={employeeId || ""}
                        onChange={(e) => onInputChange("employeeId", e.target.value)}
                        placeholder="NV001"
                    />
                </div>
                <div>
                    <Label htmlFor="fullName">Họ và tên *</Label>
                    <Input
                        id="fullName"
                        value={fullName || ""}
                        onChange={(e) => onInputChange("fullName", e.target.value)}
                        placeholder="Nguyễn Văn A"
                        required
                    />
                </div>
                <div>
                    <Label htmlFor="phone">Số điện thoại *</Label>
                    <Input
                        id="phone"
                        type="tel"
                        value={phone || ""}
                        onChange={(e) => onInputChange("phone", e.target.value)}
                        placeholder="0901234567"
                        required
                    />
                </div>
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        value={email || ""}
                        onChange={(e) => onInputChange("email", e.target.value)}
                        placeholder="nva@example.com"
                    />
                </div>
                <div>
                    <Label htmlFor="password">Mật khẩu (nếu có)</Label>
                    <Input
                        id="password"
                        type="password"
                        value={password || ""}
                        onChange={(e) => onInputChange("password", e.target.value)}
                        placeholder="••••••••"
                    />
                </div>
            </div>
        </div>
    );
}