"use client";

import { useId } from "react";
import { Card } from "@/components/ui/_base/Card";
import { FormGrid } from "@/components/layouts/Form/FormGrid";
import { AddressInput } from "@/components/layouts/Form/AddressInput";
import { RegionSelect } from "@/components/layouts/Form/RegionSelect";
import { BirthdayInput } from "@/components/layouts/Form/BirthdayInput";
interface CustomerAddressSectionProps {
  address: string;
  region: string;
  birthday: string;
  onInputChange: (field: string, value: string) => void;
}

export function CustomerAddressSection({
  address,
  region,
  birthday,
  onInputChange,
}: CustomerAddressSectionProps) {
  const ids = {
    address: useId(),
    region: useId(),
    birthday: useId(),
  };

  return (
    <Card>
      <h2 className="text-lg font-semibold text-gray-900 mb-5">Địa chỉ</h2>

      <FormGrid>
        <AddressInput
          id={ids.address}
          value={address}
          onChange={(v) => onInputChange("address", v)}
        />

        <RegionSelect
          id={ids.region}
          value={region}
          onChange={(v) => onInputChange("region", v)}
        />

        <BirthdayInput
          id={ids.birthday}
          value={birthday}
          onChange={(v) => onInputChange("birthday", v)}
        />
      </FormGrid>
    </Card>
  );
}
