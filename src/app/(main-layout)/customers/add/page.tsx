"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { CustomerAvatarSection } from "@/app/(main-layout)/customers/components/CustomerAvatarSection";
import { CustomerBasicInfo } from "@/app/(main-layout)/customers/components/CustomerBasicInfo";
import { CustomerAddressSection } from "@/app/(main-layout)/customers/components/CustomerAddressSection";
import { CustomerProductInfo } from "@/app/(main-layout)/customers/components/CustomerProductInfo";
import { SuccessScreen } from "@/app/(main-layout)/customers/components/SuccessScreen";

export default function AddCustomerPage() {
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string>("");

  const [formData, setFormData] = useState({
    customerId: "",
    name: "",
    phone: "",
    address: "",
    region: "",
    productGroup: "",
    requirements: "",
    consultant: "",
    zaloConsultant: "",
    advisor: "",
    email: "",
    customerStatus: "",
    birthday: "",
    avatar: "",
    status: [] as {
      key: string;
      label: string;
      bgColor: string;
      textColor: string;
    }[],
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setAvatarPreview(base64String);
        handleInputChange("avatar", base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    setShowConfirm(false);
    setShowSuccess(true);

    const newCustomer = {
      id: String(Date.now()),
      customerId: formData.customerId || `KH${String(Date.now()).slice(-6)}`,
      name: formData.name,
      phone: formData.phone,
      address: formData.address,
      region: formData.region,
      productGroup: formData.productGroup,
      requirements: formData.requirements,
      consultant: formData.consultant,
      zaloConsultant: formData.zaloConsultant,
      advisor: formData.advisor,
      avatar: formData.avatar,
      customerSegment: "Mới",
      customerStatus: formData.customerStatus,
      status: formData.status,
      email: formData.email,
      birthday: formData.birthday,
      createdDate: new Date().toISOString().split("T")[0],
      lastContact: new Date().toISOString().split("T")[0],
    };

    sessionStorage.setItem("newCustomer", JSON.stringify(newCustomer));
  };

  if (showSuccess) {
    return (
      <SuccessScreen
        customerName={formData.name}
        actionType="add"
        onBackClick={() => router.push("/customers")}
      />
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Avatar */}
          <CustomerAvatarSection
            avatarPreview={avatarPreview}
            customerName={formData.name}
            onAvatarChange={handleAvatarChange}
          />

          {/* Basic Info */}
          <CustomerBasicInfo
            customerId={formData.customerId}
            name={formData.name}
            phone={formData.phone}
            email={formData.email}
            customerStatus={formData.customerStatus}
            onInputChange={handleInputChange}
          />

          {/* Address */}
          <CustomerAddressSection
            address={formData.address}
            region={formData.region}
            birthday={formData.birthday}
            onInputChange={handleInputChange}
          />

          {/* Product Info */}
          <CustomerProductInfo
            productGroup={formData.productGroup}
            consultant={formData.consultant}
            zaloConsultant={formData.zaloConsultant}
            advisor={formData.advisor}
            requirements={formData.requirements}
            onInputChange={handleInputChange}
          />

          {/* Action Buttons */}
          <div className="flex gap-4 justify-end pt-4">
            <button
              type="button"
              onClick={() => router.back()}
              className={`
                px-5 py-2.5 rounded-lg border border-gray-300 bg-white text-sm font-medium text-gray-700
                hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#111164]/20
                active:scale-[0.98] transition-all duration-200
              `}
            >
              Hủy
            </button>

            <button
              type="submit"
              className={`
                px-5 py-2.5 rounded-lg bg-blue-600 text-sm font-medium text-white
                hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50
                active:scale-[0.98] transition-all duration-200
              `}
            >
              Thêm khách hàng
            </button>
          </div>
        </form>
      </div>

      {/* Confirmation Dialog */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowConfirm(false)}
          />
          <div className="relative w-full max-w-md bg-white rounded-xl shadow-2xl p-6 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Xác nhận thêm khách hàng
              </h3>
              <button
                onClick={() => setShowConfirm(false)}
                className="rounded-lg p-1.5 hover:bg-gray-100 transition-colors"
              >
                <FontAwesomeIcon
                  icon={faTimes}
                  className="h-4 w-4 text-gray-500"
                />
              </button>
            </div>

            <p className="text-sm text-gray-600 mb-6">
              Bạn có chắc chắn muốn thêm khách hàng{" "}
              <strong>{formData.name}</strong>?
            </p>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 rounded-lg bg-blue-600 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
