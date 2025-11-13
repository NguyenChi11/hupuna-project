import React, { useRef } from "react";

type InputProps = {
  value?: string;
  className?: string;
  placeholder?: string;
  rows?: number;
  cols?: number;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  disabled?: boolean;
};

export const InputAreaBase = ({
  value = "",
  className = "",
  placeholder,
  rows = 4,
  cols = 50,
  onChange,
  disabled = false,
  ...rest
}: InputProps) => {

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const handleInput = () => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto"; // reset trước
      el.style.height = `${el.scrollHeight}px`; // set theo nội dung
    }
  };

  return (
    <textarea
      ref={textareaRef}
      name="input-area"
      placeholder={placeholder}
      className={`py-2 w-full min-h-12 overflow-hidden ${className} ${disabled ? "bg-gray-50 text-gray-400 cursor-not-allowed" : ""}`}
      rows={rows}
      cols={cols}
      value={value}
      onChange={onChange}
      onInput={handleInput}
      disabled={disabled}
      {...rest}
    />
  );
};
