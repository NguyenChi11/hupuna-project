import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  id: string;
}

export function Checkbox({ checked, onChange, label, id }: CheckboxProps) {
  return (
    <label
      htmlFor={id}
      className="flex items-center gap-3 cursor-pointer group"
    >
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only peer"
      />
      <div
        className={`
          w-5 h-5 rounded border-2 flex items-center justify-center
          transition-all duration-200
          ${
            checked
              ? "bg-[#111164] border-[#111164]"
              : "bg-white border-gray-300 group-hover:border-gray-400"
          }
        `}
      >
        {checked && (
          <FontAwesomeIcon icon={faCheck} className="text-white text-xs" />
        )}
      </div>
      {label && (
        <span className="text-sm font-medium text-gray-700 flex-1 group-hover:text-gray-900">
          {label}
        </span>
      )}
    </label>
  );
}
