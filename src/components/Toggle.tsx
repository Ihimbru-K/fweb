import * as React from "react";
import { cn } from "@/lib/utils/cn";

export interface ToggleProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {}

export const Toggle = React.forwardRef<HTMLInputElement, ToggleProps>(
  ({ className, disabled, ...props }, ref) => {
    return (
      <label
        className={cn(
          "inline-flex cursor-pointer items-center",
          disabled && "cursor-not-allowed opacity-40"
        )}
      >
        <input
          type="checkbox"
          role="switch"
          ref={ref}
          disabled={disabled}
          className="peer sr-only"
          {...props}
        />
        <span
          className={cn(
            "relative h-6 w-11 rounded-full bg-gray-300 transition-colors",
            "peer-checked:bg-primary-600",
            "peer-focus-visible:ring-2 peer-focus-visible:ring-primary-200 peer-focus-visible:ring-offset-2",
            "after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow-sm after:transition-transform",
            "peer-checked:after:translate-x-5",
            className
          )}
        />
      </label>
    );
  }
);
Toggle.displayName = "Toggle";