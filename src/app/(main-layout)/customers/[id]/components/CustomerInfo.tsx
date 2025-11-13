"use client";

import { useParams, useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faMapMarkerAlt,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Customer } from "@/types/customers";
import { DEFAULT_CUSTOMERS } from "@/lib/data_customers";
import Image from "next/image";

interface CustomerInfoProps {
  id: string;
}

export default function CustomerInfo({ id }: CustomerInfoProps) {
  const params = useParams();
  const router = useRouter();
  const [allCustomers, setAllCustomers] =
    useState<Customer[]>(DEFAULT_CUSTOMERS);

  useEffect(() => {
    const newCustomer = sessionStorage.getItem("newCustomer");
    if (newCustomer) {
      try {
        const parsedCustomer = JSON.parse(newCustomer);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setAllCustomers((prev) => [parsedCustomer, ...prev]);
        sessionStorage.removeItem("newCustomer");
      } catch (error) {
        console.error("Failed to parse new customer:", error);
      }
    }

    const editedCustomers = sessionStorage.getItem("editedCustomers");
    if (editedCustomers) {
      const editedData = JSON.parse(editedCustomers);
      setAllCustomers((prev) =>
        prev.map((customer) => editedData[customer.id] || customer)
      );
    }
  }, []);

  const customerId = params.id as string;
  const customer = allCustomers.find((c) => c.id === customerId);

  if (!customer) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="text-center py-12">
          <p className="text-gray-500">Không tìm thấy thông tin khách hàng</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        {/* Customer Card */}
        <div className="bg-white border border-gray-200 rounded-lg p-8 space-y-6 shadow-sm">
          <div className="flex items-start gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gray-200 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                {customer.avatar ? (
                  <Image
                    src={customer.avatar}
                    alt={customer.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-3xl font-bold text-gray-600">
                    {customer.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
            </div>

            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {customer.name}
              </h1>
              <div className="flex flex-wrap gap-2">
                <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-medium">
                  {customer.customerSegment}
                </span>
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                  {customer.productGroup}
                </span>
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium">
                  {customer.region}
                </span>
              </div>
            </div>
          </div>

          {/* Contact & Business Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-gray-200 pt-6">
            {/* Contact */}
            <div className="space-y-5">
              <h2 className="text-lg font-semibold text-gray-900">
                Thông tin liên hệ
              </h2>

              <div className="flex items-start gap-3">
                <FontAwesomeIcon
                  icon={faPhone}
                  className="h-5 w-5 text-indigo-600 mt-0.5"
                />
                <div>
                  <p className="text-sm text-gray-500">Điện thoại</p>
                  <p className="text-gray-900 font-medium">{customer.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="h-5 w-5 text-indigo-600 mt-0.5"
                />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-gray-900 font-medium">
                    {customer.email || "-"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  className="h-5 w-5 text-indigo-600 mt-0.5"
                />
                <div>
                  <p className="text-sm text-gray-500">Địa chỉ</p>
                  <p className="text-gray-900 font-medium">
                    {customer.address}
                  </p>
                </div>
              </div>
            </div>

            {/* Business Info */}
            <div className="space-y-5">
              <h2 className="text-lg font-semibold text-gray-900">
                Thông tin kinh doanh
              </h2>

              <div>
                <p className="text-sm text-gray-500 mb-1">Nhân viên tư vấn</p>
                <p className="text-gray-900 font-medium">
                  {customer.consultant}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">
                  Yêu cầu của khách hàng
                </p>
                <p className="text-gray-900 font-medium">
                  {customer.requirements}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">Nhóm sản phẩm</p>
                <p className="text-gray-900 font-medium">
                  {customer.productGroup}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">Tình trạng</p>
                <p className="text-gray-900 font-medium">
                  {customer.customerStatus}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 border-t border-gray-200 pt-6">
            <button
              onClick={() => router.push(`/customers/${customerId}/edit`)}
              className="
                inline-flex items-center justify-center h-10 px-6 py-2 rounded-md
                bg-blue-600 text-white text-sm font-medium
                hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
                transition-all duration-200 active:scale-98 cursor-pointer
              "
            >
              Chỉnh sửa
            </button>
            <button
              className="
                inline-flex items-center justify-center h-10 px-6 py-2 rounded-md
                border border-gray-300 bg-white text-sm font-medium text-gray-700
                hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2
                transition-all duration-200 cursor-pointer
              "
            >
              Xóa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
