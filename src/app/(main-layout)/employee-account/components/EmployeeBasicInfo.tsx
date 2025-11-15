import {FormGrid} from "@/components/layouts/Form/FormGrid";
import {InputField} from "@/components/layouts/Form/InputField";
import {Card} from "@/components/ui/_base/Card";
import {useId} from "react";

interface EmployeeBasicInfoProps {
    employeeId: string;
    fullName: string;
    phone: string;
    email: string;
    // customerStatus: string;
    onInputChange: (field: string, value: unknown) => void;
}

export function EmployeeBasicInfo({
                                      employeeId,
                                      fullName,
                                      phone,
                                      email,
                                      // customerStatus,
                                      onInputChange,
                                  }: EmployeeBasicInfoProps) {
    const ids = {
        employeeId: useId(),
        fullName: useId(),
        phone: useId(),
        email: useId(),
    };

    return (
        <Card>
            <h2 className="text-lg font-semibold text-gray-900 mb-5">
                Thông tin cơ bản
            </h2>

            <FormGrid>
                <InputField
                    id={ids.employeeId}
                    label="Mã khách hàng"
                    value={employeeId}
                    onChange={(v) => onInputChange("customerId", v)}
                    placeholder="Ví dụ: KH001"
                />

                <InputField
                    id={ids.fullName}
                    label="Tên khách hàng"
                    value={fullName}
                    onChange={(v) => onInputChange("name", v)}
                    placeholder="Nhập tên khách hàng"
                    required
                />

                <InputField
                    id={ids.phone}
                    label="Điện thoại"
                    type="tel"
                    value={phone}
                    onChange={(v) => onInputChange("phone", v)}
                    placeholder="Ví dụ: 0912345678"
                    required
                />

                <InputField
                    id={ids.email}
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(v) => onInputChange("email", v)}
                    placeholder="Ví dụ: employee@email.com"
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
