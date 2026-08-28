import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind classes safely — clsx handles conditionals,
 * tailwind-merge resolves conflicts (e.g. a passed-in `className`
 * overriding a default `px-4`).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}