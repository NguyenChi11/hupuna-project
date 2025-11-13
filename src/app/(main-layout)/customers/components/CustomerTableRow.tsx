"use client";

import { DefaultCell } from "@/components/layouts/Table/GenericTableRow/DefaultCell";
import { NameWithAvatarCell } from "@/components/layouts/Table/GenericTableRow/NameWithAvatarCell";
import { RowCheckbox } from "@/components/layouts/Table/GenericTableRow/RowCheckbox";
import { SerialNumberCell } from "@/components/layouts/Table/GenericTableRow/SerialNumberCell";
import { CustomerTableRowProps } from "@/types/customers";

export function CustomerTableRow({
  customer,
  visibleColumns,
  rowNumber,
  isSelected,
  onSelectRow,
}: CustomerTableRowProps) {
  const statusColor = customer.status?.[0]?.bgColor || "#E5E7EB";

  return (
    <tr
      className="border-b border-gray-200 transition-all duration-300 group"
      style={{ borderLeft: `6px solid ${statusColor}` }}
    >
      {/* Checkbox */}
      {visibleColumns.checkbox && (
        <RowCheckbox
          checked={isSelected}
          onChange={() => onSelectRow(customer.id)}
        />
      )}

      {/* STT */}
      {visibleColumns.stt && <SerialNumberCell number={rowNumber} />}

      {/* Các cột động */}
      {Object.entries(visibleColumns).map(([key, isVisible]) => {
        if (!isVisible || key === "checkbox" || key === "stt") return null;

        if (key === "name") {
          return (
            <NameWithAvatarCell
              key={key}
              name={customer.name || "-"}
              avatar={customer.avatar}
              href={`/customers/${customer.id}`}
            />
          );
        }

        return (
          <DefaultCell
            key={key}
            value={customer[key as keyof typeof customer] as string | number}
          />
        );
      })}
    </tr>
  );
}
