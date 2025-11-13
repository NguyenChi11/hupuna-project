import React, { useState } from "react";
import { DatePicker } from "antd";
import type { DatePickerProps, TimeRangePickerProps } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import isLeapYear from "dayjs/plugin/isLeapYear";
import quarterOfYear from "dayjs/plugin/quarterOfYear";

dayjs.extend(weekday);
dayjs.extend(isLeapYear);
dayjs.extend(quarterOfYear);

const { RangePicker } = DatePicker;

export const DateRangePicker = ({
  value = [dayjs("2000-01-01"), dayjs()],
  showTime = false,
  onRangeChanges,
  className,
  allowClear = true,
  disabled = false,
}: {
  value?: [Dayjs, Dayjs];
  showTime?: boolean;
  onRangeChanges?: (dates: [Dayjs, Dayjs]) => void;
  className?: string;
  allowClear?: boolean;
  disabled?: boolean;
}) => {
  // Hàm hỗ trợ dùng dayjs hoàn toàn
  const today = dayjs();
  const yesterday = dayjs().subtract(1, "day");
  const startOfWeek = dayjs().startOf("week");
  const endOfWeek = dayjs().endOf("week");
  const lastWeekStart = dayjs().subtract(1, "week").startOf("week");
  const lastWeekEnd = dayjs().subtract(1, "week").endOf("week");
  const startOfMonth = dayjs().startOf("month");
  const endOfMonth = dayjs().endOf("month");
  const lastMonthStart = dayjs().subtract(1, "month").startOf("month");
  const lastMonthEnd = dayjs().subtract(1, "month").endOf("month");
  const startOfQuarter = dayjs().startOf("quarter");
  const endOfQuarter = dayjs().endOf("quarter");
  const lastQuarterStart = dayjs().subtract(1, "quarter").startOf("quarter");
  const lastQuarterEnd = dayjs().subtract(1, "quarter").endOf("quarter");
  const startOfYear = dayjs().startOf("year");
  const endOfYear = dayjs().endOf("year");
  const lastYearStart = dayjs().subtract(1, "year").startOf("year");
  const lastYearEnd = dayjs().subtract(1, "year").endOf("year");

  const dateFormat = showTime ? "DD/MM/YYYY HH:mm" : "DD/MM/YYYY";
  const customWeekStartEndFormat: DatePickerProps["format"] = (value) => {
    if (!value) return "";
    if (dayjs(value).format(dateFormat) === "01/01/2000") return "Từ trước";
    if (dayjs(value).isSame(today, "day")) return "Hôm nay";
    return dayjs(value).format(dateFormat);
  };

  const [values, setValue] = useState<[Dayjs, Dayjs]>(value);

  // Preset ranges
  const rangePresets: TimeRangePickerProps["presets"] = [
    { label: "Toàn thời gian", value: [dayjs("2000-01-01"), dayjs()] },
    { label: "Hôm nay", value: [today.startOf("day"), today.endOf("day")] },
    {
      label: "Hôm qua",
      value: [yesterday.startOf("day"), yesterday.endOf("day")],
    },

    { label: "Tuần này", value: [startOfWeek, endOfWeek] },
    { label: "Tuần trước", value: [lastWeekStart, lastWeekEnd] },
    {
      label: "7 ngày qua",
      value: [today.subtract(6, "day").startOf("day"), today.endOf("day")],
    },

    { label: "Tháng này", value: [startOfMonth, endOfMonth] },
    { label: "Tháng trước", value: [lastMonthStart, lastMonthEnd] },
    // Nếu muốn thêm âm lịch cần thư viện khác

    {
      label: "30 ngày qua",
      value: [today.subtract(29, "day").startOf("day"), today.endOf("day")],
    },

    { label: "Quý này", value: [startOfQuarter, endOfQuarter] },
    { label: "Quý trước", value: [lastQuarterStart, lastQuarterEnd] },

    { label: "Năm nay", value: [startOfYear, endOfYear] },
    { label: "Năm trước", value: [lastYearStart, lastYearEnd] },
  ];

  const onRangeChange = (dates: null | (Dayjs | null)[]) => {
    if (dates && dates[0] && dates[1]) {
      //Quy chuẩn chính xác theo thời gian
      const start = dates[0].startOf("day"); // 00:00:00
      const end = dates[1].endOf("day");     // 23:59:59.999
      setValue([start, end]);
      if (onRangeChanges) {
        onRangeChanges([start, end]);
      }
    } else {
      // Khi người dùng clear
      setValue(rangePresets[0].value as [Dayjs, Dayjs]); //
      onRangeChanges?.(rangePresets[0].value as [Dayjs, Dayjs]); // Gọi về giá trị mặc định "Toàn thời gian"
    }
  };
  return (
    <RangePicker
      presets={rangePresets}
      onChange={onRangeChange}
      placement={"bottomRight"}
      format={customWeekStartEndFormat}
      placeholder={["Bắt đầu", "Kết thúc"]}
      value={values}
      showTime={showTime}
      className={`!w-full ${className}`}
      allowClear={allowClear}
      disabled={disabled}
    />
  );
};
