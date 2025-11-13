// src/components/customers/add/useCustomerForm.ts
import { useState } from "react";

export interface CustomerFormData {
  customerId: string;
  name: string;
  phone: string;
  address: string;
  region: string;
  productGroup: string;
  requirements: string;
  consultant: string;
  zaloConsultant: string;
  advisor: string;
  email: string;
  customerStatus: string;
  birthday: string;
  avatar: string;
  status: {
    key: string;
    label: string;
    bgColor: string;
    textColor: string;
  }[];
}

export function useCustomerForm() {
  const [formData, setFormData] = useState<CustomerFormData>({
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
    status: [],
  });

  const [avatarPreview, setAvatarPreview] = useState("");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInputChange = (field: keyof CustomerFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setAvatarPreview(base64);
        handleInputChange("avatar", base64);
      };
      reader.readAsDataURL(file);
    }
  };

  return {
    formData,
    avatarPreview,
    handleInputChange,
    handleAvatarChange,
    reset: () => setFormData({} as CustomerFormData),
  };
}
