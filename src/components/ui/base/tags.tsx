import React, { useEffect, useRef, useState } from "react";
import type { InputRef } from "antd";
import { Input, Tag, theme } from "antd";
import { Option } from "@/app/data/interface/options";
import { ButtonBase } from "./button";

interface TagsBaseProps {
  className?: string;
  type?: "number" | "text" | "email" | "password";
  textTags?: string;
  tag: string[];
  inputStyle?: string;
  btnStyle?: string;
  contentStyle?: string;
  min?: number;
  max?: number;
  onChange?: (tags: string[]) => void;
  /** Nếu bật = true, sẽ dùng input có select */
  useSelect?: boolean;
  options?: Option[];
}

export default function TagsBase({
  className,
  type = "text",
  tag = [],
  textTags = "+ Thêm tag",
  inputStyle,
  btnStyle,
  contentStyle,
  min,
  max,
  onChange,
  useSelect = false,
  options = [],
}: TagsBaseProps) {
  const { token } = theme.useToken();
  const [tags, setTags] = useState<string[]>(tag);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [openSelect, setOpenSelect] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<InputRef>(null);
  const colors = [
    "magenta",
    "red",
    "volcano",
    "orange",
    "gold",
    "lime",
    "green",
    "cyan",
    "blue",
    "geekblue",
    "purple",
  ];

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  useEffect(() => {
    setTags(tag);
  }, [tag]);

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpenSelect(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getColorForTag = (tag: string, index: number) => {
    return colors[index % colors.length]; // Lặp lại màu nếu tag nhiều
  };
  const handleClose = (removedTag: string) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    setTags(newTags);
    if (onChange) {
      onChange(newTags);
    }
  };

  const showInput = () => {
    setInputVisible(true);
    if (useSelect) {
      setOpenSelect(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      setTags([...tags, inputValue]);
      if (onChange) {
        onChange([...tags, inputValue]);
      }
    }
    setInputVisible(false);
    setInputValue("");
  };

  const handleSelect = (opt: Option) => {
    if (tags.indexOf(String(opt.value)) === -1) {
      const updated = [...tags, String(opt.value)];
      setTags(updated);
      onChange?.(updated);
    }
    setOpenSelect(false);
    setInputVisible(false);
  };

  const forMap = (tag: string, index: number) => (
    <span key={tag} style={{ display: "inline-block", marginBottom: 8 }}>
      <Tag
        color={getColorForTag(tag, index)}
        closable
        onClose={(e) => {
          e.preventDefault();
          handleClose(tag);
        }}
        className={contentStyle}
      >
        {tag}
      </Tag>
    </span>
  );

  const tagChild = tags.map(forMap);

  const tagPlusStyle: React.CSSProperties = {
    background: token.colorBgContainer,
    borderStyle: "none",
  };

  return (
    <div className={`py-2 flex relative ${className}`} ref={containerRef}>
      <div style={{ fontSize: 18 }}>{tagChild}</div>
      <div>
        <div className="flex bg-white border border-gray-200 rounded">
        {inputVisible ? (
          <Input
            ref={inputRef}
            type={type}
            size="middle"
            style={{ width: 100 }}
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputConfirm}
            onPressEnter={handleInputConfirm}
            className={`focus:!ring-green-500 focus:!border-green-500 ${inputStyle}`}
            min={type === "number" ? min : undefined}
            max={type === "number" ? max : undefined}
          />
        ) : (
          <Tag onClick={showInput} style={tagPlusStyle} className={`!flex justify-center items-center cursor-pointer ${btnStyle}`}>
            {textTags}
          </Tag>
        )}

        {useSelect && (
          <ButtonBase
            type="button"
            onClick={() => setOpenSelect(!openSelect)}
            className={`!p-2 max-w-28 h-8`}
          >
            {/* Icon mũi tên */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-3 w-3 transition-transform ${openSelect ? "rotate-180" : "rotate-0"
                }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </ButtonBase>
        )}
        </div>
      </div>
      {/* Dropdown chọn nhanh */}
      {useSelect && openSelect && options.length > 0 && (
        <ul className="absolute right-0 top-10 z-10 w-35 max-h-40 overflow-auto rounded-md border border-gray-200 bg-white shadow">
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
