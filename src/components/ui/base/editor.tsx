"use client";

import { htmlToText } from "@/utils/converts";
import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

type EditorChange = { html: string; text: string };

type BaseEditorProps = {
  value?: string;
  onChange?: (val: EditorChange) => void;
  placeholder?: string;
  disabled?: boolean; // ✅ thêm prop disabled
};

export default function TextEditor({
  value,
  onChange,
  placeholder,
  disabled = false,
}: BaseEditorProps) {
  const [editorValue, setEditorValue] = useState(value);

  useEffect(() => {
    setEditorValue(value);
  }, [value]);

  const handleChange = (content: string) => {
    if (disabled) return; // ✅ không cho thay đổi khi disable
    setEditorValue(content);
    onChange?.({ html: content, text: htmlToText(content) });
  };

  return (
    <div
      className={`rounded-md w-full bg-white ${
        disabled ? "opacity-80 cursor-not-allowed" : ""
      }`}
    >
      <ReactQuill
        theme="snow"
        value={editorValue || ""}
        onChange={handleChange}
        readOnly={disabled} // ✅ khóa nhập
        placeholder={placeholder || "Nhập mô tả..."}
        modules={
          disabled
            ? { toolbar: false } // ✅ ẩn thanh công cụ khi disable
            : {
                toolbar: [
                  [{ font: [] }, { size: [] }],
                  ["bold", "italic", "underline", "strike"],
                  [{ script: "sub" }, { script: "super" }],
                  ["blockquote", "code-block"],
                  [{ color: [] }, { background: [] }],
                  [{ align: [] }],
                  [
                    { list: "ordered" },
                    { list: "bullet" },
                    { indent: "-1" },
                    { indent: "+1" },
                  ],
                  ["link", "image", "video"],
                  ["clean"],
                ],
              }
        }
      />
    </div>
  );
}
