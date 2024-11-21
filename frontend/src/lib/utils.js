import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function capitalizeFirstWord(str) {
  if (!str) return str;
  const words = str.split(' '); 
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  return words.join(' '); 
}