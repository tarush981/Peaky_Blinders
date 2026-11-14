import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase().slice(-5);
  const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `PB-IND-${timestamp}-${randomSuffix}`;
}

export function calculateDiscount(originalPrice: number, sellingPrice: number): number {
  if (!originalPrice || originalPrice <= sellingPrice) return 0;
  return Math.round(((originalPrice - sellingPrice) / originalPrice) * 100);
}

export function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}
