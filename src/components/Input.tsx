"use client";

import * as React from "react";
import { cn } from "@/lib/utils/cn";

export type InputSize = "lg" | "md" | "sm";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  /** Gray helper text shown below the field (from the sheet's "hint text") */
  hint?: string;
  /** When set, overrides hint and switches the field to the error state */
  error?: string;
  /** e.g. a lucide <Search /> icon */
  leftIcon?: React.ReactNode;
  /** e.g. a lucide <Eye />/<EyeOff /> password toggle */
  rightIcon?: React.ReactNode;
  size?: InputSize;
}

const sizeStyles: Record<InputSize, string> = {
  lg: "h-12 text-body-md px-4",
  md: "h-10 text-body-sm px-3.5",
  sm: "h-8 text-body-xs px-3",
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      hint,
      error,
      leftIcon,
      rightIcon,
      size = "md",
      disabled,
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
          {leftIcon && (
            <span className="flex shrink-0 items-center text-gray-500">
              {leftIcon}
            </span>
          )}
          <input
            id={inputId}
            ref={ref}
            disabled={disabled}
            aria-invalid={hasError}
            aria-describedby={hint || error ? `${inputId}-hint` : undefined}
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
            id={`${inputId}-hint`}
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
Input.displayName = "Input";