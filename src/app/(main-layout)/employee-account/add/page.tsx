// src/app/employees/add/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import { Employment } from "@/types/employment";
import {SuccessScreen} from "@/app/(main-layout)/customers/components/SuccessScreen";
import {CustomerAvatarSection} from "@/app/(main-layout)/customers/components/CustomerAvatarSection";
import {EmployeeWorkInfo} from "@/app/(main-layout)/employee-account/components/EmployeeWorkInfo";
import {EmployeeBasicInfoCreate} from "@/app/(main-layout)/employee-account/components/EmployeeBasicInfoCreate";
import {EmployeeContactInfo} from "@/app/(main-layout)/employee-account/components/EmployeeContactInfo";
import {EmployeeFinancialInfo} from "@/app/(main-layout)/employee-account/components/EmployeeFinancialInfo";
import {EmployeeContractInfo} from "@/app/(main-layout)/employee-account/components/EmployeeContractInfo";

export default function AddEmployeePage() {
    const router = useRouter();
    const [showConfirm, setShowConfirm] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    // Avatar
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string>("");

    const [formData, setFormData] = useState<Partial<Employment>>({
        employeeId: "",
        fullName: "",
        phone: "",
        address: "",
        department: "",
        position: "",
        employmentType: "full_time",
        manager: "",
        zaloManager: "",
        advisor: "",
        employeeSegment: "",
        employeeStatus: "",
        email: "",
        password: "",
        hireDate: "",
        lastContact: "",
        birthday: "",
        note: "",
        salary: undefined,
        bankAccount: "",
        taxCode: "",
        insuranceNumber: "",
        startDate: "",
        endDate: null,
        status: [],
        avatar: "",
    });

    const handleInputChange = (field: keyof Employment, value: string | number) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleAvatarUpload = (file: File | null, previewUrl: string) => {
        setAvatarFile(file);
        setAvatarPreview(previewUrl);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setShowConfirm(true);
    };

    const handleConfirm = () => {
        setShowConfirm(false);

        const finalAvatarUrl = avatarFile
            ? `/uploads/employee-${Date.now()}.jpg`
            : "";

        const newEmployee: Employment = {
            id: String(Date.now()),
            employeeId: formData.employeeId || `NV${String(Date.now()).slice(-6)}`,
            fullName: formData.fullName || "",
            phone: formData.phone || "",
            address: formData.address || "",
            department: formData.department || "",
            position: formData.position || "",
            employmentType: formData.employmentType || "full_time",
            manager: formData.manager || "",
            zaloManager: formData.zaloManager,
            advisor: formData.advisor,
            employeeSegment: formData.employeeSegment,
            employeeStatus: formData.employeeStatus,
            email: formData.email || "",
            password: formData.password || "",
            hireDate: formData.hireDate,
            lastContact: formData.lastContact,
            birthday: formData.birthday,
            note: formData.note,
            salary: formData.salary,
            bankAccount: formData.bankAccount,
            taxCode: formData.taxCode,
            insuranceNumber: formData.insuranceNumber,
            startDate: formData.startDate,
            endDate: formData.endDate || null,
            avatar: finalAvatarUrl,
            status: formData.status?.length
                ? formData.status
                : [{ key: "active", label: "Đang làm việc", bgColor: "#10B981", textColor: "#FFFFFF" }],
        };

        sessionStorage.setItem("newEmployee", JSON.stringify(newEmployee));
        setShowSuccess(true);
    };

    if (showSuccess) {
        return (
            <SuccessScreen
                customerName={formData.fullName || "Nhân viên"}
                actionType="add"
                onBackClick={() => router.push("/employee-account")}
            />
        );
    }

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="max-w-5xl mx-auto px-6 py-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Avatar */}
                    <CustomerAvatarSection
                        avatarPreview={avatarPreview}
                        customerName={formData.fullName || "Nhân viên mới"}
                        onUploaded={handleAvatarUpload}
                        isEditMode={false}
                    />

                    {/* 1. Thông tin cơ bản */}
                    <EmployeeBasicInfoCreate
                        employeeId={formData.employeeId}
                        fullName={formData.fullName}
                        phone={formData.phone}
                        email={formData.email}
                        password={formData.password}
                        onInputChange={handleInputChange}
                    />

                    {/* 2. Liên hệ & cá nhân */}
                    <EmployeeContactInfo
                        address={formData.address}
                        birthday={formData.birthday}
                        note={formData.note}
                        onInputChange={handleInputChange}
                    />

                    {/* 3. Công việc */}
                    <EmployeeWorkInfo
                        department={formData.department}
                        position={formData.position}
                        employmentType={formData.employmentType}
                        manager={formData.manager}
                        zaloManager={formData.zaloManager}
                        advisor={formData.advisor}
                        employeeSegment={formData.employeeSegment}
                        employeeStatus={formData.employeeStatus}
                        hireDate={formData.hireDate}
                        lastContact={formData.lastContact}
                        status={formData.status}
                        onInputChange={handleInputChange}
                    />

                    {/* 4. Tài chính */}
                    <EmployeeFinancialInfo
                        salary={formData.salary}
                        bankAccount={formData.bankAccount}
                        taxCode={formData.taxCode}
                        insuranceNumber={formData.insuranceNumber}
                        onInputChange={handleInputChange}
                    />

                    {/* 5. Hợp đồng */}
                    <EmployeeContractInfo
                        startDate={formData.startDate}
                        endDate={formData.endDate}
                        onInputChange={handleInputChange}
                    />

                    {/* Nút */}
                    <div className="flex gap-4 justify-end pt-6 border-t">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="px-6 py-2.5 rounded-lg border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2.5 rounded-lg bg-blue-600 text-sm font-medium text-white hover:bg-blue-700 transition-all"
                        >
                            Thêm nhân viên
                        </button>
                    </div>
                </form>
            </div>

            {/* Confirm Dialog */}
            {showConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
                    <div className="relative w-full max-w-md bg-white rounded-xl shadow-2xl p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Xác nhận thêm nhân viên</h3>
                            <button onClick={() => setShowConfirm(false)}>
                                <FontAwesomeIcon icon={faTimes} className="h-4 w-4 text-gray-500" />
                            </button>
                        </div>
                        <p className="text-sm text-gray-600 mb-6">
                            Thêm nhân viên <strong>{formData.fullName}</strong> vào hệ thống?
                        </p>
                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={handleConfirm}
                                className="px-4 py-2 rounded-lg bg-blue-600 text-sm font-medium text-white hover:bg-blue-700"
                            >
                                Xác nhận
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}