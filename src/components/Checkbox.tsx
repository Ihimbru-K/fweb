"use client";

import * as React from "react";
import { Minus } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** Renders the dash/indeterminate state shown in the sheet */
  indeterminate?: boolean;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, disabled, indeterminate, ...props }, ref) => {
    const innerRef = React.useRef<HTMLInputElement>(null);
    React.useImperativeHandle(ref, () => innerRef.current as HTMLInputElement);

    React.useEffect(() => {
      if (innerRef.current) {
        innerRef.current.indeterminate = Boolean(indeterminate);
      }
    }, [indeterminate]);

    if (indeterminate) {
      // Native indeterminate checkboxes don't render the dash icon
      // consistently across browsers with accent-color, so we draw
      // it ourselves and keep the input for state/form purposes.
      return (
        <span className="relative inline-flex h-5 w-5">
          <input
            type="checkbox"
            ref={innerRef}
            disabled={disabled}
            checked
            readOnly
            className="peer sr-only"
            {...props}
          />
          <span
            className={cn(
              "flex h-5 w-5 items-center justify-center rounded border border-primary-600 bg-primary-600 text-white",
              disabled && "opacity-40",
              className
            )}
          >
            <Minus className="h-3.5 w-3.5" strokeWidth={3} />
          </span>
        </span>
      );
    }

    return (
      <input
        type="checkbox"
        ref={innerRef}
        disabled={disabled}
        className={cn(
          "h-5 w-5 rounded border-gray-300 text-primary-600 accent-primary-600",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-200",
          "disabled:cursor-not-allowed disabled:opacity-40",
          className
        )}
        {...props}
      />
    );
  }
);
Checkbox.displayName = "Checkbox";

export type RadioProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size"
>;

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className, disabled, ...props }, ref) => (
    <input
      type="radio"
      ref={ref}
      disabled={disabled}
      className={cn(
        "h-5 w-5 border-gray-300 text-primary-600 accent-primary-600",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-200",
        "disabled:cursor-not-allowed disabled:opacity-40",
        className
      )}
      {...props}
    />
  )
);
Radio.displayName = "Radio";