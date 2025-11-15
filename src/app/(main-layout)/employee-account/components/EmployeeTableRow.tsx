import { DefaultCell } from "@/components/layouts/Table/GenericTableRow/DefaultCell";
import { NameWithAvatarCell } from "@/components/layouts/Table/GenericTableRow/NameWithAvatarCell";
import { RowCheckbox } from "@/components/layouts/Table/GenericTableRow/RowCheckbox";
import { SerialNumberCell } from "@/components/layouts/Table/GenericTableRow/SerialNumberCell";
import {EmployeeTableRowProps} from "@/types/employment";

export function EmployeeTableRow({
                                     employee,
                                     visibleColumns,
                                     rowNumber,
                                     isSelected,
                                     onSelectRow,
                                 }: EmployeeTableRowProps) {
    const statusColor = employee.status?.[0]?.bgColor || "#E5E7EB";

    return (
        <tr
            className="border-b border-gray-200 transition-all duration-300 group"
            style={{ borderLeft: `6px solid ${statusColor}` }}
        >
            {/* Checkbox */}
            {visibleColumns.checkbox && (
                <RowCheckbox
                    rowId={employee.id}
                    checked={isSelected}
                    onChange={() => onSelectRow(employee.id)}
                />
            )}

            {/* STT */}
            {visibleColumns.stt && <SerialNumberCell number={rowNumber} />}

            {/* Các cột động */}
            {Object.entries(visibleColumns).map(([key, isVisible]) => {
                if (!isVisible || key === "checkbox" || key === "stt") return null;

                if (key === "fullName") {
                    return (
                        <NameWithAvatarCell
                            key={key}
                            name={employee.fullName || "-"}
                            // avatar={employee.avatar}
                            href={`/employee-account/${employee.id}`}
                        />
                    );
                }

                return (
                    <DefaultCell
                        key={key}
                        value={employee[key as keyof typeof employee] as string | number}
                    />
                );
            })}
        </tr>
    );
}
