"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { InputSize } from "./Input";

/**
 * This is a lightweight version of the phone field in the sheet —
 * it renders the "[flag] +62 ⌄ | number" layout and gives you an
 * `onCountryChange` hook, but the country list/flags are up to you
 * to supply. If you need real country search, dial-code lookup, and
 * validation, it's worth pulling in `react-phone-number-input`
 * instead of hand-rolling that logic — happy to wire that in if
 * you'd rather go that route.
 */

export interface Country {
  code: string; // e.g. "ID"
  dialCode: string; // e.g. "+62"
  flag: React.ReactNode; // pass an <img>, emoji, or icon
}

export interface PhoneInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  hint?: string;
  error?: string;
  size?: InputSize;
  country?: Country;
  onCountryClick?: () => void;
  rightIcon?: React.ReactNode;
}

const sizeStyles: Record<InputSize, string> = {
  lg: "h-12 text-body-md px-4",
  md: "h-10 text-body-sm px-3.5",
  sm: "h-8 text-body-xs px-3",
};

export const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  (
    {
      className,
      label,
      hint,
      error,
      size = "md",
      disabled,
      country,
      onCountryClick,
      rightIcon,
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;
    const hasError = Boolean(error);

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="mb-1.5 block text-body-sm font-medium text-text-black"
          >
            {label}
          </label>
        )}

        <div
          className={cn(
            "flex items-center gap-2 rounded-lg border bg-white transition-colors",
            sizeStyles[size],
            hasError
              ? "border-error-600 focus-within:ring-2 focus-within:ring-error-100"
              : "border-gray-300 focus-within:border-primary-600 focus-within:ring-2 focus-within:ring-primary-100",
            disabled && "border-gray-200 bg-gray-100 opacity-60"
          )}
        >
          <button
            type="button"
            onClick={onCountryClick}
            disabled={disabled}
            className="flex shrink-0 items-center gap-1 border-r border-gray-200 pr-2 text-text-black disabled:cursor-not-allowed"
          >
            <span className="flex h-4 w-5 items-center justify-center overflow-hidden rounded-sm">
              {country?.flag}
            </span>
            <span>{country?.dialCode}</span>
            <ChevronDown className="h-3.5 w-3.5 text-gray-500" />
          </button>

          <input
            id={inputId}
            ref={ref}
            type="tel"
            disabled={disabled}
            aria-invalid={hasError}
            className={cn(
              "w-full bg-transparent text-text-black outline-none placeholder:text-text-placeholder disabled:cursor-not-allowed",
              className
            )}
            {...props}
          />
          {rightIcon && (
            <span className="flex shrink-0 items-center text-gray-500">
              {rightIcon}
            </span>
          )}
        </div>

        {(hint || error) && (
          <p
            className={cn(
              "mt-1.5 text-body-xs",
              hasError ? "text-error-600" : "text-text-subtitle"
            )}
          >
            {error || hint}
          </p>
        )}
      </div>
    );
  }
);
PhoneInput.displayName = "PhoneInput";