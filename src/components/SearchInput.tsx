import { useState, useRef } from "react";
import type { ChangeEvent } from "react";

interface SearchInputProps {
  onChange: (value: string) => void;
  delay?: number;
  placeholder?: string;
  className?: string;
}

export default function SearchInput({
  onChange,
  delay = 300,
  placeholder = "Search...",
  className = "",
}: SearchInputProps) {
  const [inputValue, setInputValue] = useState("");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    // debounce the input
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      onChange(newValue);
    }, delay);
  };

  const handleClear = () => {
    setInputValue("");
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    onChange("");
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeholder}
        className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
      />
      {inputValue && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      )}
    </div>
  );
}
