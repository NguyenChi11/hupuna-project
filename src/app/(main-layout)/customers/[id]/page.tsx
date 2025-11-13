"use client";

import { use } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

import CustomerInfo from "@/app/(main-layout)/customers/[id]/components/CustomerInfo";
import CustomerEdit from "@/app/(main-layout)/customers/[id]/components/CustomerEdit";

const tabs = [
  { key: "info", label: "Thông tin khách hàng" },
  { key: "edit", label: "Sửa thông tin" },
  { key: "orders", label: "Đơn hàng" },
  { key: "quotes", label: "Báo giá" },
];

export default function CustomerDetailPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(props.params); // ⬅️ quan trọng nhất

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeTab = searchParams.get("tab") || "info";

  const changeTab = (tab: string) => {
    const p = new URLSearchParams(searchParams.toString());
    p.set("tab", tab);
    router.push(`${pathname}?${p.toString()}`);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Title */}
      <h1 className="text-2xl font-semibold text-[#111164]">
        Khách hàng #{id}
      </h1>

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
          <CustomerInfo id={id} />
        </div>

        <div className={activeTab === "edit" ? "block" : "hidden"}>
          <CustomerEdit id={id} />
        </div>

        <div className={activeTab === "orders" ? "block" : "hidden"}>
          <p className="text-gray-500">Đang phát triển...</p>
        </div>

        <div className={activeTab === "quotes" ? "block" : "hidden"}>
          <p className="text-gray-500">Đang phát triển...</p>
        </div>
      </div>
    </div>
  );
}
