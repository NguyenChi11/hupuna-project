// src/app/(main-layout)/employee-account/components/EmployeeContactInfo.tsx
"use client";

import { Input } from "@/components/ui/_base/Input";
import { Label } from "@/components/ui/_base/Label";
import TextArea from "antd/es/input/TextArea";
import {Employment} from "@/types/employment";

interface EmployeeContactInfoProps {
    address?: string;
    birthday?: string;
    note?: string;
    onInputChange: (field: keyof Employment, value: string | number) => void; // ← ĐÚNG
}

export function EmployeeContactInfo({
                                        address,
                                        birthday,
                                        note,
                                        onInputChange,
                                    }: EmployeeContactInfoProps) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Liên hệ & Cá nhân</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                    <Label htmlFor="address">Địa chỉ</Label>
                    <Input
                        id="address"
                        value={address || ""}
                        onChange={(e) => onInputChange("address", e.target.value)}
                        placeholder="123 Đường Láng, Hà Nội"
                    />
                </div>
                <div>
                    <Label htmlFor="birthday">Ngày sinh</Label>
                    <Input
                        id="birthday"
                        type="date"
                        value={birthday || ""}
                        onChange={(e) => onInputChange("birthday", e.target.value)}
                    />
                </div>
                <div className="md:col-span-2">
                    <Label htmlFor="note">Ghi chú</Label>
                    <TextArea
                        id="note"
                        value={note || ""}
                        onChange={(e) => onInputChange("note", e.target.value)}
                        placeholder="Thông tin bổ sung..."
                        rows={3}
                    />
                </div>
            </div>
        </div>
    );
}