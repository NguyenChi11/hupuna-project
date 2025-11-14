// src/lib/employment/columns.ts
import dayjs from "dayjs";
import { Employment } from "@/types/employment";
import { Column } from "@/components/ui/base/table";
import Link from "next/link";
import Image from "next/image";

export const ALL_COLUMNS: Record<string, Column<Employment> & { filterable?: boolean }> = {
    employeeId: {
        title: "Mã NV",
        dataIndex: "employeeId",
        filterType: "text",
        sorter: (a, b) => a.employeeId.localeCompare(b.employeeId),
        width: 140,
        filterable: true,
    },
    fullName: {
        title: "Tên nhân viên",
        dataIndex: "fullName",
        filterType: "text",
        filterable: true,
        sorter: (a, b) => a.fullName.localeCompare(b.fullName),
        width: 180,
        render: (val, record) => {
            const name = String(val ?? "-");
            const href = `/employees/${record.employeeId}`;

            return (
                <div>

                    <Link href={href} className="text-blue-600 hover:underline flex items-center gap-2">
                         <img src="https://i.pinimg.com/736x/61/62/2e/61622ec8899cffaa687a8342a84ea525.jpg"
                                alt=""
                                height={40}
                                width={40}
                              className="rounded-full"
                         />  {name}
                    </Link>
                </div>

            );
        },
    },
    department: {
        title: "Phòng ban",
        dataIndex: "department",
        filterType: "select",
        filterable: true,
        sorter: (a, b) => (a.department || "").localeCompare(b.department || ""),
        width: 160,
    },
    email: {
        title: "Email",
        dataIndex: "email",
        filterType: "text",
        filterable: true,
        sorter: (a, b) => (a.email || "").localeCompare(b.email || ""),
        width: 180,
    },
    position: {
        title: "Chức vụ",
        dataIndex: "position",
        filterType: "select",
        filterable: true,
        sorter: (a, b) => (a.position || "").localeCompare(b.position || ""),
        width: 150,
    },
    employeeSegment: {
        title: "Phân loại",
        dataIndex: "employeeSegment",
        filterType: "text",
        filterable: true,
        sorter: (a, b) =>
            (a.employeeSegment || "").localeCompare(b.employeeSegment || ""),
        width: 150,
    },
    employeeStatus: {
        title: "Tình trạng",
        dataIndex: "employeeStatus",
        filterType: "text",
        filterable: true,
        onFilter: (value, record) => {
            const v = String(value || "").toLowerCase();
            return (record.employeeStatus || "").toLowerCase().includes(v);
        },
        sorter: (a, b) =>
            (a.employeeStatus || "").localeCompare(b.employeeStatus || ""),
        width: 150,
    },
    employmentType: {
        title: "Loại hợp đồng",
        dataIndex: "employmentType",
        filterType: "text",
        filterable: true,
        sorter: (a, b) =>
            (a.employmentType || "").localeCompare(b.employmentType || ""),
        width: 160,
    },
    hireDate: {
        title: "Ngày vào làm",
        dataIndex: "hireDate",
        filterType: "date",
        filterable: true,
        onFilter: (value, record) =>
            dayjs(record.hireDate).isSame(dayjs(value as string), "day"),
        sorter: (a, b) => dayjs(a.hireDate).valueOf() - dayjs(b.hireDate).valueOf(),
        render: (v) => (v ? dayjs(v as string).format("DD/MM/YYYY") : "-"),
        width: 150,
    },
    lastContact: {
        title: "Liên hệ gần nhất",
        dataIndex: "lastContact",
        filterType: "date",
        filterable: true,
        onFilter: (value, record) =>
            dayjs(record.lastContact).isSame(dayjs(value as string), "day"),
        sorter: (a, b) =>
            dayjs(a.lastContact).valueOf() - dayjs(b.lastContact).valueOf(),
        render: (v) => (v ? dayjs(v as string).format("DD/MM/YYYY HH:mm") : "-"),
        width: 180,
    },
};

export const getEmploymentColumns = (
    visibleColumns: (keyof typeof ALL_COLUMNS)[]
): Column<Employment>[] => {
    return visibleColumns
        .filter((key) => ALL_COLUMNS[key])
        .map((key) => ALL_COLUMNS[key]);
};