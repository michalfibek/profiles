// import { hash } from "bcrypt";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function dateToString(date: Date | string): string {
  if (!date) return "";

  if (typeof date === "string") {
    return date; // already a string
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export async function getPasswordHash(password: string): Promise<string> {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const bcrypt = require("bcrypt");
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  return hash;
}
