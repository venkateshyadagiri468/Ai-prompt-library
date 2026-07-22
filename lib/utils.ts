import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number): string {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num.toString();
}

/**
 * Highlights placeholders like [Placeholder Name] inside prompt text for visual clarity
 */
export function extractPlaceholders(promptText: string): string[] {
  const regex = /\[(.*?)\]/g;
  const matches = promptText.match(regex);
  if (!matches) return [];
  return Array.from(new Set(matches.map((m) => m.slice(1, -1))));
}
