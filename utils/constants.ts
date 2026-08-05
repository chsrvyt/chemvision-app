// ============================================================
// CHEMVISION — Application Constants
// ============================================================

import { UserRole } from "@/types";

// ── App Metadata ─────────────────────────────────────────────

export const APP_NAME = "ChemVision";
export const APP_DESCRIPTION =
  "Visual Chemistry Learning & Practical Management System";
export const APP_VERSION = "1.0.0";

// ── Color Palette ────────────────────────────────────────────

export const COLORS = {
  primary: "#2563EB",
  primaryLight: "#3B82F6",
  primaryDark: "#1D4ED8",
  secondary: "#14B8A6",
  secondaryLight: "#2DD4BF",
  secondaryDark: "#0D9488",
  accent: "#F97316",
  accentLight: "#FB923C",
  accentDark: "#EA580C",
  background: "#F8FAFC",
  backgroundDark: "#0F172A",
  surface: "#FFFFFF",
  surfaceDark: "#1E293B",
  text: "#0F172A",
  textLight: "#64748B",
  textDark: "#F8FAFC",
  success: "#10B981",
  warning: "#F59E0B",
  danger: "#EF4444",
  info: "#3B82F6",
} as const;

// ── Departments ──────────────────────────────────────────────

export const DEPARTMENTS = [
  "Chemistry",
  "Biochemistry",
  "Organic Chemistry",
  "Inorganic Chemistry",
  "Physical Chemistry",
  "Analytical Chemistry",
  "Pharmaceutical Chemistry",
] as const;

// ── Semesters ────────────────────────────────────────────────

export const SEMESTERS = [1, 2, 3, 4, 5, 6, 7, 8] as const;

// ── Grade Mapping ────────────────────────────────────────────

export const GRADE_MAP: Record<string, { min: number; max: number }> = {
  "A+": { min: 90, max: 100 },
  A: { min: 80, max: 89 },
  "B+": { min: 70, max: 79 },
  B: { min: 60, max: 69 },
  "C+": { min: 50, max: 59 },
  C: { min: 40, max: 49 },
  F: { min: 0, max: 39 },
};

// ── Navigation Items Per Role ────────────────────────────────

export const ADMIN_NAV_ITEMS = [
  { title: "Dashboard", href: "/admin", icon: "LayoutDashboard" },
  { title: "Teachers", href: "/admin/teachers", icon: "GraduationCap" },
  { title: "Students", href: "/admin/students", icon: "Users" },
  { title: "Subjects", href: "/admin/subjects", icon: "BookOpen" },
  { title: "Practicals", href: "/admin/practicals", icon: "FlaskConical" },
  { title: "Announcements", href: "/admin/announcements", icon: "Megaphone" },
  { title: "Reports", href: "/admin/reports", icon: "FileBarChart" },
  { title: "Settings", href: "/admin/settings", icon: "Settings" },
];

export const TEACHER_NAV_ITEMS = [
  { title: "Dashboard", href: "/teacher", icon: "LayoutDashboard" },
  { title: "Students", href: "/teacher/students", icon: "Users" },
  { title: "Subjects", href: "/teacher/subjects", icon: "BookOpen" },
  { title: "Experiments", href: "/teacher/experiments", icon: "FlaskConical" },
  { title: "Assignments", href: "/teacher/assignments", icon: "ClipboardList" },
  { title: "Marks", href: "/teacher/marks", icon: "Award" },
  { title: "Attendance", href: "/teacher/attendance", icon: "ClipboardCheck" },
  { title: "Reports", href: "/teacher/reports", icon: "FileBarChart" },
  { title: "Notifications", href: "/teacher/notifications", icon: "Bell" },
  { title: "Profile", href: "/teacher/profile", icon: "User" },
];

export const STUDENT_NAV_ITEMS = [
  { title: "Dashboard", href: "/student", icon: "LayoutDashboard" },
  { title: "Subjects", href: "/student/subjects", icon: "BookOpen" },
  { title: "Virtual Laboratory", href: "/student/laboratory", icon: "Beaker" },
  { title: "Experiments", href: "/student/experiments", icon: "FlaskConical" },
  { title: "Assignments", href: "/student/assignments", icon: "ClipboardList" },
  { title: "Reports", href: "/student/reports", icon: "FileBarChart" },
  { title: "Notifications", href: "/student/notifications", icon: "Bell" },
  { title: "Profile", href: "/student/profile", icon: "User" },
];

// ── Role Labels ──────────────────────────────────────────────

export const ROLE_LABELS: Record<UserRole, string> = {
  [UserRole.ADMIN]: "Administrator",
  [UserRole.TEACHER]: "Teacher",
  [UserRole.STUDENT]: "Student",
};

// ── File Upload Limits ───────────────────────────────────────

export const MAX_FILE_SIZE_MB = 50;
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
export const ALLOWED_PDF_TYPES = ["application/pdf"];
export const ALLOWED_VIDEO_TYPES = ["video/mp4", "video/webm", "video/ogg"];
export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

// ── Pagination ───────────────────────────────────────────────

export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];
