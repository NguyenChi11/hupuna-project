"use client";

import React from "react";

interface BaseInputNumberProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
}

export const InputNumberBase: React.FC<BaseInputNumberProps> = ({
  value,
  onChange,
  min = Number.MIN_SAFE_INTEGER,
  max = Number.MAX_SAFE_INTEGER,
  step = 1,
  className = "",
}) => {
  const handleDecrease = () => {
    const newValue = Math.max(min, value - step);
    onChange(newValue);
  };

  const handleIncrease = () => {
    const newValue = Math.min(max, value + step);
    onChange(newValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = Number(e.target.value);
    if (!isNaN(inputValue)) {
      const newValue = Math.max(min, Math.min(max, inputValue));
      onChange(newValue);
    }
  };

  return (
    <div
      className={`relative group w-[120px] flex flex-row justify-center items-end gap-2 ${className}`}
    >
      <div className="flex-basis-1/4 justify-center items-center w-6 h-6">
        <button
          type="button"
          className="hidden group-hover:flex bg-gray-100 p-1 w-6 h-6 items-center justify-center rounded-full"
          onClick={handleDecrease}
          disabled={value <= min}
        >
          −
        </button>
      </div>
      <div className="flex-basis-2/4 justify-center items-center">
        <input
          type="number"
          className="number-input no-spinner w-full py-1 border-b border-gray-300 text-center appearance-none focus:outline-none focus:border-b-2 focus:border-blue-500"
          value={value}
          onChange={handleInputChange}
        />
      </div>
      <div className="flex-basis-1/4 justify-center items-center w-6 h-6">
        <button
          type="button"
          className="hidden group-hover:flex bg-gray-100 p-1 w-6 h-6 items-center justify-center rounded-full"
          onClick={handleIncrease}
          disabled={value >= max}
        >
          +
        </button>
      </div>
    </div>
  );
};
