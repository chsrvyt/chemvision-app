// ============================================================
// CHEMVISION — Helper Utilities
// ============================================================

import { Timestamp } from "firebase/firestore";
import { GRADE_MAP } from "./constants";

/**
 * Format a Firestore Timestamp to a human-readable date string.
 */
export function formatDate(
  timestamp: Timestamp | Date | undefined,
  options?: Intl.DateTimeFormatOptions
): string {
  if (!timestamp) return "N/A";

  const date =
    timestamp instanceof Timestamp ? timestamp.toDate() : timestamp;

  return date.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
    ...options,
  });
}

/**
 * Format a Firestore Timestamp to a relative time string (e.g., "2 hours ago").
 */
export function formatRelativeTime(timestamp: Timestamp | Date | undefined): string {
  if (!timestamp) return "N/A";

  const date =
    timestamp instanceof Timestamp ? timestamp.toDate() : timestamp;
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) return "Just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHour < 24) return `${diffHour}h ago`;
  if (diffDay < 7) return `${diffDay}d ago`;
  return formatDate(timestamp);
}

/**
 * Calculate percentage and return formatted string.
 */
export function calculatePercentage(obtained: number, total: number): string {
  if (total === 0) return "0%";
  return `${Math.round((obtained / total) * 100)}%`;
}

/**
 * Get letter grade from percentage.
 */
export function getGrade(percentage: number): string {
  for (const [grade, range] of Object.entries(GRADE_MAP)) {
    if (percentage >= range.min && percentage <= range.max) {
      return grade;
    }
  }
  return "F";
}

/**
 * Get grade color for styling.
 */
export function getGradeColor(grade: string): string {
  const colorMap: Record<string, string> = {
    "A+": "text-emerald-600",
    A: "text-emerald-500",
    "B+": "text-blue-600",
    B: "text-blue-500",
    "C+": "text-amber-600",
    C: "text-amber-500",
    F: "text-red-500",
  };
  return colorMap[grade] ?? "text-gray-500";
}

/**
 * Truncate text to a maximum length with ellipsis.
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trimEnd() + "…";
}

/**
 * Generate initials from a full name.
 */
export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
}

/**
 * Format file size to human-readable string.
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
}

/**
 * Generate a unique ID (for client-side use before Firestore write).
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Debounce function for search inputs.
 */
export function debounce<T extends (...args: Parameters<T>) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), wait);
  };
}

/**
 * Capitalize first letter of a string.
 */
export function capitalize(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Slugify a string for URL-safe identifiers.
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
