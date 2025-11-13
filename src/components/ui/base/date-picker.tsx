"use client";
import React, { useEffect, useState } from "react";
import { DatePicker } from "antd";
import type { DatePickerProps } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import isLeapYear from "dayjs/plugin/isLeapYear";
import quarterOfYear from "dayjs/plugin/quarterOfYear";

dayjs.extend(weekday);
dayjs.extend(isLeapYear);
dayjs.extend(quarterOfYear);

interface DateSinglePickerProps {
    values?: Date | Dayjs | string | null;
    showTime?: boolean;
    onDateChange?: (date: Dayjs | null) => void;
    placeholder?: string;
    className?: string;
    allowClear?: boolean;
    disabled?: boolean;
    maxDate?: Dayjs;
    minDate?: Dayjs;
}

export const DateSinglePicker = ({
    values = "",
    showTime = false,
    onDateChange,
    placeholder = "Chọn ngày",
    className,
    allowClear = true,
    disabled = false,
    maxDate,
    minDate,
}: DateSinglePickerProps) => {
    const today = dayjs();
    const yesterday = dayjs().subtract(1, "day");
    const startOfWeek = dayjs().startOf("week");
    const startOfMonth = dayjs().startOf("month");
    const startOfQuarter = dayjs().startOf("quarter");
    const startOfYear = dayjs().startOf("year");

    const dateFormat = showTime ? "DD/MM/YYYY HH:mm" : "DD/MM/YYYY";

    const customFormat: DatePickerProps["format"] = (value) => {
        if (!value) return "";
        // if (dayjs(value).isSame(today, "day")) return "Hôm nay";
        // if (dayjs(value).isSame(yesterday, "day")) return "Hôm qua";
        return dayjs(value).format(dateFormat);
    };

    const [value, setValue] = useState<Date | Dayjs | string | null>(values);

    const presets = [
        { label: "Hôm nay", value: today },
        { label: "Hôm qua", value: yesterday },
        { label: "Đầu tuần", value: startOfWeek },
        { label: "Đầu tháng", value: startOfMonth },
        { label: "Đầu quý", value: startOfQuarter },
        { label: "Đầu năm", value: startOfYear },
    ];

    const onChange = (date: Dayjs | null) => {
        if (date) {
            setValue(date);
            if (onDateChange) onDateChange(date);
        } else {
            setValue(null);
            onDateChange?.(null);
        }
    };

    useEffect(() => {
        setValue(values ?? null);
    }, [values]);

    return (
        <DatePicker
            presets={presets}
            placement="bottomRight"
            value={
                value === "" || value === null
                    ? null
                    : typeof value === "string"
                        ? dayjs(value)
                        : value instanceof Date
                            ? dayjs(value)
                            : value
            }
            onChange={onChange}
            showTime={showTime}
            format={customFormat}
            placeholder={placeholder}
            className={`!w-full ${className}`}
            allowClear={allowClear}
            disabled={disabled}
            maxDate={maxDate}
            minDate={minDate}
        />
    );
};

export default DateSinglePicker;
