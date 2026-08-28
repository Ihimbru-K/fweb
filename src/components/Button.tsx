import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";

export type ButtonColor =
  | "dark" // solid black row
  | "neutral" // solid gray row
  | "primary" // solid yellow/gold row (brand CTA)
  | "info" // solid blue row
  | "success" // solid green row
  | "error" // solid red row
  | "purple"; // solid purple row

export type ButtonVariant =
  | "solid" // filled color rows
  | "outline" // white/bordered row
  | "ghost" // plain-text rows (no bg, no border)
  | "link"; // underlined link rows at the bottom of the sheet

const buttonBase = cva(
  "inline-flex items-center justify-center gap-2 rounded-lg font-medium whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40",
  {
    variants: {
      size: {
        lg: "h-12 px-5 text-body-md",
        md: "h-10 px-4 text-body-sm",
        sm: "h-8 px-3 text-body-xs",
      },
    },
    defaultVariants: { size: "md" },
  }
);

type Size = NonNullable<VariantProps<typeof buttonBase>["size"]>;

// Square dimensions for icon-only buttons (gear/doc/refresh row in the sheet)
const iconOnlySize: Record<Size, string> = {
  lg: "h-12 w-12 px-0",
  md: "h-10 w-10 px-0",
  sm: "h-8 w-8 px-0",
};

/**
 * Written as literal class strings (not built with template
 * interpolation) on purpose — Tailwind's JIT scanner can only find
 * classes that appear literally in source, so a dynamic
 * `bg-${color}-600` would silently fail to generate CSS.
 */
const colorStyles: Record<ButtonColor, Record<ButtonVariant, string>> = {
  dark: {
    solid:
      "bg-gray-950 text-white hover:bg-gray-900 active:bg-tertiary-black-800",
    outline:
      "border border-gray-950 text-gray-950 bg-white hover:bg-gray-100",
    ghost: "text-gray-950 bg-transparent hover:bg-gray-100",
    link: "h-auto p-0 text-gray-950 underline-offset-4 hover:underline",
  },
  neutral: {
    solid: "bg-gray-600 text-white hover:bg-gray-700 active:bg-gray-800",
    outline: "border border-gray-300 text-gray-700 bg-white hover:bg-gray-50",
    ghost: "text-gray-700 bg-transparent hover:bg-gray-100",
    link: "h-auto p-0 text-gray-700 underline-offset-4 hover:underline",
  },
  primary: {
    solid:
      "bg-primary-400 text-white hover:bg-primary-500 active:bg-primary-600",
    outline:
      "border border-primary-600 text-primary-700 bg-white hover:bg-primary-50",
    ghost: "text-primary-700 bg-transparent hover:bg-primary-50",
    link: "h-auto p-0 text-primary-700 underline-offset-4 hover:underline",
  },
  info: {
    solid: "bg-info-600 text-white hover:bg-info-700 active:bg-info-800",
    outline: "border border-info-600 text-info-700 bg-white hover:bg-info-50",
    ghost: "text-info-700 bg-transparent hover:bg-info-50",
    link: "h-auto p-0 text-info-600 underline-offset-4 hover:underline",
  },
  success: {
    solid:
      "bg-success-600 text-white hover:bg-success-700 active:bg-success-800",
    outline:
      "border border-success-600 text-success-700 bg-white hover:bg-success-50",
    ghost: "text-success-700 bg-transparent hover:bg-success-50",
    link: "h-auto p-0 text-success-700 underline-offset-4 hover:underline",
  },
  error: {
    solid: "bg-error-600 text-white hover:bg-error-700 active:bg-error-800",
    outline: "border border-error-600 text-error-700 bg-white hover:bg-error-50",
    ghost: "text-error-700 bg-transparent hover:bg-error-50",
    link: "h-auto p-0 text-error-700 underline-offset-4 hover:underline",
  },
  purple: {
    solid:
      "bg-tertiary-purple-600 text-white hover:bg-tertiary-purple-700 active:bg-tertiary-purple-800",
    outline:
      "border border-tertiary-purple-600 text-tertiary-purple-700 bg-white hover:bg-tertiary-purple-50",
    ghost: "text-tertiary-purple-700 bg-transparent hover:bg-tertiary-purple-50",
    link: "h-auto p-0 text-tertiary-purple-700 underline-offset-4 hover:underline",
  },
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: ButtonColor;
  variant?: ButtonVariant;
  size?: Size;
  /** Square button showing only leftIcon — matches the icon-grid row in the sheet */
  iconOnly?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      color = "neutral",
      variant = "solid",
      size = "md",
      iconOnly = false,
      leftIcon,
      rightIcon,
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        className={cn(
          buttonBase({ size }),
          colorStyles[color][variant],
          iconOnly && iconOnlySize[size],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <span
            aria-hidden
            className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
          />
        ) : (
          leftIcon
        )}
        {!iconOnly && children}
        {!isLoading && !iconOnly && rightIcon}
      </button>
    );
  }
);
Button.displayName = "Button";