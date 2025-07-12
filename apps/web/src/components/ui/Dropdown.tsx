// 📄 Fayl: src/components/ui/Dropdown.tsx
// 🎯 Maqsad: Currency va Language dropdownlarini generik, 100% WCAG (ARIA) validatsiyadan o'tadigan, keyboard accessible holatga keltirish
// ♿ Accessibility: role="listbox", role="option", Escape bilan yopish, Tab bilan kirish, tashqariga bosilganda yopish, `useId` bilan id conflict oldini olish, ↑↓ navigatsiya

"use client";

import React, { useEffect, useRef, useState, useId } from "react";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";

interface DropdownProps {
  label?: string;
  options: string[];
  value: string;
  onChange: (val: string) => void;
  isOpen: boolean;
  setOpen: () => void;
  side?: "left" | "right";
}

const Dropdown: React.FC<DropdownProps> = ({
  label = "Dropdown",
  options,
  value,
  onChange,
  isOpen,
  setOpen,
  side = "right",
}) => {
  const listRef = useRef<HTMLUListElement>(null);
  const id = useId();
  const [focusedIndex, setFocusedIndex] = useState(-1);

  // 🔐 Escape tugmasi bosilganda yopish
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen();
    };
    if (isOpen) window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, setOpen]);

  // 🖱 Tashqariga bosilganda yopish
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (listRef.current && !listRef.current.contains(e.target as Node)) {
        setOpen();
      }
    };
    if (isOpen) window.addEventListener("mousedown", handleClick);
    return () => window.removeEventListener("mousedown", handleClick);
  }, [isOpen]);

  // ⌨ Arrow navigatsiya
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setFocusedIndex((prev) => (prev + 1) % options.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setFocusedIndex((prev) => (prev - 1 + options.length) % options.length);
      } else if (e.key === "Enter" && focusedIndex >= 0) {
        onChange(options[focusedIndex]);
        setOpen();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, focusedIndex]);

  return (
    <div className="relative" role="combobox" aria-expanded={isOpen} aria-haspopup="listbox" aria-label={label}>
      <button
        onClick={setOpen}
        className="flex items-center gap-1 hover:text-primary text-sm text-[#222]"
        aria-controls={id}
      >
        {value} <ChevronDown className="w-4 h-4 ml-1 mt-[1px]" />
      </button>

      {isOpen && (
        <ul
          ref={listRef}
          id={id}
          role="listbox"
          tabIndex={-1}
          className={clsx(
            "absolute top-full mt-0 origin-top w-28 bg-white border rounded shadow z-50 focus:outline-none",
            side === "right" ? "right-0" : "left-0"
          )}
        >
          {options.map((opt, idx) => (
            <li
              key={opt}
              role="option"
              aria-selected={opt === value}
              tabIndex={0}
              className={clsx(
                "px-4 py-2 text-left text-sm hover:bg-gray-100 cursor-pointer",
                focusedIndex === idx && "bg-gray-100"
              )}
              onClick={() => {
                onChange(opt);
                setOpen();
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onChange(opt);
                  setOpen();
                }
              }}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
