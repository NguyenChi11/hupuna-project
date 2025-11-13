"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

interface SuccessScreenProps {
  customerName: string;
  actionType: "add" | "edit";
  onBackClick: () => void;
}

export function SuccessScreen({
  customerName,
  actionType,
  onBackClick,
}: SuccessScreenProps) {
  const messages = {
    add: {
      title: "Thêm khách hàng thành công",
      description: `Khách hàng "${customerName}" đã được thêm vào danh sách`,
    },
    edit: {
      title: "Cập nhật thành công",
      description: `Thông tin khách hàng "${customerName}" đã được cập nhật`,
    },
  };

  const message = messages[actionType];

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
        {/* Check Icon */}
        <div className="mx-auto w-16 h-16 text-green-500">
          <FontAwesomeIcon icon={faCheckCircle} className="w-full h-full" />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900">{message.title}</h2>

        {/* Description */}
        <p className="text-sm text-gray-600">{message.description}</p>

        {/* Button */}
        <button
          onClick={onBackClick}
          className={`
            w-full h-11 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white
            hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50
            active:scale-[0.98] transition-all duration-200
          `}
        >
          Quay lại danh sách khách hàng
        </button>
      </div>
    </main>
  );
}
