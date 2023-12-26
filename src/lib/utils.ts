import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * @param name name to get the initials from
 * @returns initials of the name
 * @example getInitials("John Doe") // => "JD"
 */
export function getInitials(name?: string | null) {
  const names = (name ?? "").trim().split(" ");

  return names.reduce((acc, curr, index) => {
    if (index === 0 || index === names.length - 1) {
      acc = `${acc}${curr.charAt(0).toUpperCase()}`;
    }
    return acc;
  }, "");
}
