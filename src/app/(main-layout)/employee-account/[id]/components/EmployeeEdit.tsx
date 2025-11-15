"use client";

import {useEffect, useState} from "react";
import {useParams, useRouter} from "next/navigation";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faTimes} from "@fortawesome/free-solid-svg-icons";
import {CustomerAvatarSection} from "@/app/(main-layout)/customers/components/CustomerAvatarSection";
import {Employment} from "@/types/employment";
import {DEFAULT_EMPLOYEES} from "@/lib/employment/data_employment";
import {EmployeeBasicInfo} from "@/app/(main-layout)/employee-account/components/EmployeeBasicInfo";
import {EmployeeMainInfor} from "@/app/(main-layout)/employee-account/components/EmployeeMainInfor";

interface EmployeeEditProps {
    id: string;
}

export default function EmployeeEdit({id}: EmployeeEditProps) {
    const params = useParams();
    const router = useRouter();
    const employeeId = params.id as string;
    const [formData, setFormData] = useState<Employment | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string>("");
    const [showConfirm, setShowConfirm] = useState(false);

    useEffect(() => {
        let list = DEFAULT_EMPLOYEES;
        const newEmployment = sessionStorage.getItem("newEmployee");
        if (newEmployment) {
            list = [JSON.parse(newEmployment), ...list];
        }
        const edited = sessionStorage.getItem("editedEmployee");
        if (edited) {
            const editedMap = JSON.parse(edited);
            list = list.map((c) => editedMap[c.id] || c);
        }
        const employee = list.find((c) => c.id === employeeId);
        if (employee) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setFormData(employee);
            setAvatarPreview(employee.avatar || "");
        }
    }, [employeeId]);

    if (!formData) {
        return (
            <div className="w-full py-20 text-center text-gray-500">
                Đang tải thông tin khách hàng...
            </div>
        );
    }

    // ==========================================================
    // HANDLE INPUTS
    // ==========================================================
    const handleInputChange = (field: string, value: unknown) => {
        setFormData((prev) => ({
            ...prev!,
            [field as keyof Employment]: value as string,
        }));
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64 = reader.result as string;
            setAvatarPreview(base64);
            handleInputChange("avatar", base64);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setShowConfirm(true);
    };

    // ==========================================================
    // CONFIRM UPDATE
    // ==========================================================
    const handleConfirmUpdate = () => {
        const edited = JSON.parse(
            sessionStorage.getItem("editedEmployee") || "{}"
        );
        edited[employeeId] = formData;
        sessionStorage.setItem("editedEmployee", JSON.stringify(edited));
        setShowConfirm(false);
        router.push(`/employee-account/${employeeId}?tab=info`);
    };

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto px-6 py-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Avatar */}
                    <CustomerAvatarSection
                        avatarPreview={avatarPreview}
                        customerName={formData.fullName}
                        onUploaded={(url) => {
                            const safeUrl = typeof url === "string" ? url : "";
                            setAvatarPreview(safeUrl);
                            handleInputChange("avatar", safeUrl);
                        }}
                        isEditMode
                    />

                    {/* Basic */}
                    <EmployeeBasicInfo
                        employeeId={formData.employeeId}
                        fullName={formData.fullName}
                        phone={formData.phone}
                        email={formData.email || ""}
                        // customerStatus={formData.status}
                        onInputChange={handleInputChange}
                    />

                    {/* Address */}
                    {/*<CustomerAddressSection*/}
                    {/*    address={formData.address}*/}
                    {/*    region={formData.zaloManager}*/}
                    {/*    birthday={formData.birthday || ""}*/}
                    {/*    onInputChange={handleInputChange}*/}
                    {/*/>*/}

                    {/* Product & Consultant */}
                    <EmployeeMainInfor
                        employeeSegment={formData?.employeeSegment ?? ""}
                        bankAccount={formData?.bankAccount ?? ""}
                        department={formData?.department ?? ""}
                        advisor={formData?.advisor ?? ""}
                        employmentType={formData?.employmentType ?? ""}
                        insuranceNumber={formData?.insuranceNumber ?? ""}
                        manager={formData?.manager ?? ""}
                        position={formData?.position ?? ""}
                        salary={formData?.salary ?? 0}
                        onInputChange={handleInputChange}
                    />

                    {/* Actions */}
                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="
                inline-flex items-center justify-center h-10 px-6 py-2 rounded-md
                border border-gray-300 bg-white text-sm font-medium text-gray-700
                hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2
                transition-all duration-200 cursor-pointer
              "
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className="
                inline-flex items-center justify-center h-10 px-6 py-2 rounded-md
                bg-blue-600 text-white text-sm font-medium
                hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
                transition-all duration-200 active:scale-98 cursor-pointer
              "
                        >
                            Cập nhật khách hàng
                        </button>
                    </div>
                </form>
            </div>

            {/* Confirmation Dialog - Thuần Tailwind */}
            {showConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="w-full max-w-md bg-white rounded-lg shadow-xl">
                        <div className="flex items-center justify-between p-4 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Xác nhận cập nhật
                            </h3>
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-all cursor-pointer"
                            >
                                <FontAwesomeIcon icon={faTimes} className="h-5 w-5"/>
                            </button>
                        </div>
                        <div className="p-6">
                            <p className="text-gray-700">
                                Bạn có chắc chắn muốn cập nhật thông tin khách hàng{" "}
                                <strong>{formData.fullName}</strong>?
                            </p>
                        </div>
                        <div className="flex justify-end gap-3 p-4 border-t border-gray-200">
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="
                  px-4 py-2 border border-gray-300 rounded-md
                  text-sm font-medium text-gray-700
                  hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500
                  transition-all duration-200 cursor-pointer
                "
                            >
                                Hủy
                            </button>
                            <button
                                onClick={handleConfirmUpdate}
                                className="
                  px-4 py-2 bg-blue-600 text-white rounded-md
                  text-sm font-medium
                  hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
                  transition-all duration-200 active:scale-98 cursor-pointer
                "
                            >
                                <FontAwesomeIcon icon={faCheck} className="h-4 w-4 mr-2"/>
                                Cập nhật
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
