"use client";

import { useId } from "react";
import { Card } from "@/components/ui/_base/Card";
import { FormGrid } from "@/components/layouts/Form/FormGrid";
import { ProductGroupSelect } from "@/components/layouts/Form/ProductGroupSelect";
import { ConsultantSelect } from "@/components/layouts/Form/ConsultantSelect";
import { ZaloInput } from "@/components/layouts/Form/ZaloInput";
import { AdvisorInput } from "@/components/layouts/Form/AdvisorInput";
import { RequirementsInput } from "@/components/layouts/Form/RequirementsInput";

interface CustomerProductInfoProps {
  productGroup: string;
  consultant: string;
  zaloConsultant: string;
  advisor: string;
  requirements: string;
  onInputChange: (field: string, value: string) => void;
}

export function CustomerProductInfo({
  productGroup,
  consultant,
  zaloConsultant,
  advisor,
  requirements,
  onInputChange,
}: CustomerProductInfoProps) {
  const ids = {
    productGroup: useId(),
    consultant: useId(),
    zaloConsultant: useId(),
    advisor: useId(),
    requirements: useId(),
  };

  return (
    <Card>
      <h2 className="text-lg font-semibold text-gray-900 mb-5">
        Thông tin sản phẩm và tư vấn
      </h2>

      <FormGrid>
        <ProductGroupSelect
          id={ids.productGroup}
          value={productGroup}
          onChange={(v) => onInputChange("productGroup", v)}
        />

        <ConsultantSelect
          id={ids.consultant}
          value={consultant}
          onChange={(v) => onInputChange("consultant", v)}
        />

        <ZaloInput
          id={ids.zaloConsultant}
          value={zaloConsultant}
          onChange={(v) => onInputChange("zaloConsultant", v)}
        />

        <AdvisorInput
          id={ids.advisor}
          value={advisor}
          onChange={(v) => onInputChange("advisor", v)}
        />
      </FormGrid>

      <RequirementsInput
        id={ids.requirements}
        value={requirements}
        onChange={(v) => onInputChange("requirements", v)}
      />
    </Card>
  );
}
