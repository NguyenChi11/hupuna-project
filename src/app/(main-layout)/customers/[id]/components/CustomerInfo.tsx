"use client";

import {
  useSearchParams,
  useRouter,
  usePathname,
  useParams,
} from "next/navigation";
import { useEffect, useState } from "react";
import { Customer } from "@/types/customers";
import { DEFAULT_CUSTOMERS } from "@/lib/data_customers";

import HeaderSection from "./SectionInfo/HeaderSection";
import ProgressBar from "./SectionInfo/ProgressBar";
import QuickInfoCard from "./SectionInfo/QuickInfoCard";
import StatusBadge from "./SectionInfo/StatusBadge";
import ResponsiblePerson from "./SectionInfo/ResponsiblePerson";
import TabsSection from "./SectionInfo/TabsSection";
import SourceInfo from "./SectionInfo/SourceInfo";
import MainInfo from "./SectionInfo/MainInfo";
import OtherInfo from "./SectionInfo/OtherInfo";
import ActionButtons from "./SectionInfo/ActionButtons";

import ExchangeTab from "./SectionInfo/ExchangeTab";
import FeedbackTab from "./SectionInfo/FeedbackTab";
import TransactionTab from "./SectionInfo/TransactionTab";
import AppointmentTab from "./SectionInfo/AppointmentTab";
import OpportunityTab from "./SectionInfo/OpportunityTab";
import ReferralTab from "./SectionInfo/ReferralTab";

const innerTabs = [
  { key: "exchange", label: "Trao đổi" },
  { key: "feedback", label: "Khách hàng phản hồi" },
  { key: "transaction", label: "Giao dịch" },
  { key: "appointment", label: "Lịch hẹn" },
  { key: "opportunity", label: "Cơ hội" },
  { key: "referral", label: "Giới thiệu" },
];

export default function CustomerInfo() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const searchParams = useSearchParams();

  const customerId = params.id as string;

  const activeTab = searchParams.get("subtab") || "exchange";

  const changeTab = (tab: string) => {
    const p = new URLSearchParams(searchParams.toString());
    p.set("subtab", tab);
    router.push(`${pathname}?${p.toString()}`, { scroll: false });
  };

  const [customers, setCustomers] = useState<Customer[]>(DEFAULT_CUSTOMERS);

  useEffect(() => {
    const newCustomer = sessionStorage.getItem("newCustomer");
    if (newCustomer) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCustomers((prev) => [JSON.parse(newCustomer), ...prev]);
      sessionStorage.removeItem("newCustomer");
    }

    const editedCustomers = sessionStorage.getItem("editedCustomers");
    if (editedCustomers) {
      const editedData = JSON.parse(editedCustomers);
      setCustomers((prev) => prev.map((c) => editedData[c.id] || c));
    }
  }, []);

  const customer = customers.find((c) => c.id === customerId);

  if (!customer) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500">Không tìm thấy khách hàng</p>
      </div>
    );
  }

  // % hoàn thiện hồ sơ
  const completionFields = [
    customer.email,
    customer.birthday,
    customer.address,
    customer.website,
    customer.taxCode,
    customer.lastPurchase,
  ].filter(Boolean).length;
  const progress = Math.round((completionFields / 6) * 100);

  return (
    <div className="w-full mx-auto flex gap-6">
      {/* LEFT PANEL */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 w-2/5 space-y-6 shadow-sm h-150 overflow-y-auto">
        <HeaderSection customer={customer} />
        <ProgressBar progress={progress} />
        <QuickInfoCard customer={customer} />

        <div className="flex items-center justify-between">
          <StatusBadge status={customer.customerStatus} />
          <ResponsiblePerson consultant={customer.consultant} />
        </div>

        <TabsSection customer={customer} />
        <SourceInfo customer={customer} />
        <MainInfo customer={customer} />
        <OtherInfo customer={customer} />

        <ActionButtons onEdit={() => changeTab("exchange")} />
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
            <ExchangeTab customer={customer} />
          </div>

          <div className={activeTab === "feedback" ? "block" : "hidden"}>
            <FeedbackTab customer={customer} />
          </div>

          <div className={activeTab === "transaction" ? "block" : "hidden"}>
            <TransactionTab customer={customer} />
          </div>

          <div className={activeTab === "appointment" ? "block" : "hidden"}>
            <AppointmentTab customer={customer} />
          </div>

          <div className={activeTab === "opportunity" ? "block" : "hidden"}>
            <OpportunityTab customer={customer} />
          </div>

          <div className={activeTab === "referral" ? "block" : "hidden"}>
            <ReferralTab customer={customer} />
          </div>
        </div>
      </div>
    </div>
  );
}
