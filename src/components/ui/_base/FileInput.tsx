import { InputHTMLAttributes, ReactNode } from "react";

interface FileInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: ReactNode;
  helperText?: string;
}

export function FileInput({ label, helperText, id, ...props }: FileInputProps) {
  return (
    <div>
      {label && (
        <label htmlFor={id} className="cursor-pointer block">
          {label}
        </label>
      )}
      <input id={id} type="file" className="sr-only" {...props} />
      {helperText && <p className="mt-2 text-xs text-gray-500">{helperText}</p>}
    </div>
  );
}
