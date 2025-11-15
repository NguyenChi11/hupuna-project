"use client";

import {useParams, usePathname, useRouter, useSearchParams,} from "next/navigation";
import {useEffect, useState} from "react";

import {DEFAULT_EMPLOYEES} from "@/lib/employment/data_employment";
import {Employment} from "@/types/employment";
import HeaderSection from "@/app/(main-layout)/employee-account/[id]/components/SectionInfor/HeaderSection";
import ProgressBar from "@/app/(main-layout)/employee-account/[id]/components/SectionInfor/ProgressBar";
import QuickInfoCard from "@/app/(main-layout)/employee-account/[id]/components/SectionInfor/QuickInfoCard";
import {User} from "lucide-react";
import SourceInfo from "@/app/(main-layout)/employee-account/[id]/components/SectionInfor/SourceInfo";
import MainInfo from "@/app/(main-layout)/employee-account/[id]/components/SectionInfor/MainInfo";
import ActionButtons from "@/app/(main-layout)/customers/[id]/components/SectionInfo/ActionButtons";
import ExchangeTab from "@/app/(main-layout)/employee-account/[id]/components/SectionInfor/ExchangeTab";

const innerTabs = [{key: "exchange", label: "Trao đổi"}];

interface EmployeeInfoProps {
    id: string;
}

export default function EmployeeInfor({id}: EmployeeInfoProps) {
    const router = useRouter();
    const pathname = usePathname();
    const params = useParams();
    const searchParams = useSearchParams();

    const employeeId = params.id as string;

    const activeTab = searchParams.get("subtab") || "exchange";

    const changeTab = (tab: string) => {
        const p = new URLSearchParams(searchParams.toString());
        p.set("subtab", tab);
        router.push(`${pathname}?${p.toString()}`, {scroll: false});
    };

    const [employees, setEmployee] = useState<Employment[]>(DEFAULT_EMPLOYEES);

    useEffect(() => {
        const newEmploy = sessionStorage.getItem("newEmploy");
        if (newEmploy) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setEmployee((prev) => [JSON.parse(newEmploy), ...prev]);
            sessionStorage.removeItem("newEmploy");
        }

        const editedEmployments = sessionStorage.getItem("editedEmployee");
        if (editedEmployments) {
            const editedData = JSON.parse(editedEmployments);
            setEmployee((prev) => prev.map((c) => editedData[c.id] || c));
        }
    }, []);

    const employee = employees.find((c) => c.id === employeeId);

    // nếu không tìm thấy employee -> trả về giao diện thông báo
    if (!employee) {
        return (
            <div className="p-6 text-center">
                <p className="text-gray-500">Không tìm thấy khách hàng</p>
            </div>
        );
    }

    // % hoàn thiện hồ sơ (bây giờ employee chắc chắn tồn tại)
    const completionFields = [
        employee.email,
        employee.birthday,
        employee.address,
        employee.taxCode,
    ].filter(Boolean).length;
    const progress = Math.round((completionFields / 6) * 100);

    return (
        <div className="w-full mx-auto flex gap-6">
            {/* LEFT PANEL */}
            <div
                className="bg-white border border-gray-200 rounded-lg p-4 w-2/5 space-y-6 shadow-sm h-150 overflow-y-auto">
                {/* HeaderSection giờ được truyền đúng kiểu Employment */}
                <HeaderSection employee={employee}/>

                {/* Sử dụng progress đã tính */}
                <ProgressBar progress={progress}/>

                <QuickInfoCard employee={employee}/>

                <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                        {employee.status.map((st) => (
                            <span
                                key={st.key}
                                className="px-3 py-1 rounded-full text-sm font-medium"
                                style={{
                                    backgroundColor: st.bgColor,
                                    color: st.textColor
                                }}
                            >
                          {st.label}
                        </span>
                        ))}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <User className="w-4 h-4" />
                        <span>Phụ trách:</span>
                        <span className="font-medium text-gray-900">{employee.advisor}</span>
                    </div>
                </div>

                <SourceInfo employee={employee}/>
                <MainInfo employee={employee}/>
                {/*<OtherInfo employee={employee}/>*/}

                <ActionButtons onEdit={() => changeTab("exchange")}/>
            </div>

            {/* RIGHT PANEL */}
            <div className="bg-white border border-gray-200 rounded-lg w-3/5 p-4 shadow-sm">
                {/* Sub Tabs */}
                <div className="border-b border-gray-200 px-6">
                    <nav className="flex space-x-8">
                        {innerTabs.map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => changeTab(tab.key)}
                                className={`py-3 px-1 border-b-2 font-medium text-sm transition-all ${
                                    activeTab === tab.key
                                        ? "border-blue-600 text-blue-600"
                                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* CONTENT */}
                <div className="p-6 min-h-96">
                    <div className={activeTab === "exchange" ? "block" : "hidden"}>
                        <ExchangeTab employee={employee}/>
                    </div>

                    {/*<div className={activeTab === "feedback" ? "block" : "hidden"}>*/}
                    {/*    <FeedbackTab employee={employee}/>*/}
                    {/*</div>*/}

                    {/*<div className={activeTab === "transaction" ? "block" : "hidden"}>*/}
                    {/*    <TransactionTab employee={employee}/>*/}
                    {/*</div>*/}

                    {/*<div className={activeTab === "appointment" ? "block" : "hidden"}>*/}
                    {/*    <AppointmentTab employee={employee}/>*/}
                    {/*</div>*/}

                    {/*<div className={activeTab === "opportunity" ? "block" : "hidden"}>*/}
                    {/*    <OpportunityTab employee={employee}/>*/}
                    {/*</div>*/}

                    {/*<div className={activeTab === "referral" ? "block" : "hidden"}>*/}
                    {/*    <ReferralTab employee={employee}/>*/}
                    {/*</div>*/}
                </div>
            </div>
        </div>
    );
}
