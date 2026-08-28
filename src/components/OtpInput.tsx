"use client";

import * as React from "react";
import { cn } from "@/lib/utils/cn";

export interface OtpInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
}

export const OtpInput = React.forwardRef<HTMLDivElement, OtpInputProps>(
  (
    {
      length = 6,
      value,
      onChange,
      error = false,
      disabled = false,
      autoFocus = true,
    },
    ref
  ) => {
    const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

    React.useEffect(() => {
      if (autoFocus && inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
    }, [autoFocus]);

    const handleChange = (index: number, digit: string) => {
      // Only allow single digit
      if (digit.length > 1) {
        digit = digit.charAt(digit.length - 1);
      }

      // Only allow numbers
      if (!/^\d*$/.test(digit)) {
        return;
      }

      const newValue = value.split("");
      
      // Pad array with empty strings if needed
      while (newValue.length < length) {
        newValue.push("");
      }

      newValue[index] = digit;
      const result = newValue.join("").slice(0, length);
      onChange(result);

      // Auto-focus next input
      if (digit && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace" && !value[index] && index > 0) {
        // Move to previous input on backspace if current is empty
        const newValue = value.split("");
        while (newValue.length < length) {
          newValue.push("");
        }
        newValue[index - 1] = "";
        onChange(newValue.join("").slice(0, length));
        inputRefs.current[index - 1]?.focus();
      }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
      onChange(pastedData);
      
      // Focus the next empty input or last input
      const nextEmptyIndex = pastedData.length;
      if (nextEmptyIndex < length) {
        inputRefs.current[nextEmptyIndex]?.focus();
      } else {
        inputRefs.current[length - 1]?.focus();
      }
    };

    return (
      <div ref={ref} className="flex gap-3">
        {Array.from({ length }, (_, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={value[index] ?? ""}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            disabled={disabled}
            className={cn(
              "h-14 w-14 rounded-lg border bg-white text-center text-body-lg font-medium outline-none transition-colors",
              error
                ? "border-error-600 focus-within:ring-2 focus-within:ring-error-100"
                : "border-gray-300 focus-within:border-primary-600 focus-within:ring-2 focus-within:ring-primary-100",
              disabled && "border-gray-200 bg-gray-100 opacity-60"
            )}
            aria-label={`Digit ${index + 1}`}
          />
        ))}
      </div>
    );
  }
);

OtpInput.displayName = "OtpInput";
