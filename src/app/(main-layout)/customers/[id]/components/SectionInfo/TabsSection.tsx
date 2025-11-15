import { useState } from "react";
import { Customer } from "@/types/customers";
import { formatDistanceToNow } from "date-fns";

const tabs = ["Liên hệ lần cuối", "Tổng số tương tác", "Giá trị đơn hàng"];

export default function TabsSection({ customer }: { customer: Customer }) {
  const [activeTab, setActiveTab] = useState(0);

  const lastContact = customer.lastContact
    ? formatDistanceToNow(new Date(customer.lastContact), { addSuffix: true })
    : "Chưa có";

  return (
    <div className="border-t border-gray-200 pt-4">
      <div className="flex gap-6 text-sm font-medium">
        {tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            className={`pb-2 border-b-2 transition-all ${
              activeTab === i
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mt-3 text-sm text-gray-700">
        {activeTab === 0 && (
          <p>
            Liên hệ lần cuối: <strong>{lastContact}</strong>
          </p>
        )}
        {activeTab === 1 && (
          <p>
            Tổng số tương tác: <strong>24 lần</strong>
          </p>
        )}
        {activeTab === 2 && (
          <p>
            Giá trị đơn hàng: <strong>850.000.000 VNĐ</strong>
          </p>
        )}
      </div>
    </div>
  );
}
