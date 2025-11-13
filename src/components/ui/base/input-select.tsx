"use client";

import { useState, useEffect, useRef } from "react";
import { InputBase } from "./input";
import { ButtonBase } from "./button";

type Option = {
  label: string;
  value: string | number;
};

type BaseInputSelectProps = {
  value: string | number | undefined;
  onChange?: (value: string | number) => void;
  options: Option[];
  placeholder?: string;
  className?: string;
  type?: string;
  min?: number;
  max?: number;
  classNameContent?: string;
  classNameBtn?: string;
  classNameInput?: string;
  disabled?: boolean;
};

export default function BaseInputSelect({
  value,
  onChange,
  options,
  placeholder,
  className = "",
  type = "number",
  classNameContent,
  classNameBtn,
  classNameInput,
  min,
  max,
  disabled = false,
}: BaseInputSelectProps) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState<string | number | undefined>("");
  const [isEditing, setIsEditing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync từ prop -> input chỉ khi không đang edit
  useEffect(() => {
    if (isEditing) return;
    const found = options.find((opt) => opt.value === value);
    if (found) {
      setInputValue(found.label);
    } else {
      setInputValue(value ?? "");
    }
  }, [value, options, isEditing]);

  // click ra ngoài thì đóng dropdown
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (opt: Option) => {
    setInputValue(opt.value);
    setOpen(false);
    onChange?.(opt.value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val: string | number = e.target.value;
    if (type === "number" && val !== "") {
      val = Number(val);
    }
    setInputValue(val);
    onChange?.(val);
  };

  const handleFocus = () => {
    setIsEditing(true);
    // tuỳ bạn muốn mở dropdown khi focus:
    // setOpen(true);
  };

  const handleBlur = () => {
    // khi blur -> kết thúc edit, gửi giá trị final dạng number nếu có thể
    setIsEditing(false);

    const raw = inputValue ?? "";
    const str = String(raw).trim();
    if (str === "") {
      onChange?.("");
      setInputValue("");
      return;
    }
    // Nếu type number -> parse và clamp min/max
    if (type === "number") {
      // str có thể chứa "," (decimal comma) hoặc "." (normalized). chúng ta chuyển comma->dot
      const normalized = str.replace(/,/g, ".");
      const parsed = Number(normalized);
      if (!isNaN(parsed)) {
        let final = parsed;
        if (min !== undefined && final < min) final = min;
        if (max !== undefined && final > max) final = max;
        onChange?.(final);
        // setInputValue final sẽ được format bởi useEffect (vì now isEditing=false and value prop likely update)
        setInputValue(final);
        return;
      }
    }

    // fallback: gửi string
    onChange?.(str);
    setInputValue(str);
  };

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {/* Input + icon */}
      <div className="flex w-full items-center justify-between bg-white rounded
        border border-gray-300">
        <InputBase
          type={type}
          value={inputValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          className={`!border-none ${classNameInput}`}
          min={min}
          max={max}
          disabled={disabled}
        />
        <ButtonBase
          type="button"
          onClick={() => setOpen(!open)}
          className={`!p-1 max-w-28 h-8 border-l !rounded-none border-gray-100 ${classNameBtn}`}
          disabled={disabled}
        >
          {/* Icon mũi tên */}
          {/* <span className="text-gray-500 text-[10px]">Chọn nhanh</span> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-3 w-3 transition-transform ${open ? "rotate-180" : "rotate-0"
              }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </ButtonBase>
      </div>

      {/* Dropdown */}
      {open && options.length > 0 && (
        <ul className={`absolute right-0 z-10 mt-1 max-h-40 w-40 overflow-auto rounded-md 
          border border-gray-200 bg-white shadow-lg transition-all duration-150 ease-in-out
        ${classNameContent}`}>
          {options.map((opt) => (
            <li
              key={opt.value}
              onClick={() => handleSelect(opt)}
              className="cursor-pointer px-3 py-2 hover:bg-gray-100"
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
