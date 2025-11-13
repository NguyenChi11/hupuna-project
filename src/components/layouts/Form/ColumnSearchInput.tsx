import React from "react";
import { Input } from "@/components/ui/_base/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

interface ColumnSearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function ColumnSearchInput({ value, onChange }: ColumnSearchInputProps) {
  return (
    <Input
      type="text"
      placeholder="Tìm kiếm cột hiển thị"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      iconLeft={<FontAwesomeIcon icon={faSearch} />}
    />
  );
}
