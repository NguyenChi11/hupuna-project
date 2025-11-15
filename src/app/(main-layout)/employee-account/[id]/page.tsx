"use client";

import { use } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

import { Button } from "@/components/ui/_base/Button";
import EmployeeInfor from "@/app/(main-layout)/employee-account/[id]/components/EmployeeInfor";
import EmployeeEdit from "@/app/(main-layout)/employee-account/[id]/components/EmployeeEdit";

const tabs = [
    { key: "info", label: "Thông tin Nhân viên" },
    { key: "edit", label: "Sửa thông tin" },
];

export default function EmployDetailPage(props: {
    params: Promise<{ id: string }>;
}) {
    const { id } = use(props.params);

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const activeTab = searchParams.get("tab") || "info";

    const changeTab = (tab: string) => {
        const p = new URLSearchParams(searchParams.toString());
        p.set("tab", tab);
        router.push(`${pathname}?${p.toString()}`);
    };

    // Hàm quay lại danh sách
    const goBackToEmployments = () => {
        router.push("/employee-account");
    };

    return (
        <div className="space-y-6">
            {/* Back Button + Title */}
            <div className="flex items-start gap-4 flex-col">
                <Button
                    onClick={goBackToEmployments}
                    className="
            flex items-center gap-2 px-3 py-1.5 rounded-md
            text-sm font-medium text-gray-600
            hover:bg-gray-100 hover:text-gray-900
            transition-all duration-200
            focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2
          "
                >
                    {/* Mũi tên trái bằng SVG */}
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                    <span>Quay lại</span>
                </Button>

                {/* Title */}
                <h1 className="text-2xl font-semibold text-[#111164]">
                    Nhân viên #{id}
                </h1>
            </div>

            {/* Tabs */}
            <div className="flex gap-3 border-b border-gray-200">
                {tabs.map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => changeTab(tab.key)}
                        className={`
                          px-4 py-2 rounded-t-lg text-sm font-medium transition-all
                          ${
                            activeTab === tab.key
                                ? "bg-[#111164] text-white"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }
                            `}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab content */}
            <div className="mt-4">
                <div className={activeTab === "info" ? "block" : "hidden"}>
                    <EmployeeInfor id={id} />
                </div>

                <div className={activeTab === "edit" ? "block" : "hidden"}>
                    <EmployeeEdit id={id} />
                </div>
            </div>
        </div>
    );
}
