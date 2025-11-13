"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faCommentDots,
  faBell,
  faRocket,
  faPlus,
  faXmark,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { bricolageGrotesque } from "@/fonts";

interface CustomerHeaderProps {
  totalCount?: number;
  onSearch?: (keyword: string) => void;
}

export function CustomerHeader({
  totalCount = 0,
  onSearch,
}: CustomerHeaderProps) {
  const formattedCount = totalCount.toLocaleString("vi-VN");
  const [keyword, setKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState(keyword);
  const [activeSheet, setActiveSheet] = useState<
    "message" | "notification" | "getfly" | null
  >(null);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedKeyword(keyword.trim());
    }, 300);
    return () => clearTimeout(timer);
  }, [keyword]);

  useEffect(() => {
    onSearch?.(debouncedKeyword);
  }, [debouncedKeyword, onSearch]);

  const closeSheet = () => setActiveSheet(null);

  return (
    <>
      <div className="flex flex-col gap-6 pb-6 border-b border-gray-200 sm:flex-row sm:items-center sm:justify-between">
        {/* Title + Count */}
        <div className="flex flex-col gap-3 rounded-2xl bg-amber-50/60 p-3 shadow-sm ring-1 ring-amber-200/50">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#111164] to-[#2a2a8b] text-white">
              <FontAwesomeIcon icon={faUsers} className="h-5 w-5" />
            </div>
            <h1
              className={`text-2xl font-bold tracking-tight text-[#111164] ${bricolageGrotesque.className}`}
            >
              Danh sách khách hàng
            </h1>
          </div>

          <div className="flex items-center gap-1.5 text-sm text-gray-600">
            <span className={`${bricolageGrotesque.className}`}>
              Tổng cộng:
            </span>
            <span className="inline-flex h-6 items-center rounded-full bg-gray-100 px-2.5 font-medium text-gray-700">
              {formattedCount}
            </span>
            <span>khách hàng</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 justify-end">
            {/* Message */}
            <button
              onClick={() => setActiveSheet("message")}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-300 bg-white hover:bg-gray-50 transition-colors"
              title="Tin nhắn"
            >
              <FontAwesomeIcon
                icon={faCommentDots}
                className="text-[#111164] text-lg"
              />
            </button>

            {/* Notification */}
            <button
              onClick={() => setActiveSheet("notification")}
              className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-gray-300 bg-white hover:bg-gray-50 transition-colors"
              title="Thông báo"
            >
              <FontAwesomeIcon
                icon={faBell}
                className="text-[#111164] text-lg"
              />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500" />
            </button>

            {/* Getfly */}
            <button
              onClick={() => setActiveSheet("getfly")}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-300 bg-white hover:bg-gray-50 transition-colors"
              title="Getfly CRM"
            >
              <FontAwesomeIcon
                icon={faRocket}
                className="text-[#111164] text-lg"
              />
            </button>
          </div>

          {/* Add Customer */}
          <button
            onClick={() =>
              (window.location.href = "/customers/add?callback=true")
            }
            className={`
              flex h-11 items-center justify-center gap-2.5 rounded-2xl px-6
              bg-[#111164] text-white font-medium text-base shadow-sm
              hover:bg-[#2b2cd8] active:scale-[0.96] transition-all duration-200
              ${bricolageGrotesque.className}
            `}
          >
            <FontAwesomeIcon icon={faPlus} className="h-5 w-5" />
            <span className="shrink-0">Thêm khách hàng</span>
          </button>
        </div>
      </div>

      {/* ====================== SEARCH ====================== */}
      <div className="mt-4">
        <div className="relative">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
          />
          <input
            type="text"
            placeholder="Tìm khách hàng..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className={`
              w-full sm:w-64 pl-10 pr-4 py-2.5 rounded-xl border border-gray-300
              bg-white text-sm text-gray-900 placeholder:text-gray-400
              focus:outline-none focus:ring-2 focus:ring-[#111164]/20 focus:border-[#111164]
              ${bricolageGrotesque.className} transition-all duration-200
            `}
          />
        </div>
      </div>

      {/* ====================== SHEETS (SIDEBARS) ====================== */}
      {/* Message Sheet */}
      {activeSheet === "message" && (
        <div className="fixed inset-0 z-50 flex justify-end m-0">
          <div className="absolute inset-0 bg-black/50" onClick={closeSheet} />
          <div className="relative w-full max-w-md bg-white shadow-2xl animate-in slide-in-from-right">
            <div className="flex items-center justify-between border-b border-gray-200 p-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Tin nhắn khách hàng
              </h2>
              <button
                onClick={closeSheet}
                className="rounded-lg p-2 hover:bg-gray-100 transition-colors"
              >
                <FontAwesomeIcon
                  icon={faXmark}
                  className="h-4 w-4 text-gray-500"
                />
              </button>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-500">Chưa có tin nhắn nào.</p>
            </div>
          </div>
        </div>
      )}

      {/* Notification Sheet */}
      {activeSheet === "notification" && (
        <div className="fixed inset-0 z-50 flex justify-end m-0">
          <div className="absolute inset-0 bg-black/50" onClick={closeSheet} />
          <div className="relative w-full max-w-md bg-white shadow-2xl animate-in slide-in-from-right">
            <div className="flex items-center justify-between border-b border-gray-200 p-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Thông báo hệ thống
              </h2>
              <button
                onClick={closeSheet}
                className="rounded-lg p-2 hover:bg-gray-100 transition-colors"
              >
                <FontAwesomeIcon
                  icon={faXmark}
                  className="h-4 w-4 text-gray-500"
                />
              </button>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-500">
                Cập nhật mới nhất, thông báo và nhắc nhở công việc.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Getfly Sheet */}
      {activeSheet === "getfly" && (
        <div className="fixed inset-0 z-50 flex justify-end m-0">
          <div className="absolute inset-0 bg-black/50" onClick={closeSheet} />
          <div className="relative w-full max-w-md bg-white shadow-2xl animate-in slide-in-from-right">
            <div className="flex items-center justify-between border-b border-gray-200 p-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Tích hợp Getfly CRM
              </h2>
              <button
                onClick={closeSheet}
                className="rounded-lg p-2 hover:bg-gray-100 transition-colors"
              >
                <FontAwesomeIcon
                  icon={faXmark}
                  className="h-4 w-4 text-gray-500"
                />
              </button>
            </div>
            <div className="p-6">
              <p className="mb-4 text-sm text-gray-600">
                Kết nối dữ liệu khách hàng với hệ thống Getfly CRM.
              </p>
              <button
                onClick={() => window.open("https://crm.getfly.vn", "_blank")}
                className="w-full rounded-xl bg-[#111164] px-4 py-2.5 text-white hover:bg-[#2b2cd8] transition-colors font-medium"
              >
                Truy cập Getfly CRM
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
