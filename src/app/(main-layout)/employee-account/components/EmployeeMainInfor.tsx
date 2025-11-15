"use client";

import {useId} from "react";
import {Card} from "@/components/ui/_base/Card";
import {FormGrid} from "@/components/layouts/Form/FormGrid";
import {ProductGroupSelect} from "@/components/layouts/Form/ProductGroupSelect";
import {ConsultantSelect} from "@/components/layouts/Form/ConsultantSelect";
import {ZaloInput} from "@/components/layouts/Form/ZaloInput";
import {AdvisorInput} from "@/components/layouts/Form/AdvisorInput";
import {RequirementsInput} from "@/components/layouts/Form/RequirementsInput";
import {InputField} from "@/components/layouts/Form/InputField";

interface EmployeeMainInfoProps {
    position: string;
    department: string;
    manager: string;
    advisor: string;
    employeeSegment: string
    salary: number;
    bankAccount: string;
    insuranceNumber: string;
    employmentType: string;
    onInputChange: (field: string, value: string) => void;
}

export function EmployeeMainInfor({
                                      position,
                                      department,
                                      manager,
                                      advisor,
                                      employeeSegment,
                                      salary,
                                      bankAccount,
                                      insuranceNumber,
                                      employmentType,
                                      onInputChange,
                                  }: EmployeeMainInfoProps) {
    const ids = {
        position : useId(),
        department : useId(),
        manager : useId(),
        advisor : useId(),
        employeeSegment : useId(),
        salary : useId(),
        bankAccount : useId(),
        insuranceNumber : useId(),
        employmentType : useId(),
    };

    return (
        <Card>
            <h2 className="text-lg font-semibold text-gray-900 mb-5">
                Thông tin chính
            </h2>

            <FormGrid>
                <InputField
                    id={ids.position}
                    label="Vị trí"
                    value={position}
                    onChange={(v) => onInputChange("position", v)}
                    placeholder="Ví dụ: KH001"
                />

                <InputField
                    id={ids.department}
                    label="Phòng ban"
                    value={department}
                    onChange={(v) => onInputChange("department", v)}
                    placeholder="Nhập tên Phòng ban"
                    required
                />

                <InputField
                    id={ids.manager}
                    label="Quản lý"
                    value={manager}
                    onChange={(v) => onInputChange("manager", v)}
                    placeholder="Ví dụ: 0912345678"
                    required
                />

                <InputField
                    id={ids.advisor}
                    label="Người hướng dẫn"
                    value={advisor}
                    onChange={(v) => onInputChange("advisor", v)}
                    placeholder="Ví dụ: employee@email.com"
                />

                <InputField
                    id={ids.employeeSegment}
                    label="Phân khúc nhân viên"
                    value={employeeSegment}
                    onChange={(v) => onInputChange("employeeSegment", v)}
                    placeholder="Ví dụ: employee@email.com"
                />

                <InputField
                    id={ids.salary}
                    label="Email"
                    value={salary.toString()}
                    onChange={(v) => onInputChange("salary", v)}
                />

                <InputField
                    id={ids.bankAccount}
                    label="Email"
                    value={bankAccount}
                    onChange={(v) => onInputChange("bankAccount", v)}
                />

                <InputField
                    id={ids.insuranceNumber}
                    label="Email"
                    value={insuranceNumber}
                    onChange={(v) => onInputChange("insuranceNumber", v)}
                />
                <InputField
                    id={ids.employmentType}
                    label="Email"
                    value={employmentType}
                    onChange={(v) => onInputChange("employmentType", v)}
                />



                {/*<div className="md:col-span-2">*/}
                {/*    <StatusSelect*/}
                {/*        value={customerStatus} // luôn là key: "missing_info"*/}
                {/*        onChange={(selectedKey) => {*/}
                {/*            const selected = CUSTOMER_STATUS.find(*/}
                {/*                (s) => s.key === selectedKey*/}
                {/*            );*/}
                {/*            if (selected) {*/}
                {/*                onInputChange("customerStatus", selected.key);*/}
                {/*                onInputChange("status", [selected]);*/}
                {/*            }*/}
                {/*        }}*/}
                {/*    />*/}
                {/*</div>*/}
            </FormGrid>
        </Card>
    );
}
