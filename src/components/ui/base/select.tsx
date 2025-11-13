import React from "react";
import { Select } from "antd";
import type { SelectProps } from "antd";
import { DefaultOptionType } from "antd/es/select";
import { valueType } from "antd/es/statistic/utils";

type SelectBaseProps = {
  showSearch?: boolean;
  className?: string;
  style?: React.CSSProperties;
  options?: DefaultOptionType[];
  defaultValue?: SelectProps["defaultValue"];
  placeholder?: string;
  onChange?: SelectProps["onChange"];
  isSort?: boolean;
  value?: valueType | null;
  disabled?: boolean;
};

export const SelectBase = ({
  showSearch,
  className = "",
  style,
  options = [],
  defaultValue = [],
  placeholder = "",
  onChange,
  isSort = true,
  value,
  disabled,
  ...rest
}: SelectBaseProps &
  Omit<
    SelectProps,
    "options" | "defaultValue" | "placeholder" | "onChange" | "className"
  >) => {

  function sortOptions(optionA: DefaultOptionType, optionB: DefaultOptionType){
    return (optionA?.label ?? "")
      .toString()
      .toLowerCase()
      .localeCompare((optionB?.label ?? "").toString().toLowerCase());
  }

  return (
    <Select
      showSearch={showSearch}
      defaultValue={defaultValue}
      value={value}
      className={`!w-full max-h-22 h-8 overflow-y-auto px-0 focus:ring-green-500
       focus:border-green-500 focus:border-b-1 ${disabled ? "bg-gray-100" : ""} ${className}`}
      style={{ ...style, padding: 0 }}
      placeholder={placeholder}
      optionFilterProp="label"
      //   Sắp xếp các tùy chọn theo thứ tự chữ cái
      filterSort={isSort ? sortOptions : undefined}
      onChange={onChange}
      options={options}
      disabled={disabled}
      {...rest}
    />
  );
};
